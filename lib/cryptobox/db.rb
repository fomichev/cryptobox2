require 'json'
require 'openssl'
require 'base64'
require 'securerandom'
require 'fileutils'
require 'date'
require 'io/console'
require 'digest/sha1'

module Cryptobox
  # Class that abstract on-disk representation of the database. It's
  # responsible for encryption/decryption as well as loading/storage of the
  # cryptobox.yaml database.
  class Db
    # Supported database format version. It's saved along with the database
    # and checked then the database is loaded (loading of databases
    # with old/unsupported format is rejected).
    FORMAT_VERSION = 7
    # Default length of PBKDF2 salt; applies only to new databases.
    PBKDF2_SALT_LEN = 8
    # Default number of PBKDF2 iterations; applies only to new databases.
    PBKDF2_ITERATIONS = 2000
    # Default length of AES key; applies only to new databases.
    AES_KEY_LEN = 128

    attr_accessor :plaintext
    attr_reader :pbkdf2_salt, :pbkdf2_iter, :aes_iv, :aes_keylen

    public

    # Create new instance of database with given *path* and *password*;
    # store backups under *backup_path* directory (when *keep_backups* is true).
    def initialize(db_path, backup_path, keep_backups, password)
      @db_path = db_path
      @db_dir = File.dirname(db_path)
      @backup_path = backup_path
      @keep_backups = keep_backups
      @password = password

      File.umask(0077)
    end

    # Create empty database.
    def create
      dirname = File.dirname @db_path
      Dir.mkdir dirname unless Dir.exist? dirname

      @aes_keylen = AES_KEY_LEN
      @pbkdf2_iter = PBKDF2_ITERATIONS

      generate_cipher_params
      derive_key
    end

    # Load database from path specified upon instance creation.
    def load
      begin
        db = JSON::parse(File.read(@db_path))
      rescue Errno::ENOENT, Errno::EISDIR => error
        raise Error::DATABASE_NOT_FOUND
      end

      @pbkdf2_salt = from_base64 db['pbkdf2_salt']
      @pbkdf2_iter = db['pbkdf2_iter'].to_i
      @aes_iv = from_base64 db['aes_iv']
      @aes_keylen = db['aes_keylen'].to_i
      @ciphertext = from_base64 db['ciphertext']

      raise Error::INVALID_FORMAT if db['format_version'] != FORMAT_VERSION

      derive_key

      @plaintext = decrypt @ciphertext
    end

    # Validate database content.
    def validate(fielddef)
      json = JSON.parse @plaintext
      json.each do |type, entries|
        $stderr.puts "Unknown type '#{type}'" unless fielddef[type]

        entries.each do |entry|
          entry.each do |key, _|
            next if key == 'favorite' or
                    key == 'visible' or
                    key == 'group' or
                    key == 'name' or
                    key == 'fields' or
                    key == 'attachments'

            next unless fielddef[type]

            found = false
            fielddef[type]['fields'].each { |field|
              if field['name'] == key then found = true end
            }

            unless found
              $stderr.puts "Unknown field '#{type}.#{key}'"
            end
          end
        end
      end
    rescue
      $stderr.puts "There is a syntax error in source JSON"
    end

    # Save database using path specified upon instance creation.
    def save
      backup

      #generate_cipher_params
      derive_key

      @ciphertext = encrypt @plaintext

      db = {}
      db['pbkdf2_salt'] = to_base64(@pbkdf2_salt)
      db['pbkdf2_iter'] = @pbkdf2_iter
      db['aes_iv'] = to_base64(@aes_iv)
      db['aes_keylen'] = @aes_keylen
      db['format_version'] = FORMAT_VERSION
      db['version'] = VERSION
      db['modified_at'] = Time.now.getutc.to_i
      db['ciphertext'] = to_base64(@ciphertext)

      File.open(@db_path, 'w') {|f| f.write JSON.pretty_generate(db) }
    end

    # Set new *password* for the database. Database should be explicitly saved
    # for changes to take effect.
    def change_password(password)
      @password = password
      derive_key
    end

    # Encrypt given *plaintext*. It's not private (as decrypt) because it is
    # used by the JSON output to encrypt cryptobox.json.
    def encrypt(plaintext)
      cipher = OpenSSL::Cipher::AES.new(@aes_keylen, :CBC)
      cipher.encrypt
      cipher.key = @key
      cipher.iv = @aes_iv

      return cipher.update(plaintext) + cipher.final
    end

    # Return unique name for given data bytes.
    def derive_name(data)
      Digest::SHA1.hexdigest(data)
    end

    # Save given data in the database and return its name.
    def save_data(data)
      encrypted = self.encrypt(data)
      name = self.derive_name(encrypted)

      path = File.join(@db_dir, name)
      File.open(path, 'w') { |f| f.write(to_base64(encrypted)) }

      name
    end

    # Read data from file with given name, decrypt and return it.
    def read_data(name)
      path = File.join(@db_dir, name)
      data = File.open(path, 'r') { |f| f.read }

      self.decrypt(from_base64(data))
    end

    # Execute block on each database entry.
    def each
      y = JSON::parse(plaintext)
      return unless y

      includes = y.has_key?('include') ? y['include'] : {}

      y.each do |type_path, entries|
        next if type_path == 'include'

        #type = type_path.split(File::PATH_SEPARATOR)[0]
        type = type_path.split("/")[0]

        entries.each do |entry|
          raise "Wrong number!!!" if entry.keys.size != 1

          name = entry.keys[0]

          vars = Hash.new {|hash, key| raise "Key #{key} is not found!" }

          vars[:name] = name
          vars[:type_path] = type_path
          vars[:type] = type

          vars.merge! entry[name].symbolize_keys

          # FIXME: do this in runtime !!!
          vars.each do |key, value|
            next unless vars[key].instance_of? String
            vars[key] = value.gsub(/\n/, '\n').gsub(/"/, '\"')
          end

          yield vars, includes

          # for each alias yield a result with different type_path
          vars[:alias].split(/\s+/).each do |alias_type_path|
            vars[:type_path] = alias_type_path

            yield vars, includes
          end if vars.has_key? :alias
        end
      end
    end

    # Decrypt given *ciphertext*.
    def decrypt(ciphertext)
      cipher = OpenSSL::Cipher::AES.new(@aes_keylen, :CBC)
      cipher.decrypt
      cipher.key = @key
      cipher.iv = @aes_iv

      begin
        return cipher.update(ciphertext) + cipher.final
      rescue OpenSSL::Cipher::CipherError => error
        puts "ERROR=#{error}"
        raise Error::INVALID_PASSWORD
      end
    end

    private

    # Generate default cipher parameters (salf, iv, etc)
    def generate_cipher_params
      @aes_iv = OpenSSL::Cipher::AES.new(@aes_keylen, :CBC).random_iv
      @pbkdf2_salt = SecureRandom.random_bytes PBKDF2_SALT_LEN
    end

    # Convert given argument to base64 encoding and strip newlines
    def to_base64(v)
      return Base64.encode64(v).gsub(/\n/, '')
    end

    # Wrapper for Base64.decode64 (for consistency with to_base64)
    def from_base64(v)
      return Base64.decode64(v)
    end

    # Backup previous version of database
    def backup
      return unless @keep_backups
      return unless File.exist? @db_path
      Dir.mkdir @backup_path unless Dir.exist? @backup_path
      FileUtils.cp @db_path, File.join(@backup_path,
                                       Time.now.strftime("%H_%M_%S_%d_%m_%Y"))
    end

    # Get encryption key from password and store it in @key
    def derive_key
      @key = OpenSSL::PKCS5::pbkdf2_hmac_sha1(@password,
                                              @pbkdf2_salt,
                                              @pbkdf2_iter,
                                              @aes_keylen / 8)
    end
  end
end
