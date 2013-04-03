"use strict";

Cryptobox.View.Locked = Backbone.View.extend({
  events: {
    "submit form": "unlock",
    "click #button-unlink": "unlink"
  },

  showAlert: function(msg) {
    var el = $('#alert', this.$el);

    if (msg !== null) {
      el.addClass('alert-error');
      el.html(msg);
      el.fadeIn();
    } else {
      el.removeClass('alert-error');
      el.fadeOut();
    }
  },

  buttonState: function(state) {
    $('#button-unlock', this.$el).button(state);
  },

  unlink: function(event) {
    event.preventDefault();
    // TODO: backend.exit

    Cryptobox.Util.del(Cryptobox.instance.backend);
    Cryptobox.instance.backend = null;

    Backbone.history.navigate('!/link', true);
  },

  unlock: function(event) {
    event.preventDefault();
    //this.showAlert(null);

    this.buttonState('loading');

    var password = $(this.el).find('input:password').val();

    var self = this;

    Cryptobox.instance.backend.fetch(function(text) {
        try {
          // TODO: check if text is not NULL (on error)!
          // and pass additional error indication here
          // so we can display some meaningful message

          if (!text) {
            self.showAlert("WTF? NO TEXT!");
            return;
          }

          var json = JSON.parse(text);

          Cryptobox.instance.key = Cryptobox.Util.deriveKey(
              password,
              json.pbkdf2_salt,
              json.aes_keylen,
              json.pbkdf2_iter);
          Cryptobox.instance.iv = json.aes_iv;

          Cryptobox.Util.del(password);
          Cryptobox.Util.setState(new Cryptobox.Model.AppState(
              JSON.parse(Cryptobox.Util.decrypt(
                  Cryptobox.instance.key,
                  json.ciphertext,
                  Cryptobox.instance.iv))));

          Cryptobox.Util.del(json);
          json = null;

          Backbone.history.navigate('!/unlocked', true);
        } catch(e) {
          Cryptobox.Util.del(Cryptobox.instance.key);
          Cryptobox.Util.del(Cryptobox.instance.iv);
          Cryptobox.instance.key = null;
          Cryptobox.instance.iv = null;

          Cryptobox.Util.del(password);
          self.buttonState('reset');
          self.showAlert("ERROR: " + e);
          console.log("ERROR: " + e);
        }
    });
  },

  render: function() {
    this.setElement(Cryptobox.Util.render("locked", {}));
    this.buttonState('reset');
    return this;
  }
});
