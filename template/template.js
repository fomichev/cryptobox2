(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['entry'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n  <p>\n    <a href=\"";
  foundHelper = helpers['name-url'];
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0['name-url']; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" target=\"_blank\">";
  foundHelper = helpers['name-url'];
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0['name-url']; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a>\n  </p>\n  ";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n  <h3>";
  foundHelper = helpers['t'];
  stack1 = foundHelper ? foundHelper.call(depth0, "field-fields", {hash:{}}) : helperMissing.call(depth0, "t", "field-fields", {hash:{}});
  buffer += escapeExpression(stack1) + "</h3>\n  <table>\n    ";
  stack1 = depth0.fields;
  foundHelper = helpers.key_value;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data)}) : helperMissing.call(depth0, "key_value", stack1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </table>\n  ";
  return buffer;}
function program4(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n    <tr>\n      <td class=\"heading\">";
  foundHelper = helpers.key;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.key; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</td>\n      <td class=\"monospace\">";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</td>\n    </tr>\n    ";
  return buffer;}

function program6(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n  <h3>";
  foundHelper = helpers['t'];
  stack1 = foundHelper ? foundHelper.call(depth0, "field-attachments", {hash:{}}) : helperMissing.call(depth0, "t", "field-attachments", {hash:{}});
  buffer += escapeExpression(stack1) + "</h3>\n  <ul>\n    ";
  stack1 = depth0.attachments;
  foundHelper = helpers.key_value;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(7, program7, data)}) : helperMissing.call(depth0, "key_value", stack1, {hash:{},inverse:self.noop,fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </ul>\n  ";
  return buffer;}
function program7(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n      <li><a href=\"#!/attachment/";
  foundHelper = helpers.key;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.key; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "/";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.key;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.key; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a></li>\n    ";
  return buffer;}

function program9(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n  <h3>";
  foundHelper = helpers['t'];
  stack1 = foundHelper ? foundHelper.call(depth0, "field-note", {hash:{}}) : helperMissing.call(depth0, "t", "field-note", {hash:{}});
  buffer += escapeExpression(stack1) + "</h3>\n  ";
  foundHelper = helpers.note;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.note; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\n  ";
  return buffer;}

  buffer += "<div>\n  <h2>";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</h2>\n\n  ";
  stack1 = depth0['name-url'];
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  <table class=\"field-list\">\n  </table>\n\n  ";
  stack1 = depth0.fields;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  ";
  stack1 = depth0.attachments;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(6, program6, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  ";
  stack1 = depth0.note;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(9, program9, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n";
  return buffer;});
templates['entry_field_password'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<tr>\n  <td class=\"heading\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</td>\n  <td class=\"monospace\">\n    <div id=\"collapsible-";
  foundHelper = helpers.field;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.field; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"collapse\">";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n  </td>\n  <td>\n    <button type=\"button\" class=\"btn btn-mini\" data-toggle=\"collapse\" data-target=\"#collapsible-";
  foundHelper = helpers.field;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.field; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">\n      ";
  foundHelper = helpers['t'];
  stack1 = foundHelper ? foundHelper.call(depth0, "toggle-placeholder", {hash:{}}) : helperMissing.call(depth0, "t", "toggle-placeholder", {hash:{}});
  buffer += escapeExpression(stack1) + "\n    </button>\n  </td>\n  <td>";
  stack1 = depth0.value;
  foundHelper = helpers.to_clipboard;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:{}}) : helperMissing.call(depth0, "to_clipboard", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "</td>\n</tr>\n";
  return buffer;});
templates['entry_field_text'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<tr>\n  <td class=\"heading\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</td>\n  <td class=\"monospace\">\n    <div class=\"edit-text field-";
  foundHelper = helpers.type;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.type; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n  </td>\n  <td></td>\n  <td>";
  stack1 = depth0.value;
  foundHelper = helpers.to_clipboard;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:{}}) : helperMissing.call(depth0, "to_clipboard", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "</td>\n</tr>\n";
  return buffer;});
