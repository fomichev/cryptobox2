require "bundler/setup"

require 'base64'
require 'open-uri'

#require 'cucumber'
#require 'cucumber/rake/task'
#
#task :default => [:test]
#
#Cucumber::Rake::Task.new(:test) do |t|
#  t.cucumber_opts = "features --format progress"
#  t.fork = false
#end

desc "Run jslint"
task :jslint do
  `find ./js -name \*.js -exec jsl -nosummary -nologo -nofilelisting -process {} \;`
end

desc "Preprocess Handlebars templates and generate JavaScript"
task :handlebars do
  require 'execjs'

  compiler_path = File.join 'extern', 'handlebars', 'handlebars.js'
  context = ExecJS.compile(File.read(compiler_path))

  [ 'template' ].each do |root|
    to = File.join root, 'template.js'

    result = "(function() {\n  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};"

    Dir[File.join(root, '*.handlebars')].each do |f|
      next unless File.exist? f

      template_name = File.basename(f).sub(/\.handlebars$/, '')
      compiled = context.call('Handlebars.precompile', File.read(f))

      result += "\ntemplates['#{template_name}'] = template(#{compiled});"
    end

    result += "\n})();"

    File.open(to, 'wb') {|f| f.write result }
  end
end

desc "Update sample database"
task :sample do
  require 'open3'

  Dir.chdir('sample') do
    `echo hi| cat - sample.json | ruby ../bin/cryptobox --no-interactive --verbose edit --stdin`
    passport_hash = `echo hi| ruby ../bin/cryptobox --no-interactive --silent encrypt passport.png`
    driving_licence_hash = `echo hi| ruby ../bin/cryptobox --no-interactive --silent encrypt driving_licence.png`

    `echo hi| ruby ../bin/cryptobox --no-interactive --verbose set "$.identity[0].attachments['passport.png']" "#{passport_hash}`
    `echo hi| ruby ../bin/cryptobox --no-interactive --verbose set "$.identity[0].attachments['driving_licence.png']" "#{driving_licence_hash}`
  end
end

desc "Embed everything into index.html"
task :build, :compress do |t, args|

  def read_font(url)
    cached = File.join('font', File.basename(url))

    if File.exist?(cached)
      return open(cached, 'rb').read
    else
      return '' unless url.start_with? 'http'

      font = open(url).read
      File.open(cached, 'wb') { |f| f << font }

      return font
    end
  end

  def embed_fonts(text)
    text.gsub(/url\((?:"|')?([^#?"')]*\.woff)([^"')]*)(?:"|')?\)*/) do
      url = $1

      next if /^data:/ =~ url

      data = read_font(url)
      result = "url(data:font/woff;base64,#{Base64.encode64(data).gsub(/\n/, '')}#{$2})"

      STDERR.puts "Font #{url} is not found!" unless result
      result
    end
  end

  def embed_images(text, dirs)
    text.gsub(/url\((?:"|')?([^#?"')]*\.png)([^"')]*)(?:"|')?\)*/) do
      url = $1

      next if /^data:/ =~ url

      result = nil
      dirs.each do |dir|
        image = File.join(dir, url)
        next unless File.exist? image

        puts "Embed image #{url}"
        data = File.open(image, 'rb').read

        result = "url(data:image/png;base64,#{Base64.encode64(data).gsub(/\n/, '')}#{$2})"

        break
      end

      raise "Image #{url} not found!" unless result
      result
    end
  end

  compress = (args[:compress] || 1).to_i

  if compress == 1
    require "yui/compressor"

    $js = YUI::JavaScriptCompressor.new(:munge => true)
    $css = YUI::CssCompressor.new

    def css_compress(data) $css.compress(data) end
    def js_compress(data) $js.compress(data) end
  else
    def css_compress(data) data end
    def js_compress(data) data end
  end

  images_dirs = %w{ extern/bootstrap/img css }
  contents = File.read('index.html')

  contents.sub!(/(<link rel="shortcut icon" type="image\/png" href=")([^"]*)(" \/>)/) {
    data = File.open($2, 'rb').read
    pre, post = $1, $3

    "#{pre}data:image/png;base64,#{Base64.encode64(data).gsub(/\n/, '')}#{post}"
  }

  css_data = []
  contents.gsub! /\s+<link rel="stylesheet" type="text\/css" href="([^"]*)" \/>\n/ do |f|
    css_data <<= File.read($1).gsub(/\<\/script\>/, '<\/script>')
    ""
  end

  js_data = []
  contents.gsub! /\s+<script src="([^"]*)"><\/script>\n/ do |f|
    js_data <<= File.read($1).gsub(/\<\/script\>/, '<\/script>')
    ""
  end

  contents.gsub!(/<\/head>/) do
    <<-eos
      <style>
      #{css_compress(embed_fonts(embed_images(css_data.join("\n"), images_dirs)))}
      </style>
      <script>
      #{js_compress(js_data.join("\n"))}
      </script>
      </head>
    eos
  end

  File.open('portable.html', 'w') { |f| f.write(contents) }
end
