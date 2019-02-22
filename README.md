# egg-view-orvue

Forked from [egg-view-vue](https://github.com/eggjs/egg-view-vue). A plugin that integrates vue.js for egg.js. Used for server-side rendering.

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

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
