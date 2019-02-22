'use strict';

const Vue = require('vue');
const LRU = require('lru-cache');
const vueServerRenderer = require('vue-server-renderer');

class Engine {
  constructor(app) {
    this.app = app;
    this.config = app.config.vue;
    this.vueServerRenderer = vueServerRenderer;
    this.renderer = this.vueServerRenderer.createRenderer();
    this.renderOptions = this.config.rendererOptions;

    if (this.config.cache === true) {
      this.bundleCache = new LRU({
        max: 1000,
        maxAge: 1000 * 3600 * 24 * 7,
      });
    } else if (typeof this.config.cache === 'object') {
      if (this.config.cache.set && this.config.cache.get) {
        this.bundleCache = this.config.cache;
      } else {
        this.bundleCache = new LRU(this.config.cache);
      }
    }
  }

  createBundleRenderer(name, renderOptions) {
    if (this.bundleCache) {
      const bundleRenderer = this.bundleCache.get(name);
      if (bundleRenderer) {
        return bundleRenderer;
      }
    }
    const bundleRenderer = this.vueServerRenderer.createBundleRenderer(name, Object.assign({}, this.renderOptions, renderOptions));
    if (this.bundleCache) {
      this.bundleCache.set(name, bundleRenderer);
    }
    return bundleRenderer;
  }

  renderBundle(name, context, renderOptions) {
    context = context || /* istanbul ignore next */ {};

    return new Promise((resolve, reject) => {
      this.createBundleRenderer(name, renderOptions).renderToString(context, (err, html) => {
        if (err) {
          reject(err);
        } else {
          resolve(html);
        }
      });
    });
  }

  renderString(tpl, locals, options) {
    const vConfig = Object.assign({ template: tpl, data: locals }, options);
    const vm = new Vue(vConfig);
    return new Promise((resolve, reject) => {
      this.renderer.renderToString(vm, (err, html) => {
        if (err) {
          reject(err);
        } else {
          resolve(html);
        }
      });
    });
  }
}

module.exports = Engine;
