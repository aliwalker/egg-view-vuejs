# egg-view-vuejs

Forked from [egg-view-vue](https://github.com/eggjs/egg-view-vue). An egg.js plugin that integrates vue.js for server-side rendering.

## Install

```bash
$ npm i egg-view-vuejs --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.vue = {
  enable: true,
  package: 'egg-view-vuejs',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.vue = {
  cache: true,
  /* See https://ssr.vuejs.org/api/#renderer-options */
  rendererOption: {
    clientManifest: ...,
    template: ...,
  }
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

```js
// To render from a serverBundle from a controller:
class HomeController extends egg.Controller {
  async home() {
    const ctx = this.ctx;
    // Render from a server bundle.
    await ctx.render('vue-ssr-server-bundle.json', {
      // render context.
      data: {
        name: 'vue render',
        description: 'egg view plugin for swig',
      },
    });
  }

  async foo() {
    const ctx = this.ctx;
    // Render directly from tempalte string.
    ctx.body = await ctx.renderString('<div>name: {{ name }}, desc: {{ desc }}</div>', {
      name: 'Cool',
      desc: 'Freaking cool',
    });
  }
  ...
}
```

## License

[MIT](LICENSE)
