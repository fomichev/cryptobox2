#!/usr/bin/env ruby -w

require 'json'

data = File.read('cryptobox.json')
puts JSON.parse(data)
