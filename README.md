# Cryptobox - Passwords storage solution

## Overview
This is next major version of
[Cryptobox](https://github.com/fomichev/cryptobox)
without its huge design flaw - complicated post-processing of source YAML
(it was not possible to edit this post-processed data and convert it
back to YAML; all post-processing was done in Ruby, so in order to add
support for in-HTML editing, I had to port all this logic to JavaScript).

Now, source format of the cryptobox is plain JSON. This still lefts the
possibility to edit it via external editor (it doesn't look as nice and
clean as YAML thought, but who cares, edits are rare), but now adds
possibility to easily edit and save it from the HTML application (not yet
implemented, there is just a possibility).
Additionally, I removed include files and now support predefined set
of entries. This leads to more complicated form filling logic (no form
layout anymore, so we need to guess where to put username and password),
but it frees user (me) from obtaining form layout with bookmarklet.

Another differences from original version:
- no more CoffeeScript (I'm not sold);
- no mobile version, I was finally able to play with responsive features of
  Bootstrap and now it looks even better than jQuery mobile (speed-wise);
- all features in single application without preprocessing;
- portable HTML with linked data is still provided but focus has been
  shifted more towards universal application which you can feed data from
  Dropbox or local file or any other source;

I'll probably convert old README from original version someday and add
more details here, but for now, the only documentation is code and
[sample file](https://github.com/fomichev/cryptobox2/blob/master/sample/sample.json).
Also, there's
[HTML page](https://github.com/fomichev/cryptobox2/blob/master/sample/cryptobox/portable.html)
that has been generated from the sample file.

## TODO
### Format
* card -> wallet

### Tests
* bring them back
* add 'given sample database' - should be handy for cryptobox-get/set
* test for the case when incorrect JSON has been saved

### HTML
* model -> collection where appropriate
* add more account types
* ? add tags support
* add support for attachments in external files (so cryptobox.json doesn't get too big)

### Chrome extension
* add possibility to view entry details (in modal dialog?)
* copy/paste
* bring back alias support (for filling, propose aliased entries)
* implement form/identity/card filling (should be extensible by user)
* add some command shortcuts and possibility to navigate using only keyboard
  (ctrl + N to fill Nth entry)

### Ruby
* add --pbkdf2-iter and --aes-keylen arguments to create command
* check enums and optional fields
* add setting to keep specified number of backups and copy the whole directory
* ? don't create subfolder for cryptobox, store all files in the same dir
  as .cryptoboxrc (or think about other sane file hierarchy)
* add small websocket based server to share local data with browser
  extension (because of fucking web browser model that don't
  let us read/write user selected local files).
  Think about safe way to override data without exposing any sensitive
  information.
