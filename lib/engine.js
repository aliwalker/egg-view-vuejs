'use strict';

const Vue = require('vue');
const LRU = require('lru-cache');
const { createBundleRenderer,
        createRenderer } = require('vue-server-renderer');

class Engine {
  constructor(app) {
    this.app = app;
    this.config = app.config.vue;
    this.renderer = createRenderer();
    this.rendererOpts = this.config.rendererOptions;

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

  /**
   * creates a bundle renderer from a bundleRenderer.
   * @param {string|object} serverBundle - @see https://ssr.vuejs.org/api/#createbundlerenderer
   * @param {object} rendererOpts - @see https://ssr.vuejs.org/api/#renderer-options
   * @return {object} - A renderer.
   */
  _createBundleRenderer(serverBundle, rendererOpts) {
    // Server from cache.
    if (this.bundleCache) {
      const renderer = this.bundleCache.get(name);
      if (renderer) {
        return renderer;
      }
    }

    const options = Object.assign({}, this.rendererOpts, rendererOpts);

    // Create a new renderer.
    const bundleRenderer = createBundleRenderer(serverBundle, options);

    // Set cache.
    if (this.bundleCache) {
      this.bundleCache.set(name, bundleRenderer);
    }
    return bundleRenderer;
  }

  /**
   * creates a bundleRenderer from `serverBundle` & calls `renderToString` on it.
   * @param {string|object} serverBundle - @see https://ssr.vuejs.org/api/#createbundlerenderer
   * @param {object} context - A rendering context.
   * @param {object} rendererOpts - @see https://ssr.vuejs.org/api/#renderer-options
   * @return {Promise} - that resolves to rendered html.
   */
  renderBundle(serverBundle, context, rendererOpts) {
    context = context || /* istanbul ignore next */ {};

    return new Promise((resolve, reject) => {
      this._createBundleRenderer(serverBundle, rendererOpts).renderToString(context, (err, html) => {
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
