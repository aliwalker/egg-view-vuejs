'use strict';

const mm = require('egg-mock');
const assert = require('assert');

describe('test/view-orvue.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'apps/view-orvue-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mm.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, vue')
      .expect(200);
  });

  it('should GET /renderString', () => {
    return app.httpRequest()
      .get('/renderString')
      .expect('<div data-server-rendered="true">name:egg-view-orvue,desc:egg view plugin for vue</div>')
      .expect(200);
  });

  it('should GET /renderString error', () => {
    return app.httpRequest()
      .get('/renderStringError')
      .expect(500);
  });

  it('should GET /render error', () => {
    return app.httpRequest()
      .get('/renderError')
      .expect(500);
  });

  it('should GET /render', () => {
    return app.httpRequest()
      .get('/render')
      .expect(200)
      .expect(res => {
        assert(res.text.includes('data-server-rendered="true"'));
        assert(res.text.includes('</body></html>'));
        assert(res.text.includes('egg-view-vue#vue server side render!'));
      });
  });
});
