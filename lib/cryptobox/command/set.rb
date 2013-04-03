require 'jsonpath'

module Cryptobox
  module Command
    def self.set(config, interactive, expression, value)
      db = Cryptobox::Db.new config[:path][:json],
        config[:path][:backup],
        config[:cryptobox][:keep_backups],
        Cryptobox::ask_password('Password:', interactive)
      db.load

      o = JsonPath.
        for(db.plaintext).
        gsub(expression) { |v| value }.
        to_hash

      db.plaintext = JSON.pretty_generate o
      db.save

      Cryptobox::embed_data(config)
    end
  end
end
