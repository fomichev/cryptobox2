"use strict";

// This variable shares form fill information with content script of tab.
chrome.extension.getBackgroundPage().fill = {};

// Preserved state.
chrome.extension.getBackgroundPage().state = null;

// Background lock.
chrome.extension.getBackgroundPage().lock = new Cryptobox.Lock(
    Cryptobox.settings.lockTimeout,
    function() {
      chrome.extension.getBackgroundPage().state = null;
    });

// Clipboard copy handler.
chrome.extension.onRequest.addListener(function(msg, sender, sendResponse) {
  var body = document.getElementsByTagName("body")[0];
  var ta = document.createElement("textarea");
  body.appendChild(ta);
  ta.value = msg.text;
  ta.select();
  document.execCommand("copy", false, null);
  body.removeChild(ta);
  sendResponse({});
});

// Unmatched form fill handler.
chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
  if (info.status === "complete" && chrome.extension.getBackgroundPage().fill[tabId]) {
    var msg = {
      type: "fillSiteForm",
      data: chrome.extension.getBackgroundPage().fill[tabId]
    };

    chrome.tabs.executeScript(tabId, {file: "js/inject.js"}, function() {
      chrome.tabs.sendMessage(tabId, msg, function() {});
    });

    delete chrome.extension.getBackgroundPage().fill[tabId];
  }
});
