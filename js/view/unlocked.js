"use strict";

Cryptobox.View.Unlocked = Backbone.View.extend({
  events: {
    "click .button-back": "back",
    "keydown #input-filter": "passEnter",
    "keyup #input-filter": "applyFilter",

    "click #button-generate-show": "showGenerate",
    "click #button-acknowledgments-show": "showAcknowledgments",
    "click #button-generate": "generateOnClick",
    "keydown #generate": "generateOnKey"

    // TODO: allow Alt+X fill shortcut
    //,"keydown": "kd"
  },

  /*
  kd: function(e) {
    if (e.altKey)
      console.log("KP", e);
  },
  */

  initialize: function() {
    var self = this;
    this.setElement(Cryptobox.Util.render("unlocked", {}));
    Cryptobox.instance.dispatcher.on('change:page',
      function() {
        $("#input-filter").val(self.text);
        self.applyFilter();
      });

    return this;
  },

  showAcknowledgments: function(event) {
    event.preventDefault();
    $("#acknowledgments").modal();
  },

  showGenerate: function(event) {
    event.preventDefault();
    $("#generate").modal();
  },

  generateOnClick: function(event) {
    event.preventDefault();

    $("#input-generated-password").val(Cryptobox.Util.generatePassword(
      $("#input-password-length").val(),
      $("#input-include-num").is(":checked"),
      $("#input-include-punc").is(":checked"),
      $("#input-include-uc").is(":checked")));
  },

  generateOnKey: function(event) {
    if (event.keyCode === 13)
      this.generateOnClick(event);
  },

  back: function(event) {
    event.preventDefault();
    history.back();
  },

  passEnter: function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    } else if (event.keyCode === 27) {
      $("#input-filter").val('').blur();
      this.applyFilter($("#input-filter").val().toLowerCase());
    }
  },

  // Apply current filter to the entries list.
  applyFilter: function(event) {
    this.text = $("#input-filter").val();
    var text = this.text.toLowerCase();

    var visible = null;

    if (text === "") {
      $("ul.entry-list").show();
      visible = $("ul.entry-list li").show();
      //$("ul.entry-list li.separator").show();
      $("ul.entry-list hr").show();
    } else {
      $("ul.entry-list").show();
      $("ul.entry-list li").hide();
      $("ul.entry-list hr").hide();

      visible = $("ul.entry-list li").filter(function() {
        if ($(this).text().toLowerCase().indexOf(text) >= 0)
          return true;
        else
          return false;
      });

      visible.show();

      $("ul.entry-list li.separator").hide(); // hide separators
    }

    // Show entry if it's the only one left in the filter list
    if (Cryptobox.settings.activateFiltered) {
      if (visible.length == 1) {
        var entry_id = $(visible[0]).attr("entry_id");
        Backbone.history.navigate("!/entry/" + entry_id, true);
      }
    }
  }
});
