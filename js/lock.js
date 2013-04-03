"use strict";

// Class that implements auto locking.
//
// Create a new lock with `callback` that is called when
// lock `timeoutSec` expires.
//
// Note, because this file is included in Extension background page it
// should not depend on any external libraries (e.g. jquery).
Cryptobox.Lock = function(timeoutSec, callback) {
  this.timeoutSec = timeoutSec;
  this.callback = callback;


  // Start auto lock.
  // This function will attach to `mousemove` event to check whether
  // user does some interaction with the application. Also, periodically,
  // (each minute) application will check whether user didn't interact
  // with the application for `timeoutSec` number of seconds and lock it.
  this.start = function() {
    var self = this;

    this.timeoutId = 0;
    this.rewind_callback = function() { self.rewind(); };

    document.addEventListener('mousemove', this.rewind_callback);
    document.addEventListener('keydown', this.rewind_callback);
    document.addEventListener('click', this.rewind_callback);

    //console.log("Start lock");

    this.rewind();
  };

  // Reset lock timeout. Called when mouse has been moved to indicate that
  // user still interacts with the application and we don't need to lock it.
  this.rewind = function() {
    var self = this;

    if (this.timeoutId !== 0)
      clearTimeout(this.timeoutId);

    this.timeoutId = setTimeout(function() { self.lock(); },
        this.timeoutSec * 1000);
  };

  // Stop lock immediately.
  this.stop = function() {
    //console.log("Stop lock");

    document.removeEventListener('mousemove', this.rewind_callback);
    document.removeEventListener('keydown', this.rewind_callback);
    document.removeEventListener('click', this.rewind_callback);

    if (this.timeoutId !== 0)
      clearTimeout(this.timeoutId);
    this.timeoutId = 0;
  };

  // This routine is called when lock timeout expires.
  this.lock = function() {
    this.stop();
    this.callback();
  };
};