templates['entry_list'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<div>\n  <input type=\"text\" id=\"input-filter\" class=\"ZZZ\" placeholder=\"";
  foundHelper = helpers['t'];
  stack1 = foundHelper ? foundHelper.call(depth0, "input-filter", {hash:{}}) : helperMissing.call(depth0, "t", "input-filter", {hash:{}});
  buffer += escapeExpression(stack1) + " \">\n  <ul class=\"entry-list\"></ul>\n</div>\n";
  return buffer;});
templates['entry_list_item'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n      <img src=\"https://www.google.com/s2/favicons?domain=";
  foundHelper = helpers.hostname;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.hostname; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" />\n      &nbsp;\n      ";
  return buffer;}

  buffer += "<div>\n  <hr />\n  <li entry_id=\"";
  foundHelper = helpers.cid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.cid; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">\n    <a href=\"#!/entry/";
  foundHelper = helpers.cid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.cid; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">\n      ";
  stack1 = depth0.favicon;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  foundHelper = helpers['name-listitem'];
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0['name-listitem']; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\n    </a>\n  </li>\n</div>\n";
  return buffer;});
templates['entry_list_separator'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div>\n  <hr />\n  <li class=\"separator\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</li>\n</div>\n";
  return buffer;});
templates['fill_list'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<div>\n  <input type=\"text\" id=\"input-filter\" class=\"ZZZ\" placeholder=\"";
  foundHelper = helpers['t'];
  stack1 = foundHelper ? foundHelper.call(depth0, "input-filter", {hash:{}}) : helperMissing.call(depth0, "t", "input-filter", {hash:{}});
  buffer += escapeExpression(stack1) + " \">\n  <ul class=\"entry-list\"></ul>\n</div>\n";
  return buffer;});
templates['fill_list_item'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n      <img src=\"https://www.google.com/s2/favicons?domain=";
  foundHelper = helpers.hostname;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.hostname; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" />\n      &nbsp;\n      ";
  return buffer;}

  buffer += "<div>\n  <hr />\n  <li entry_id=\"";
  foundHelper = helpers.cid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.cid; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">\n    <a href=\"#!/fill/site/";
  foundHelper = helpers.cid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.cid; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">\n      ";
  stack1 = depth0.favicon;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  foundHelper = helpers['name-listitem'];
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0['name-listitem']; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\n    </a>\n  </li>\n</div>\n";
  return buffer;});
templates['fill_list_separator'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div>\n  <hr />\n  <li class=\"separator\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</li>\n</div>\n";
  return buffer;});
templates['link'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<div class=\"container\">\n  <div id=\"alert\" class=\"alert alert-info\"></div>\n\n  <h1>";
  foundHelper = helpers['t'];
  stack1 = foundHelper ? foundHelper.call(depth0, "link-source", {hash:{}}) : helperMissing.call(depth0, "t", "link-source", {hash:{}});
  buffer += escapeExpression(stack1) + "</h1>\n\n  <input type=\"file\" id=\"input-file\" style=\"height: 0; width: 0; overflow: hidden;\" /></input>\n\n  <div class=\"well\" style=\"max-width: 400px; margin: 0 auto 10px;\">\n    <button id=\"link-dropbox\" class=\"btn btn-block btn-large btn-primary\">";
  foundHelper = helpers['t'];
  stack1 = foundHelper ? foundHelper.call(depth0, "link-dropbox", {hash:{}}) : helperMissing.call(depth0, "t", "link-dropbox", {hash:{}});
  buffer += escapeExpression(stack1) + "</button>\n    <button id=\"link-file\" class=\"btn btn-block btn-large btn-inverse\">";
  foundHelper = helpers['t'];
  stack1 = foundHelper ? foundHelper.call(depth0, "link-file", {hash:{}}) : helperMissing.call(depth0, "t", "link-file", {hash:{}});
  buffer += escapeExpression(stack1) + "</button>\n  </div>\n</div>\n";
  return buffer;});
