module Cryptobox
  module Command
    def self.decrypt(config, interactive, name)
      db = Cryptobox::Db.new config[:path][:json],
        config[:path][:backup],
        config[:cryptobox][:keep_backups],
        Cryptobox::ask_password('Password:', interactive)

      db.load

      $stdout.write(db.read_data(name))
    end
  end
end
