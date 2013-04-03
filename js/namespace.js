"use strict";

window.Cryptobox = {};
Cryptobox.Model = {};
Cryptobox.Collection = {};
Cryptobox.View = {};
Cryptobox.Backend = {};
Cryptobox.Util = {};
Cryptobox.Extension = {};

Cryptobox.instance = {};
Cryptobox.instance.backend = null;
Cryptobox.instance.lock = null;
Cryptobox.instance.dispatcher = null;
Cryptobox.instance.state = null;

Cryptobox.settings = {};
Cryptobox.settings.lockTimeout = 5 * 60;
Cryptobox.settings.activateFiltered = true;

Cryptobox.Error = {};
Cryptobox.Error.OK = 0;
Cryptobox.Error.UNKNOWN = 1;
Cryptobox.Error.NOT_LINKED = 2;

Cryptobox.Message = {
  en: {
    'header-cryptobox': 'Cryptobox',
    'toggle-placeholder': 'Reveal',

    'page-site': 'Sites',
    'page-account': 'Accounts',
    'page-identity': 'Identities',
    'page-app': 'Applications',
    'page-note': 'Notes',
    'page-card': 'Credit cards',
    'page-bookmark': 'Bookmarks',
    'page-favorites': 'Favorites',

    'field-type': 'Type',
    'field-host': 'Hostname',
    'field-smtp': 'SMTP',
    'field-imap': 'IMAP',
    'field-key': 'Key',
    'field-cardholder': 'Cardholder',
    'field-number': 'Number',
    'field-pin': 'PIN',
    'field-cvv': 'CVV',
    'field-kind': 'Kind',
    'field-issue': 'Issue date',
    'field-expiry': 'Expiry date',
    'field-url': 'URL',
    'field-phone': 'Phone',
    'field-firstname': 'Fist name',
    'field-middlename': 'Middle name',
    'field-lastname': 'Last name',
    'field-birth': 'Date and place of birth',
    'field-company': 'Company',
    'field-job': 'Job',
    'field-passport': 'Passport',
    'field-country': 'Country',
    'field-state': 'State',
    'field-city': 'City',
    'field-address1': 'Address 1',
    'field-address2': 'Address 2',
    'field-zip': 'ZIP',
    'field-user': 'Username',
    'field-pass': 'Password',
    'field-secret': 'Secret',
    'field-fields': 'Form fields',
    'field-attachments': 'Attached files',
    'field-note': 'Notes',

    'input-password': 'Password',
    'input-filter': 'Filter',

    'title-generate': 'Generate password',
    'title-acknowledgments': 'Acknowledgments',

    'label-password-length': 'Length',
    'label-password-numbers': 'Numbers',
    'label-password-punctuation': 'Punctuation',
    'label-password-upper-case': 'Uppercase',
    'label-password-result': 'Result',

    'button-close': 'Close',
    'button-lock': 'Lock',
    'button-generate': 'Generate password',
    'button-acknowledgments': 'Acknowledgments',
    'button-unlock': 'Unlock',
    'button-unlock-loading': 'Decrypting...',
    'button-unlink': 'Unlink',
    'button-signin': 'Sign in',

    'link-source': 'Select data source',
    'link-dropbox': 'Dropbox',
    'link-file': 'Local file',
    'link-dropbox-alert': 'Please refresh current page after you link with Dropbox!',

    'msg-clipboard-clean': 'Cryptobox has cleared your clipboard!'
  }
};
