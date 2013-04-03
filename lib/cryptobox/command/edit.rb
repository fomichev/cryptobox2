require 'fileutils'
require 'json'

module Cryptobox
  module Command
    # `cryptobox edit` command handler.
    def self.edit(config, interactive, stdout, stdin, pipe)
      db = Cryptobox::Db.new config[:path][:json],
        config[:path][:backup],
        config[:cryptobox][:keep_backups],
        Cryptobox::ask_password('Password:', interactive)
      db.load

      if stdout
        $stdout.puts db.plaintext
        return
      end

      if stdin
        db.plaintext = $stdin.read
      else
        editor = Editor.new(config[:path][:home],
                            config[:ui][:editor],
                            db.plaintext,
                            pipe)

        new_plaintext = editor.run
        return if new_plaintext == db.plaintext

        db.plaintext = new_plaintext
      end

      fielddef = File.read(File.join(config[:path][:root], 'js', 'fielddef.js'))
      fielddef.sub!(/\ACryptobox\.Fielddef =/, '')
      fielddef.sub!(/;\n\z/, '')

      db.validate(JSON::parse(fielddef))
      db.save

      Cryptobox::embed_data(config)
    end
  end
end
