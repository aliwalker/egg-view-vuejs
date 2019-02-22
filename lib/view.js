'use strict';
const RENDER = Symbol('#VueView#_render');

class View {
  constructor(ctx) {
    this.app = ctx.app;
  }

  /**
   * render - renders from a file.
   *  @param {string} name - An absolute path to file.
   *  @param {Object} locals - Context to the template.
   *  @param {Object} options - renderOptions.
   */
  render(name, locals, options) {
    options || (options = {});

    return this[RENDER](name, { state: locals }, options.renderOptions);
  }

  [RENDER](name, context, renderOptions) {
    return this.app.vue.renderBundle(name, context, renderOptions);
  }

  renderString(tpl, locals) {
    return this.app.vue.renderString(tpl, locals);
  }
}

module.exports = View;
