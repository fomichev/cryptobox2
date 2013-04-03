module Cryptobox
  # Embed cryptobox database into portable version of HTML.
  def self.embed_data(config)
    html = File.read(File.join(config[:path][:root], 'portable.html'))

    attachments_scripts = ""
    Dir.glob(File.join(config[:path][:cryptobox], '*')).each do |path|
      name = File.basename(path)
      next if name.length != 40

      value = File.open(path, 'rb') { |f| f.read }
      attachments_scripts += "<script id=\"attachment-#{name}\" type=\"application/text\">#{value}</script>\n"
    end

    html.sub!(/(<script id="cryptobox-json" type="application\/json">)(.*?)(<\/script>)/m,
              "\\1#{File.read(config[:path][:json])}\\3")
    html.sub!(/<\/script>/, "<\/script>#{attachments_scripts}")

    File.open(File.join(config[:path][:html]), 'w') { |f| f.write(html) }

    # copy clippy.swf
    FileUtils.cp(File.join(config[:path][:root], 'clippy.swf'),
                 config[:path][:cryptobox])
  end

  # Convert all *obj* Hash object keys to Symbol.
  def self.symbolize(obj)
    return obj.inject({}) do
      |memo, (k,v)| memo[k.to_sym] = symbolize(v)
      memo
    end if obj.is_a? Hash

    return obj.inject([]) do
      |memo, v| memo << symbolize(v)
      memo
    end if obj.is_a? Array
    obj
  end

  # Convert all *obj* Hash object keys to String.
  def self.stringify(obj)
    return obj.inject({}) do
      |memo, (k,v)| memo[k.to_s] = stringify(v)
      memo
    end if obj.is_a? Hash
    return obj.inject([]) do
      |memo, v| memo << stringify(v)
      memo
    end if obj.is_a? Array
    obj
  end

  # Print *prompt* on console and wait for the answer: yes ('y') or no ('n').
  # Return *true* in case of 'yes', return *false* otherwise.
  def self.yn(prompt)
    loop do
      print "#{prompt} [y/n]: "
      $stdout.flush
      case gets.strip.downcase
      when 'y', 'yes'
        puts
        return true
      when 'n', 'no'
        puts
        return false
      end
    end
  end

  # Ask user password and return it. *prompt* is printed before password
  # request and *interactive* argument specifies whether application
  # should open */dev/tty* to read password from (*true*) or use standard
  # input (*false*).
  def self.ask_password(prompt, interactive)
    i, o = $stdin, $stdout

    begin
      i = o = open('/dev/tty', 'w+') if interactive
    rescue
      interactive = false
    end

    unless $silent
      o.print prompt
      o.flush
    end

    if i.tty?
      password = i.noecho(&:gets)
    else
      password = i.gets
    end

    unless $silent
      o.puts
      o.flush
      i.close if interactive
    end

    return password.sub(/\n$/, '')
  end
end

class Hash
  # Recursively convert all Hash keys to Symbol.
  def symbolize_keys
    Cryptobox::symbolize self
  end

  # Recursively convert all Hash keys to String.
  def stringify_keys
    Cryptobox::stringify self
  end
end

class Array
  # Recursively convert all Hash keys to Symbol.
  def symbolize_keys
    Cryptobox::symbolize self
  end

  # Recursively convert all Hash keys to String.
  def stringify_keys
    Cryptobox::stringify self
  end
end
