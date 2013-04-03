"use strict";

/*
 * TODO: don't show local file as link option when browser doesn't support it
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}
*/

Cryptobox.View.Link = Backbone.View.extend({
  events: {
    "click #link-file": "file",
    "change input": "selectFile",
    "click #link-dropbox": "dropbox"
  },

  dropbox: function(e) {
    e.preventDefault();

    $("#alert").text(t('link-dropbox-alert')).fadeIn();

    Cryptobox.instance.backend = new Cryptobox.Backend.Dropbox();
    Backbone.history.navigate('!/locked', true);
  },

  file: function(e) {
    e.preventDefault();
    $("#input-file").click();
  },

  selectFile: function(e) {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = function(f) {
      Cryptobox.instance.backend = new Cryptobox.Backend.File(f.target.result, true);
      Backbone.history.navigate('!/locked', true);
    };
    reader.readAsText(file);
  },

  render: function() {
    this.setElement(Cryptobox.Util.render("link", {}));
    return this;
  }
});
