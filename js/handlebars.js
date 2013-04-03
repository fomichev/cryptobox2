"use strict";

Handlebars.registerHelper('t', function(id) {
  return Cryptobox.Util.translate(id);
});

Handlebars.registerHelper('to_clipboard', function(text) {
  // TODO: return browser specific version if run as extension.

  var t = '';

  t += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="110" height="14">';
  t += '<param name="movie" value="clippy.swf"/>';
  t += '<param name="allowScriptAccess" value="always" />';
  t += '<param name="quality" value="high" />';
  t += '<param name="scale" value="noscale" />';
  t += '<param name="FlashVars" value="text=##{text}">';
  t += '<param name="bgcolor" value="#fbfbfb">';
  t += '<embed src="clippy.swf" width="110" height="14" name="clippy"';
  t += ' quality="high" allowScriptAccess="always"';
  t += ' type="application/x-shockwave-flash"';
  t += ' pluginspage="http://www.macromedia.com/go/getflashplayer"';
  t += ' FlashVars="text=' + text + '" bgcolor="#fbfbfb" />';
  t += '</object>';

  return new Handlebars.SafeString(t);
});

// https://gist.github.com/strathmeyer/1371586
// HELPER: #key_value
//
// Usage: {{#key_value obj}} Key: {{key}} // Value: {{value}} {{/key_value}}
//
// Iterate over an object, setting 'key' and 'value' for each property in
// the object.
Handlebars.registerHelper("key_value", function(obj, fn) {
    var buffer = "",
        key;

    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            buffer += fn.fn({key: key, value: obj[key]});
        }
    }

    return buffer;
});

Handlebars.registerHelper('if_can_unlink', function(block) {
  if (Cryptobox.instance.backend.canUnlink())
    return block.fn(this);
});

Handlebars.registerHelper('if_not_extension', function(block) {
  if (Cryptobox.Extension.running() == false)
    return block.fn(this);
});
