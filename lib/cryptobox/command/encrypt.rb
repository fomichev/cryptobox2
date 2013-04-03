module Cryptobox
  module Command
    def self.encrypt(config, interactive, stream)
      db = Cryptobox::Db.new config[:path][:json],
        config[:path][:backup],
        config[:cryptobox][:keep_backups],
        Cryptobox::ask_password('Password:', interactive)

      db.load

      puts db.save_data(stream.read)
    end
  end
end
