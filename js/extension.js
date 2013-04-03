"use strict";

//
Cryptobox.Extension.url = null;

Cryptobox.Extension.running = function() {
  if (window.chrome != undefined && window.chrome.extension != undefined)
    return true;

  return false;
};

Cryptobox.Extension.fill = function(url, data) {
  if (Cryptobox.Util.sitename(url) ===
      Cryptobox.Util.sitename(Cryptobox.Extension.url)) {

    Cryptobox.Extension.Chrome.sendToContentScript({ type: "fillSiteForm", data: data }, function() {});
    window.close();
  } else {
    console.log("DATAURL", data.url);

    Cryptobox.Extension.Chrome.createTab(data.url, function(tab) {
      chrome.extension.getBackgroundPage().fill[tab.id] = data;
    });
  }
};

Cryptobox.Extension.prepare = function(callback) {
  $('body').css('max-width', '400px');

  chrome.tabs.getSelected(null, function(tab) {
    Cryptobox.Extension.url = tab.url;
    Cryptobox.Extension.forms = null;

    var msg = { type: "analyze" };

    chrome.tabs.executeScript(tab.id, {file: "js/inject.js"}, function() {
      chrome.tabs.sendMessage(tab.id, msg, function(rsp) {
        Cryptobox.Extension.forms = rsp;
        // stop background lock when popup has been opened
        chrome.extension.getBackgroundPage().lock.stop();
        callback();

        $(window).unload(function() {
          // start background lock when popup goes away
          chrome.extension.getBackgroundPage().lock.start();
        });
      });
    });
  });
};

Cryptobox.Extension.setState = function(state) {
  chrome.extension.getBackgroundPage().state = state;
};
Cryptobox.Extension.getState = function(callback) {
  callback(chrome.extension.getBackgroundPage().state);
};
Cryptobox.Extension.clearState = function(state) {
  Cryptobox.Util.del(chrome.extension.getBackgroundPage().state);
  chrome.extension.getBackgroundPage().state = null;
};

Cryptobox.Extension.Chrome = {};

Cryptobox.Extension.Chrome.sendTo = function(tab, message, callback) {
  chrome.tabs.sendMessage(tab.id, message, function(response) {
    callback(response);
  });
};

// Send `message` to content script and execute `callback` upon response arrival.
Cryptobox.Extension.Chrome.sendToContentScript = function(message, callback) {
  chrome.tabs.getSelected(null, function(tab) {
    Cryptobox.Extension.Chrome.sendTo(tab, message, callback);
  });
};

Cryptobox.Extension.Chrome.createTab = function(url, callback) {
  chrome.tabs.create({ url: url, selected: true} ,
      function(tab) { callback(tab) });
};

// Copy `text` to clipboard.
Cryptobox.Extension.copyToClipboard = function(text) {
  chrome.extension.getBackgroundPage().clipboardCopyNum++;
  chrome.extension.sendRequest({ text: text });
};

// Clean clipboard (actually paste some stub text)
Cryptobox.Extension.cleanClipboard = function() {
  if (chrome.extension.getBackgroundPage().clipboardCopyNum != 0)
    Cryptobox.Extension.copyToClipboard(t('msg-clipboard-clean'));
};