templates['locked'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n    <button id=\"button-unlink\" class=\"btn btn-warning\">\n      <i class=\"icon-remove\"></i> ";
  foundHelper = helpers['t'];
  stack1 = foundHelper ? foundHelper.call(depth0, "button-unlink", {hash:{}}) : helperMissing.call(depth0, "t", "button-unlink", {hash:{}});
  buffer += escapeExpression(stack1) + "\n    </button>\n";
  return buffer;}

  buffer += "<div class=\"container\">\n  <div id=\"alert\" class=\"alert alert-error\"></div>\n\n  <form id=\"form-unlock\" class=\"form-signin\">\n\n    <h2 class=\"header\">";
  foundHelper = helpers['t'];
  stack1 = foundHelper ? foundHelper.call(depth0, "header-cryptobox", {hash:{}}) : helperMissing.call(depth0, "t", "header-cryptobox", {hash:{}});
  buffer += escapeExpression(stack1) + "</h2>\n\n    <input id=\"input-password\" class=\"input-block-level\" type=\"password\" placeholder=\"";
  foundHelper = helpers['t'];
  stack1 = foundHelper ? foundHelper.call(depth0, "input-password", {hash:{}}) : helperMissing.call(depth0, "t", "input-password", {hash:{}});
  buffer += escapeExpression(stack1) + "\">\n\n    <button id=\"button-unlock\" type=\"submit\" class=\"btn\" data-loading-text=\"";
  foundHelper = helpers['t'];
  stack1 = foundHelper ? foundHelper.call(depth0, "button-unlock-loading", {hash:{}}) : helperMissing.call(depth0, "t", "button-unlock-loading", {hash:{}});
  buffer += escapeExpression(stack1) + "\">\n      <i class=\"icon-lock\"></i> ";
  foundHelper = helpers['t'];
  stack1 = foundHelper ? foundHelper.call(depth0, "button-unlock", {hash:{}}) : helperMissing.call(depth0, "t", "button-unlock", {hash:{}});
  buffer += escapeExpression(stack1) + "\n    </button>\n\n";
  foundHelper = helpers.if_can_unlink;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}); }
  else { stack1 = depth0.if_can_unlink; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  if (!helpers.if_can_unlink) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </form>\n</div>\n";
  return buffer;});
templates['page_list'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div>\n  <ul class=\"page-list\"></ul>\n</div>\n";});
templates['page_list_item'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li page_id=\"";
  foundHelper = helpers.cid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.cid; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">\n  <a href=\"#!/page/";
  foundHelper = helpers.cid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.cid; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">\n    ";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\n  </a>\n</li>\n";
  return buffer;});
templates['unlocked'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  return "\n        <div class=\"menu span2 page-list-root\"></div>\n        ";}

