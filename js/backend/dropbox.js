"use strict";

// Class that is responsible for Dropbox integration.
Cryptobox.Backend.DropboxDriver = function(client, ready, callback) {
  var self = this;

  this.url = function() { return ""; };

  this.doAuthorize = function(authUrl, token, tokenSecret, done) {
    console.log("doAuthorize");
    console.log("use new");
    //token_callback(authUrl);
    window.open(authUrl);
    // REQURE TO AUTH NEW TOKEN
    self.callback = function() { done(); };
  };

  this.getCredentials = function() {
    console.log("Dropbox.getCredentials");
    var data = localStorage.getItem(this.storageKey);
    try {
      return JSON.parse(data);
    } catch(e) {
      return null;
    }
  };

  this.setCredentials = function(data) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  };

  this.clearCredentials = function(data) {
    localStorage.removeItem(this.storageKey);
  };

  this.onAuthStateChange = function(client, done) {
    console.log("STATE=" + client.authState);
    self.storageKey = client.appHash() + ":cryptobox.json";
    self.ready = false;
    var credentials = null;
    if (client.authState === Dropbox.Client.RESET) {
      console.log("-> RESET");
      credentials = self.getCredentials();
      console.log("credentials");
      console.log(credentials);
      if (!credentials) {
        done();
        return;
      }
      client.setCredentials(credentials);
      done();
    } else if (client.authState === Dropbox.Client.REQUEST) {
      console.log("-> REQUEST");
      credentials = client.credentials();
      credentials.authState = Dropbox.Client.AUTHORIZED;
      self.setCredentials(credentials);
      done();
    } else if (client.authState === Dropbox.Client.DONE) {
      console.log("-> DONE");
      client.getUserInfo(function(error) {
        if (error) {
          client.reset();
          self.clearCredentials();
        }
        console.log("GOT USER INFO");
        if (self.remember) {
          credentials = self.getCredentials();
          credentials.authState = DONE;
          self.setCredentials(credentials);
        } else {
          console.log("CLEAR");
          self.clearCredentials();
        }
        self.ready = true;
        done();
      });
    } else if (client.authState === Dropbox.Client.SIGNED_OFF) {
      console.log("-> SIGNED_OFF");
      self.clearCredentials();
      done();
    } else if (client.authState === Dropbox.Client.ERROR) {
      console.log("-> ERROR");
      self.clearCredentials();
      client = null;
      done();
    } else if (client.authState === Dropbox.Client.AUTHORIZED) {
      done();
    } else {
      console.log("-> ?");
      done();
    }
  };
};

Cryptobox.Backend.Dropbox = function(data) {
  this.client = new window.Dropbox.Client({
      key: "nEGVEjZUFiA=|o5O6VucOhZA5Fw39MGotRofoEXUIO0MjFU6dmDpYNA==",
      sandbox: true
  });

  /*
  this.client.authDriver(new Dropbox.Drivers.Chrome({
    receiverPath: "extern/dropbox-js/chrome_oauth_receiver.html"
  }));
  */


  this.client.authDriver(new Cryptobox.Backend.DropboxDriver);

  this.fetch = function(callback) {
    this.client.readFile("cryptobox.json", function(error, data) {
      // TODO: add some meaningful error conversion

      if (error)
        return callback(null);

      return callback(data);
    });
  };

  this.link = function(callback) {
    console.log("ZY");

    this.client.authenticate(function(error, client) {
      // TODO: add some meaningful error conversion

      if (error)
        return callback(Cryptobox.Error.UNKNOWN);

      return callback(Cryptobox.Error.OK);
    });
  };

  this.canUnlink = function() {
    return true;
  };

  this.getAttachment = function(hash, callback) {
    // TODO
    callback(null);
  };
};

