"use strict";

Cryptobox.View.FillListSeparator = Backbone.View.extend({
  // TODO: use model
  render: function() {
    this.setElement(Cryptobox.Util.render('fill_list_separator', { name: this.name }));
    return this;
  }
});

Cryptobox.View.FillListItem = Backbone.View.extend({
  events: {},

  render: function() {
    this.setElement(Cryptobox.Util.render('fill_list_item', this.model.toJSON()));
    return this;
  }
});

Cryptobox.View.FillList = Backbone.View.extend({
  // TODO: check that we need to manually copy options
  initialize: function(options) {
    this.options = options;
  },

  addEntry: function(entry) {
    var view = new Cryptobox.View.FillListItem({ model: entry });
    view.render();
    this.list.append($(view.el));
  },

  addSeparator: function(name) {
    var view = new Cryptobox.View.FillListSeparator();
    view.name = name;
    view.render();
    this.list.append($(view.el));
  },

  render: function() {
    this.setElement(Cryptobox.Util.render('fill_list', {}));
    this.list = this.$(".entry-list");

    console.log("OPTIONS", this.options);

    if (this.options.forms.hasSiteForm) {
      this.addSeparator('Fill and submit');
      this.model.page('site').entries().each(function(site) {

        console.log("CMP", Cryptobox.Util.sitename(site.get("url")), Cryptobox.Util.sitename(this.options.url));

        if (Cryptobox.Util.sitename(site.get("url")) ==
          Cryptobox.Util.sitename(this.options.url))

          this.addEntry(site);
      }, this);
    }

    if (this.options.forms.hasIdentityForm) {
      if (this.model.page('identity')) {
        this.addSeparator('Fill identity');

        this.model.page('identity').entries().each(function(entry) {
            this.addEntry(entry);
        }, this);
      }
    }

    if (this.options.forms.hasCardForm) {
      if (this.model.page('card')) {
        this.addSeparator('Fill credit card');

        this.model.page('card').entries().each(function(entry) {
            this.addEntry(entry);
        }, this);
      }
    }

    this.addSeparator('Fill and submit in new tab');
    this.model.page('site').entries().each(function(site) {
      if (Cryptobox.Util.sitename(site.get("url")) !=
          Cryptobox.Util.sitename(this.options.url))
        this.addEntry(site);
    }, this);

    return this;
  }
});
