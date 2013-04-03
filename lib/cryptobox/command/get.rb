require 'jsonpath'

module Cryptobox
  module Command
    def self.get(config, interactive, expression)
      db = Cryptobox::Db.new config[:path][:json],
        config[:path][:backup],
        config[:cryptobox][:keep_backups],
        Cryptobox::ask_password('Password:', interactive)
      db.load

      path = JsonPath.new(expression)

      $stdout.puts path.on(db.plaintext)
    end
  end
end
