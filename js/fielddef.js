Cryptobox.Fielddef = {
  "site":
  {
    "page": "site",
    "fields":
    [
      { "name": "url", "type": "url", "style": "name", "scheme": "https", "optional": false, "favicon": true },
      { "name": "user", "type": "text", "style": "name-details", "optional": false },

      { "name": "pass", "type": "password", "optional": false },
      { "name": "secret", "type": "password" },
      { "name": "note", "type": "note" }
    ]
  },
  "identity":
  {
    "page": "identity",
    "fields":
    [
      { "name": "firstname", "type": "text", "style": "name", "optional": false },
      { "name": "lastname", "type": "text", "style": "name-details", "optional": false },

      { "name": "middlename", "type": "text" },
      { "name": "address1", "type": "text" },
      { "name": "address2", "type": "text" },
      { "name": "country", "type": "text" },
      { "name": "city", "type": "text" },
      { "name": "state", "type": "text" },
      { "name": "zip", "type": "text" },
      { "name": "phone", "type": "phone" },
      { "name": "birth-date", "type": "date" },
      { "name": "birth-place", "type": "text" },
      { "name": "company", "type": "text" },
      { "name": "job", "type": "text" },
      { "name": "passport", "type": "textarea" },
      { "name": "note", "type": "note" }
    ]
  },
  "note":
  {
    "page": "note",
    "fields":
    [
      { "name": "name", "type": "text", "style": "name", "optinal": false },
      { "name": "note", "type": "note" }
    ]
  },

  "card":
  {
    "page": "card",
    "fields":
    [
      { "name": "bank", "type": "text", "style": "name" },
      { "name": "cardholder", "type": "text", "style": "name-details" },

      { "name": "number", "type": "text" },
      { "name": "kind", "type": "enum", "values": [ "mastercard", "visa", "other" ] },
      { "name": "cvv", "type": "password" },
      { "name": "pin", "type": "password" },
      { "name": "secret", "type": "password" },
      { "name": "issue", "type": "date" },
      { "name": "expiry", "type": "date" },
      { "name": "url", "type": "url", "scheme": "https" },
      { "name": "phone", "type": "phone" },
      { "name": "note", "type": "note" }
    ]
  },
  "bookmark":
  {
    "page": "bookmark",
    "fields":
    [
      { "name": "url", "type": "url", "scheme": "https", "style": "name" },

      { "name": "note", "type": "note" }
    ]
  },
  "app":
  {
    "page": "app",
    "fields":
    [
      { "name": "name", "type": "text", "style": "name" },

      { "name": "key", "type": "text", "optional": false },
      { "name": "note", "type": "note" }
    ]
  },
  "account-ftp":
  {
    "page": "account",
    "fields":
    [
      { "name": "host", "type": "url", "scheme": "ftp", "style": "name" },
      { "name": "user", "type": "text", "style": "name-details" },

      { "name": "pass", "type": "password" }
    ]
  },
  "account-mail":
  {
    "page": "account",
    "fields":
    [
      { "name": "host", "type": "url", "scheme": "http", "style": "name" },
      { "name": "user", "type": "text", "style": "name-details" },

      { "name": "pass", "type": "password" },
      { "name": "smtp", "type": "url", "scheme": "smtp" },
      { "name": "imap", "type": "url", "scheme": "imap" },
      { "name": "pop3", "type": "url", "scheme": "pop3" }
    ]
  },
  "account-ssh":
  {
    "page": "account",
    "fields":
    [
      { "name": "host", "type": "url", "scheme": "ssh", "style": "name" },
      { "name": "user", "type": "text", "style": "name-details" },

      { "name": "pass", "type": "password" }
    ]
  }
};
