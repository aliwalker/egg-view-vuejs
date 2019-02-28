'use strict';

const LRU = require('lru-cache');
const path = require('path');

module.exports = (appInfo) => {
  const config = {};

  config.view = {
    defaultViewEngine: 'vue',
    mapping: {
      '.js': 'vue',
    },
  };

  config.vue = {
    cache: true,
    // @see https://ssr.vuejs.org/api/#renderer-options
    rendererOptions: {
      cache: new LRU({
        max: 10000,
        maxAge: 1000 * 60 * 15,
        runInNewContext: false,
      }),
    },
  };

  return config;
};
