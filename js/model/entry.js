"use strict";

Cryptobox.Model.Entry = Backbone.Model.extend({
  defaults: {
    name: undefined,
    entry_type: "unknown",
    group: "",
    favorite: false,
    visible: true
  },

  urlWithScheme: function(url, scheme) {
    if (url.indexOf('://') <= 0)
      url = scheme + "://" + url;

    return url;
  },

  setName: function() {
    if (!Cryptobox.Fielddef[this.get("entry_type")])
      return '';

    _.each(Cryptobox.Fielddef[this.get("entry_type")].fields, function(field) {
      if (!field.style)
        return;

      if (field.style == "name") {
        var value = this.get(field.name);

        if (field.type == "url") {
          value = this.urlWithScheme(value, field.scheme);

          this.set("name", Cryptobox.Util.sitename(value));
          this.set("name-url", value);
        } else {
          this.set("name", this.get(field.name));
        }
      }

      if (field.style == "name-details") {
        var value = this.get(field.name);

        if (field.type == "url")
          value = this.urlWithScheme(value, field.scheme);

        this.set("name-details", value);
      }
    }, this);

    if (!this.get("name") && this.get("name-details")) {
      this.set("name", this.get("name-details"));
      this.unset("name-details");
    }
  },

  initialize: function() {
    if (this.get("name")) {
      this.unset("name-details");

      var field = Cryptobox.Util.fielddefWithStyle(this.get("entry_type"), "name");
      if (field && field.type == "url") {
        var value = this.get(field.name);
        value = this.urlWithScheme(value, field.scheme);

        this.set("name-url", value);
      }

      this.set("name-listitem", this.get("name"));
    } else {
      this.setName();

      if (this.get("name-details"))
        this.set("name-listitem", this.get("name") + " " + this.get("name-details"));
      else
        this.set("name-listitem", this.get("name"));
    }

    this.set("cid", this.cid);

    if (this.get("entry_type") === "site") {
      this.set("favicon", true);

      if (this.get("url"))
        this.set("hostname", Cryptobox.Util.sitename(this.get("url")));
    }
  }
});

Cryptobox.Collection.EntryList = Backbone.Collection.extend({
  model: Cryptobox.Model.Entry,
  comparator: function(entry) {
    return [ entry.get("group").toLowerCase(), entry.get("name").toLowerCase() ];
  }
});
