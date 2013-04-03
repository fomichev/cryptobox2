"use strict";

Cryptobox.Model.Page = Backbone.Model.extend({
  defaults: {
    name: null,
    type: null,
    entries: null
  },

  initialize: function() {
    this.set("name", t("page-" + this.get("type")));
    this.set("entries", new Cryptobox.Collection.EntryList);
    return this;
  },

  entries: function() {
    return this.get("entries");
  },

  addEntry: function(entry) {
    this.get("entries").push(entry);
  }
});

// List which contains all pages.
Cryptobox.Collection.PageList = Backbone.Collection.extend({
  model: Cryptobox.Model.Page,

  comparator: function(page) {
    return page.get("name").toLowerCase();
  }
});
