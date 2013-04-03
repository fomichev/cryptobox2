"use strict";

var AppRouter = Backbone.Router.extend({
  routes: {
    "":                         "unlocked",
    "!/":                       "unlocked",
    "!/unlocked":               "unlocked",
    "!/link":                   "link",
    "!/unlink":                 "unlink",
    "!/locked":                 "locked",
    "!/page/:cid":              "page",
    "!/entry/:cid":             "entry",
    "!/fill/:type/:cid":        "fill",
    "!/attachment/:name/:hash": "attachment"
  },

  unlocked: function() {
    Cryptobox.Util.getState(function(state) {
      Cryptobox.instance.lock = new Cryptobox.Lock(Cryptobox.settings.lockTimeout,
        function() { Backbone.history.navigate('!/locked', true); });
      Cryptobox.instance.lock.start();

      var view = new Cryptobox.View.Unlocked;
      view.render();

      if (Cryptobox.Extension.running()) {
        Cryptobox.Extension.prepare(function() {
          var subview = new Cryptobox.View.FillList({
            model: state,
            forms: Cryptobox.Extension.forms,
            url: Cryptobox.Extension.url
          });
          subview.render();
          view.$('.fill-list-root').html($(subview.el));

          Cryptobox.Util.transition('#content', view, function() {
            $('#input-filter').focus();
          });
        });
      } else {
        var subview = new Cryptobox.View.PageList({ model: state.pages() });
        subview.render();
        view.$('.page-list-root').html($(subview.el));

        Cryptobox.Util.transition('#content', view, function() {
          $('#input-filter').focus();

          return Backbone.history.navigate('!/page/' + state.favoritesPageCid(), true);
        });
      }
    });
  },

  link: function() {
    Cryptobox.Util.link(function(error) {
      if (!error) {
        Backbone.history.navigate('!/unlocked', true);
        return;
      }

      var view = new Cryptobox.View.Link;
      view.render();
      $('#content').html($(view.el));
    });
  },

  unlink: function() {
  },

  locked: function() {
    if (Cryptobox.instance.lock)
      Cryptobox.instance.lock.stop();

    Cryptobox.Util.clearState();

    Cryptobox.Util.link(function(error) {
      if (error) {
        Backbone.history.navigate('!/link', true);
        return;
      }

      var view = new Cryptobox.View.Locked;
      view.render();

      Cryptobox.Util.transition('#content', view, function() {
        $('#input-password').focus();
      });
    });
  },

  page: function(cid) {
    Cryptobox.Util.getState(function(state) {
      var page = state.findPage(cid);
      if (!page)
        return;

      var subview = new Cryptobox.View.EntryList({ model: page });
      subview.render();
      $('.entry-root').html('');

      Cryptobox.Util.transition('.entry-list-root', subview, function() {
        $('#input-filter').focus();
      },
      'change:page');

      // highlight active page
      // TODO: move somewhere?
      // {{{
      $("ul.page-list li").removeClass("active");
      $("ul.page-list li[page_id=" + cid +"]").addClass("active");
      // }}}
    });
  },

  entry: function(cid) {
    Cryptobox.Util.getState(function(state) {
      var entry = state.findEntry(cid);
      if (!entry)
        return;

      var subview = new Cryptobox.View.Entry({ model: entry });
      subview.render();
      Cryptobox.Util.transition('.entry-root', subview, function() {
        //$(window).scrollTop($('.entry-root').position().top);
        $('#input-filter').focus();
      });

      // highlight active entry
      // TODO: move somewhere?
      // {{{
      $("ul.entry-list li").removeClass("active");
      $("ul.entry-list li[entry_id=" + cid + "]").addClass("active");
      // }}}
    });
  },

  fill: function(type, cid) {
    Cryptobox.Util.getState(function(state) {
      var model = state.findEntry(cid);
      if (!model)
        return;

      switch (model.get("entry_type")) {
      case "site":
        var data = {
          url: model.get("url"),
          user: model.get("user"),
          pass: model.get("pass")
        };

        console.log("DATA", data);

        if (model.get("fields"))
          data['fields'] = model.get("fields").toJSON();

        Cryptobox.Extension.fill(model.get("url"), data);

        break;

      case "identity":
        console.log("TODO: fill identity");
        break;

      case "card":
        console.log("TODO: fill card");
        break;

      default:
        console.log("TODO: UNKNOWN");
      }
    });
  },

  attachment: function(name, hash) {
    Cryptobox.Util.getState(function(state) {
      var type = "application/octet-stream";

      var types = {
        ".png": "image/png",
        ".gif": "image/gif",
        ".jpg": "image/jpg",
        ".jpeg": "image/jpg",
        ".bmp": "image/bmp",
        ".pdf": "application/pdf"
      };

      for (var key in types)
        if (name.endsWith(key)) {
          type = types[key];
          break;
        }

      Cryptobox.instance.backend.getAttachment(hash, function(encrypted) {
        var data = Cryptobox.Util.decrypt64(
          Cryptobox.instance.key,
          encrypted,
          Cryptobox.instance.iv);

        if (type.startsWith('image')) {
          var html = "<img src=\"data:" + type + ";base64," + data + "\">";
          var w = window.open('', '_blank');
          $(w.document.body).html(html);
        } else {
          window.open("data:" + type + ";base64," + data);
        }
      });
    });
  }
});

$(document).ready(function() {
  Cryptobox.instance.dispatcher = _.clone(Backbone.Events);

  var app_router = new AppRouter;
  Backbone.history.start();
});
