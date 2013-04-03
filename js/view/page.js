"use strict";

// This view draws particular page item in the list.
// Renders Page model.
Cryptobox.View.PageListItem = Backbone.View.extend({
  render: function() {
    this.setElement(Cryptobox.Util.render('page_list_item',
        { cid: this.model.cid,
          name: this.model.get("name") }));
    return this;
  }
});

// This view draws container for list pages and all included pages (via
// PageListItemView).
// Renders PageList collection.
Cryptobox.View.PageList = Backbone.View.extend({
  addItem: function(page) {
    var view = new Cryptobox.View.PageListItem({ model: page });
    view.render();
    return this.list.append($(view.el));
  },

  render: function() {
    var self = this;
    this.setElement(Cryptobox.Util.render('page_list', {}));
    this.list = this.$(".page-list");

    this.model.each(function(page) { self.addItem(page); });
    return this;
  }
});
