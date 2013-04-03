"use strict";

// Render and return `template` in given `context`.
Cryptobox.Util.render = function(template, context) {
  return Handlebars.templates[template](context);
};

// Fill variable contents with zeroes
Cryptobox.Util.del = function(obj) {
  /*
  if (typeof(obj) == "string") {
    // TODO: fill string data with zeroes
  } else {
    // TODO: make generic cleanup depending on object type
  }
  */
};

// Decrypt base64 encoded `ciphertext` using given (`key`)
// and AES IV (`iv`). Decrypted plaintext is returned.
Cryptobox.Util.decrypt = function(key, ciphertext, iv) {
  var result = CryptoJS.AES.decrypt(ciphertext, key,
                                    { mode: CryptoJS.mode.CBC,
                                      iv: CryptoJS.enc.Base64.parse(iv),
                                      padding: CryptoJS.pad.Pkcs7
                                    });

  return result.toString(CryptoJS.enc.Utf8);
};

// Derive AES key from user password and cipher parameters:
// base64 encoded PBKDF2 `salt`, number of PBKDF2 `iterations` and
// AES key length (`keylen`).
Cryptobox.Util.deriveKey = function(pass, salt, keylen, iterations) {
  return CryptoJS.PBKDF2(pass,
                           CryptoJS.enc.Base64.parse(salt),
                           { keySize: keylen / 32,
                             iterations: iterations
                           });
};

// Decrypt base64 encoded `ciphertext` using given (`key`)
// and AES IV (`iv`). Decrypted plaintext is in Base64 encoding returned.
Cryptobox.Util.decrypt64 = function(key, ciphertext, iv) {
  var result = CryptoJS.AES.decrypt(ciphertext, key,
                                    { mode: CryptoJS.mode.CBC,
                                      iv: CryptoJS.enc.Base64.parse(iv),
                                      padding: CryptoJS.pad.Pkcs7
                                    });

  return result.toString(CryptoJS.enc.Base64);
};

// TODO: use one callback with error indication instead of two!
Cryptobox.Util.link = function(callback) {
  // use embedded cryptobox.json if possible
  if ($("#cryptobox-json").text())
    Cryptobox.instance.backend = new Cryptobox.Backend.File($("#cryptobox-json").text(), false);

  /*
  console.log("BACKEND:");
  console.log(Cryptobox.instance.backend);
  */

  // TODO: store linked backend in localStorage
  if (Cryptobox.instance.backend) {
    Cryptobox.instance.backend.link(callback);
    return;
  }

  callback(Cryptobox.Error.NOT_LINKED);
};

Cryptobox.Util.setState = function(state) {
  if (Cryptobox.Extension.running()) {
    Cryptobox.Extension.setState(state);
  } else {
    Cryptobox.instance.state = state;
  }
};

// Execute callback only when unlocked, otherwise, go to locked or link page
Cryptobox.Util.getState = function(callback) {
  Cryptobox.Util.link(function(error) {
    if (error) {
      Backbone.history.navigate('!/link', true);
      return;
    }

    if (Cryptobox.Extension.running()) {
      Cryptobox.Extension.getState(function(state) {
        if (state)
          callback(state);
        else
          Backbone.history.navigate('!/locked', true);
      });
    } else {
      if (Cryptobox.instance.state)
        callback(Cryptobox.instance.state);
      else
        Backbone.history.navigate('!/locked', true);
    }
  });
};

Cryptobox.Util.clearState = function() {
  // TODO: clear any state and present locked view

  Cryptobox.Util.del(Cryptobox.instance.key);
  Cryptobox.Util.del(Cryptobox.instance.iv);
  Cryptobox.instance.key = null;
  Cryptobox.instance.iv = null;

  if (Cryptobox.Extension.running()) {
    Cryptobox.Extension.clearState();
  } else {
    Cryptobox.Util.del(Cryptobox.instance.state);
    Cryptobox.instance.state = null;
  }
};

Cryptobox.Util.transition = function(name, view, callback, e) {
  var el = $(name);

  if (callback && typeof(callback) === 'string') {
    e = callback;
    callback = undefined;
  }

  if (Cryptobox.Extension.running()) {
    $(name).html($(view.el));
    callback();
    return;
  }

  if (el.html() === '') {
      el.hide().html($(view.el));

      if (e)
        Cryptobox.instance.dispatcher.trigger(e);

      el.fadeIn('fast', callback);
  } else {
    el.fadeOut('fast', function() {
      el.html($(view.el));

      if (e)
        Cryptobox.instance.dispatcher.trigger(e);

      el.fadeIn('fast', callback);
    });
  }
};

// http://stackoverflow.com/questions/736513/how-do-i-parse-a-url-into-hostname-and-path-in-javascript
Cryptobox.Util.getLocation = function(href) {
  var l = document.createElement("a");
  l.href = href;
  return l;
};

// Capitalize first letter of a string.
Cryptobox.Util.capitalize = function(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Return just name from given `url` (strip prefix and suffix).
Cryptobox.Util.sitename = function(url) {
  return Cryptobox.Util.getLocation(url).hostname.replace(/^www./, '');
};

// Generate new password with given `length`. Other parameters specify password
// properties, as to whether include numbers (`withNumbers`), punctuation
// (`withPunc`) or uppercase letters (`withUc`).
Cryptobox.Util.generatePassword = function(length, withNumbers, withPunc, withUc) {
  Math.seedrandom();

  var pass = "";
  var i = 0;

  while (i < length) {
    var num = Math.random() * 1000;
    num = Math.floor(num);

    // Need ASCII character in range 33 .. 126.
    num = (num % 93) + 33;

    if (withNumbers === false) {
      if (num >= 48 && num <= 57)
        continue;
    }

    if (withPunc === false) {
      if (num >= 33 && num <= 47)
        continue;
      if (num >= 58 && num <= 64)
        continue;
      if (num >= 91 && num <= 96)
        continue;
      if (num >= 123 && num <= 126)
        continue;
    }

    if (withUc === false) {
      if (num >= 65 && num <= 90)
        continue;
    }

    pass += String.fromCharCode(num);
    i++;
  }

  return pass;
};

Cryptobox.Util.translate = function(id) {
  return Cryptobox.Message.en[id];
};

Cryptobox.Util.fielddefWithStyle = function(type, style) {
  var fields = Cryptobox.Fielddef[type].fields;

  for (var i = 0; i < fields.length; i++) {
    if (fields[i].style == style)
      return fields[i];
  }

  return null;
};

window.t = function(id) { return Cryptobox.Util.translate(id); };

String.prototype.endsWith = function(s) {
    return this.indexOf(s, this.length - s.length) !== -1;
};

String.prototype.startsWith = function(s) {
    return this.indexOf(s) == 0;
};
