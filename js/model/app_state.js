"use strict";

Cryptobox.Model.AppState = Backbone.Model.extend({
  defaults: {},

  initialize: function(json) {
    this.set("pages", new Cryptobox.Collection.PageList);
    this.fromJSON(json);
    return this;
  },

  // Find entry with given `id` (look through all pages).
  findEntry: function(cid) {
    var entry = null;

    this.get("pages").each(function(page) {
      if (!entry)
        entry = page.get("entries").get(cid);
    });

    return entry;
  },

  // Find page with given `id`.
  findPage: function(cid) {
    return this.get("pages").get(cid);
  },

  // Find favorites page `id`.
  favoritesPageCid: function() {
    return this.get("pages").where({ type: "favorites"})[0].cid;
  },

  // Find page by type.
  page: function(type) {
    var r = this.get("pages").where({ type: type });

    if (r.length)
      return r[0];

    return null;
  },

  // Add page to current state.
  addPage: function(page) {
    this.get("pages").push(page);
  },

  // Return list of all pages (`PageList`).
  pages: function() {
    return this.get("pages");
  },

  // Create models hierarchy from preserved JSON state.
  fromJSON: function(json) {
    var favorites = new Cryptobox.Model.Page({ type: 'favorites' });
    this.addPage(favorites);

    _.each(json, function(entries, type) {
      if (!Cryptobox.Fielddef[type]) {
        console.log("Unknown entry type '" + type + "'");
        return;
      }

      var page_type = Cryptobox.Fielddef[type].page;
      var page = this.page(page_type);
      if (!page) {
        page = new Cryptobox.Model.Page({ type: page_type });
        this.addPage(page);
      }

      _.each(entries, function(e) {
        e.entry_type = type;
        var entry = new Cryptobox.Model.Entry(e);
        page.addEntry(entry);

        if (e.favorite)
          favorites.addEntry(entry);
      }, this);

      page.entries().sort();
    }, this);

    favorites.entries().sort();
    this.pages().sort();
  }
});
