"use strict";

// This file is injected in the actual page whenever we need to
// do form fill or form analysis (read, when we open extension popup for
// current page).

// Return array of forms that can be filled with site login data.
var findSiteForm = function() {
  var result = [];

  for (var i = 0; i < document.forms.length; i++) {
    var form = document.forms[i];

    var hasUser = false;
    var hasPass = false;

    for (var j = 0; j < form.elements.length; j++) {
      var el = form[j];

      // we are not interested in hidden elements and buttons
      if (el.type == "hidden" ||
          el.type == "button" ||
          el.type == "reset" ||
          el.type == "submit")
        continue;

      //var type = el.tagName; // textarea, input

      if (el.type == "email" || el.type == "text")
        hasUser = true;

      if (el.type == "password")
        hasPass = true;
    }

    if (hasUser && hasPass)
      result.push(form);
  }

  return result;
};

// Return array of forms that can be filled with identity data.
// Check for associated label and try to guess filed meaning?
// http://stackoverflow.com/questions/285522/find-html-label-associated-with-a-given-input
var findIdentityForm = function() {
  var result = [];

  return result;
};

// Return array of forms that can be filled with credit card data.
var findCardForm = function() {
  var result = [];

  return result;
};

var fillSiteForm = function(forms, data) {
  for (var i = 0; i < forms.length; i++) {
    var form = forms[i];

    for (var j = 0; j < form.elements.length; j++) {
      var el = form[j];

      // we are not interested in hidden elements and buttons
      if (el.type == "hidden" ||
          el.type == "button" ||
          el.type == "reset" ||
          el.type == "submit")
        continue;

      if (el.type == "email" || el.type == "text")
        el.value = data.user;

      if (el.type == "password")
        el.value = data.pass;

      // TODO: fill other fields from data.fields
      if (data.fields)
        for (var name in data.fields) {
          var value = data.fields[name];

          if (el.name == name)
            el.value = value;
        }
    }
  }
};

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.type === "fillSiteForm") {
    var forms = findSiteForm();
    fillSiteForm(forms, msg.data);
    return false;
  } else if (msg.type === "analyze") {
    sendResponse({
      hasSiteForm: findSiteForm().length != 0,
      hasIdentityForm: findIdentityForm().length != 0,
      hasCardForm: findCardForm().length != 0
    });
    return true;
  }
});
