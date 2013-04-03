"use strict";

// This view renders particular entry based on its `entry_type`.
Cryptobox.View.Entry = Backbone.View.extend({
  events: {
    "click .toggle": "toggle"
  },

  toggle: function(e) {
    e.preventDefault();
    var field = $(e.target).attr('field');
    var val = this.model.get(field);

    if ($(e.target).text() != val)
      $(e.target).text(val);
    else
      $(e.target).text(t('toggle-placeholder'));
  },

  addField: function(field) {
    if (field.style == "name")
      return;

    if (field.name === "note")
      return;

    if (!this.model.get(field.name))
      return;

    var vars = {
      "name": t("field-" + field.name),
      "field": field.name,
      "type": field.type,
      "value": this.model.get(field.name)
    };

    var entry = "";
    if (field.type == 'password')
      entry = Cryptobox.Util.render('entry_field_password', vars);
    else
      entry = Cryptobox.Util.render('entry_field_text', vars);

    return this.list.append($(entry));
  },

  render: function() {
    this.setElement(Cryptobox.Util.render('entry', this.model.toJSON()));

    this.list = this.$(".field-list");

    _.each(Cryptobox.Fielddef[this.model.get("entry_type")].fields,
           function(field) { this.addField(field) }, this);


    //this.model.each(function(field) { self.addField(field); });

    return this;
  }
});

// This view draws particular group item (divider) in the list.
// Renders Entry model (only interested in group name).
Cryptobox.View.EntryListSeparator = Backbone.View.extend({
  render: function() {
    if (!this.model.get("group"))
      return null;
    this.setElement(Cryptobox.Util.render('entry_list_separator', { name: this.model.get("group") }));
    return this;
  }
});

// This view draws particular entry item in the list.
// Renders Entry model.
Cryptobox.View.EntryListItem = Backbone.View.extend({
  events: {},

  render: function() {
    this.setElement(Cryptobox.Util.render('entry_list_item', this.model.toJSON()));
    return this;
  }
});

// This view draws list of entries.
Cryptobox.View.EntryList = Backbone.View.extend({
  addEntry: function(entry) {
    var view = new Cryptobox.View.EntryListItem({ model: entry });
    view.render();
    this.list.append($(view.el));
  },

  addSeparator: function(entry) {
    var view = new Cryptobox.View.EntryListSeparator({ model: entry });
    view.render();
    this.list.append($(view.el));
  },

  addGroup: function(name, entries) {
    if (name)
      this.addSeparator(entries[0]);

    _.each(entries, function(entry) {
      if (entry.get("visible") && entry.get("visible") == false)
        return;

      this.addEntry(entry);
    }, this);
  },

  render: function() {
    this.setElement(Cryptobox.Util.render('entry_list', {}));
    this.list = this.$(".entry-list");

    _.each(this.model.entries().groupBy('group'), function(entries, group) {
      this.addGroup(group, entries);
    }, this);

    return this;
  }
});
