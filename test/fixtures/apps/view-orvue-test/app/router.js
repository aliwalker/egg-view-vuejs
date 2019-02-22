'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.get('/renderString', controller.home.renderString);
  router.get('/renderStringError', controller.home.renderStringError);
  router.get('/renderError', controller.home.renderError);
  router.get('/render', controller.home.render);
};
