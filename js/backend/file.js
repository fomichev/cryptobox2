"use strict";

Cryptobox.Backend.File = function(data, canUnlink) {
  this.data = data;
  this.mayUnlink = canUnlink;

  this.fetch = function(callback) {
    var self = this;
    setTimeout(function() { callback(self.data); }, 10);
  };

  this.link = function(callback) {
    callback(Cryptobox.Error.OK);
  };

  this.canUnlink = function() {
    return this.mayUnlink;
  };

  this.getAttachment = function(hash, callback) {
    // TODO: also try to open local file?

    callback($("#attachment-" + hash).text());
  };
};
