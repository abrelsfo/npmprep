#!/usr/bin/env node
'use strict';
var meow = require('meow');
const updateNotifier = require('update-notifier');
var npmprep = require('./');

var cli = meow([
	'Usage',
	'  $ npmprep',
	'',
	'Examples',
	'  $ npmprep',
	'  Removes the title, tries to publish to npm, adds title back to README'
]);

updateNotifier({pkg: cli.pkg}).notify();

npmprep();
