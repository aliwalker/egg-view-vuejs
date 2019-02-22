'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, ' + this.app.plugins.vue.name;
  }

  async renderString() {
    const ctx = this.ctx;
    ctx.body = await ctx.renderString('<div>name:{{name}},desc:{{desc}}</div>', {
      name: 'egg-view-orvue',
      desc: 'egg view plugin for vue'
    });
  }

  async renderStringError() {
    const ctx = this.ctx;
    try {
      ctx.body = await ctx.renderString('<div>name:{{user.name}},desc:{{user.desc}}</div>', {
        name: 'egg-vue-view',
        desc: 'egg view plugin for vue',
      });
    } catch (err) {
      ctx.status = 500;
      ctx.body = err.toString();
    }
  }

  async renderError() {
    const ctx = this.ctx;
    try {
      await ctx.render('error.js', {
        data: {
          name: 'vue render',
          description: 'egg view plugin for swig',
        },
      });
    } catch (e) {
      ctx.status = 500;
      ctx.body = e.toString();
    }
  }

  async render() {
    const ctx = this.ctx;
    await ctx.render('test.js', { message: 'egg-view-vue#vue server side render!' });
  }
}

module.exports = HomeController;