function program3(depth0,data) {
  
  
  return "\n        <div class=\"details span6 entry-root\"></div>\n        ";}

  buffer += "<div>\n  <div class=\"row-fluid\">\n    <div class=\"span12\">\n      <div>\n        <span class=\"header\">";
  foundHelper = helpers['t'];
  stack1 = foundHelper ? foundHelper.call(depth0, "header-cryptobox", {hash:{}}) : helperMissing.call(depth0, "t", "header-cryptobox", {hash:{}});
  buffer += escapeExpression(stack1) + "</span>\n\n        <div class=\"btn-group pull-right\">\n          <a class=\"btn\" href=\"#!/locked\" id=\"button-lock\"><i class=\"icon-lock\"></i> ";
  foundHelper = helpers['t'];
  stack1 = foundHelper ? foundHelper.call(depth0, "button-lock", {hash:{}}) : helperMissing.call(depth0, "t", "button-lock", {hash:{}});
  buffer += escapeExpression(stack1) + "</a>\n          <button class=\"btn dropdown-toggle\" data-toggle=\"dropdown\">\n            <span class=\"caret\"></span>\n          </button>\n          <ul class=\"dropdown-menu\">\n            <li><a id=\"button-generate-show\">";
  foundHelper = helpers['t'];
  stack1 = foundHelper ? foundHelper.call(depth0, "button-generate", {hash:{}}) : helperMissing.call(depth0, "t", "button-generate", {hash:{}});
  buffer += escapeExpression(stack1) + "</a></li>\n            <li><a id=\"button-acknowledgments-show\">";
  foundHelper = helpers['t'];
  stack1 = foundHelper ? foundHelper.call(depth0, "button-acknowledgments", {hash:{}}) : helperMissing.call(depth0, "t", "button-acknowledgments", {hash:{}});
  buffer += escapeExpression(stack1) + "</a></li>\n          </ul>\n        </div>\n      <div class=\"row-fluid\">\n        ";
  foundHelper = helpers.if_not_extension;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}); }
  else { stack1 = depth0.if_not_extension; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  if (!helpers.if_not_extension) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        <div class=\"menu span4 entry-list-root fill-list-root\"></div>\n\n        ";
  foundHelper = helpers.if_not_extension;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)}); }
  else { stack1 = depth0.if_not_extension; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  if (!helpers.if_not_extension) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </div>\n    </div>\n  </div>\n\n  <div id=\"generate\" class=\"modal hide fade\">\n    <div class=\"modal-header\">\n      <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n      <h3>";
  foundHelper = helpers['t'];
  stack1 = foundHelper ? foundHelper.call(depth0, "title-generate", {hash:{}}) : helperMissing.call(depth0, "t", "title-generate", {hash:{}});
  buffer += escapeExpression(stack1) + "</h3>\n    </div>\n    <div class=\"modal-body\">\n      <form>\n        <label>\n          ";
  foundHelper = helpers['t'];
  stack1 = foundHelper ? foundHelper.call(depth0, "label-password-length", {hash:{}}) : helperMissing.call(depth0, "t", "label-password-length", {hash:{}});
  buffer += escapeExpression(stack1) + "\n          <input type=\"text\" id=\"input-password-length\" value=\"16\" />\n        </label>\n        <label class=\"checkbox inline\">\n          <input type=\"checkbox\" id=\"input-include-num\" checked />\n          ";
  foundHelper = helpers['t'];
  stack1 = foundHelper ? foundHelper.call(depth0, "label-password-numbers", {hash:{}}) : helperMissing.call(depth0, "t", "label-password-numbers", {hash:{}});
  buffer += escapeExpression(stack1) + "\n        </label>\n        <label class=\"checkbox inline\">\n          <input type=\"checkbox\" id=\"input-include-punc\" />\n          ";
  foundHelper = helpers['t'];
  stack1 = foundHelper ? foundHelper.call(depth0, "label-password-punctuation", {hash:{}}) : helperMissing.call(depth0, "t", "label-password-punctuation", {hash:{}});
  buffer += escapeExpression(stack1) + "\n        </label>\n        <label class=\"checkbox inline\">\n          <input type=\"checkbox\" id=\"input-include-uc\" checked />\n          ";
  foundHelper = helpers['t'];
  stack1 = foundHelper ? foundHelper.call(depth0, "label-password-upper-case", {hash:{}}) : helperMissing.call(depth0, "t", "label-password-upper-case", {hash:{}});
  buffer += escapeExpression(stack1) + "\n        </label>\n      </form>\n      <label>\n        ";
  foundHelper = helpers['t'];
  stack1 = foundHelper ? foundHelper.call(depth0, "label-password-result", {hash:{}}) : helperMissing.call(depth0, "t", "label-password-result", {hash:{}});
  buffer += escapeExpression(stack1) + "\n        <input type=\"text\" id=\"input-generated-password\" size=\"30\" />\n      </label>\n    </div>\n    <div class=\"modal-footer\">\n      <a id=\"button-generate-close\" href=\"#\" class=\"btn\" data-dismiss=\"modal\" aria-hidden=\"true\">";
  foundHelper = helpers['t'];
  stack1 = foundHelper ? foundHelper.call(depth0, "button-close", {hash:{}}) : helperMissing.call(depth0, "t", "button-close", {hash:{}});
  buffer += escapeExpression(stack1) + "</a>\n      <a id=\"button-generate\" href=\"#\" class=\"btn btn-primary\">";
  foundHelper = helpers['t'];
  stack1 = foundHelper ? foundHelper.call(depth0, "button-generate", {hash:{}}) : helperMissing.call(depth0, "t", "button-generate", {hash:{}});
  buffer += escapeExpression(stack1) + "</a>\n    </div>\n  </div>\n\n  <div id=\"acknowledgments\" class=\"modal hide fade\">\n    <div class=\"modal-header\">\n      <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n      <h3>";
  foundHelper = helpers['t'];
  stack1 = foundHelper ? foundHelper.call(depth0, "title-acknowledgments", {hash:{}}) : helperMissing.call(depth0, "t", "title-acknowledgments", {hash:{}});
  buffer += escapeExpression(stack1) + "</h3>\n    </div>\n    <div class=\"modal-body\">\n      <table class=\"table table-striped\">\n        <thead>\n          <tr>\n            <th>Component</th>\n            <th>License</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><a target=\"_blank\" href=\"http://somerandomdude.com/work/iconic/\">Iconic</a></td>\n            <td>CC BY-SA 3.0</td>\n          </tr>\n          <tr>\n            <td><a target=\"_blank\" href=\"http://subtlepatterns.com/light-wool/\">Background</a></td>\n            <td>CC BY-SA 3.0</td>\n          </tr>\n          <tr>\n            <td><a target=\"_blank\" href=\"https://code.google.com/p/crypto-js/\">CryptoJS 3.0.2</a></td>\n            <td>New BSD License</td>\n          </tr>\n          <tr>\n            <td><a target=\"_blank\" href=\"http://davidbau.com/archives/2010/01/30/random_seeds_coded_hints_and_quintillions.html\">Random Seed 2.0</a></td>\n            <td>BSD</td>\n          </tr>\n          <tr>\n            <td><a target=\"_blank\" href=\"http://backbonejs.org\">Backbone.js 0.9.10</a></td>\n            <td>MIT</td>\n          </tr>\n          <tr>\n            <td><a target=\"_blank\" href=\"http://underscorejs.org\">Underscore.js 1.4.4</a></td>\n            <td>MIT</td>\n          </tr>\n          <tr>\n            <td><a target=\"_blank\" href=\"http://jquery.com\">jQuery 1.8.3</a></td>\n            <td>MIT</td>\n          </tr>\n          <tr>\n            <td><a target=\"_blank\" href=\"http://twitter.github.com/bootstrap/\">Twitter Bootstrap 2.2.2</a></td>\n            <td>Apache License, Version 2.0</td>\n          </tr>\n          <tr>\n            <td><a target=\"_blank\" href=\"https://github.com/wycats/handlebars.js\">Handlebars 1.0.rc.1</a></td>\n            <td>MIT</td>\n          </tr>\n          <tr>\n            <td><a target=\"_blank\" href=\"https://github.com/mojombo/clippy\">Clippy 7329b72360</a></td>\n            <td>MIT</td>\n          </tr>\n          <tr>\n            <td><a target=\"_blank\" href=\"https://github.com/dropbox/dropbox-js\">dropbox-js 0.9.1</a></td>\n            <td>MIT</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"modal-footer\">\n      <a id=\"button-generate-close\" href=\"#\" class=\"btn\" data-dismiss=\"modal\" aria-hidden=\"true\">";
  foundHelper = helpers['t'];
  stack1 = foundHelper ? foundHelper.call(depth0, "button-close", {hash:{}}) : helperMissing.call(depth0, "t", "button-close", {hash:{}});
  buffer += escapeExpression(stack1) + "</a>\n    </div>\n  </div>\n</div>\n";
  return buffer;});
})();