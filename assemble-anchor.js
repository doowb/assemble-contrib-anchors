/*
 * Assemble Plugin: Anchor
 * https://github.com/assemble/anchor
 * Assemble is the 100% JavaScript static site generator for Node.js, Grunt.js, and Yeoman.
 *
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

var options = {
  stage: 'render:post:page'
};

var cheerio = require('cheerio');

/**
 * Anchor Plugin
 * @param  {Object}   params
 * @param  {Function} callback
 */
module.exports = function(params, callback) {

  'use strict';

  var assemble       = params.assemble;
  var grunt          = params.grunt;
  var page           = params.page;
  var content        = params.content;

  var _str           = grunt.util._.str;
  var _              = grunt.util._;


  // load current page content
  var $ = cheerio.load(content);

  // get all the h tags with an id
  var headings = $('h1,h2,h3,h4[id]');

  headings.map(function(i, e) {
    if(e.attribs.id) {
      var anchor = [
        '<a name="' + e.attribs.id + '" class="anchor" href="#' + e.attribs.id + '">',
        '  <span class="glyphicon glyphicon-link"></span>',
        '</a>\n'
      ].join('\n');

      $(this).append(anchor);
    }
  });

  params.content = $.html();

  callback();
};

module.exports.options = options;