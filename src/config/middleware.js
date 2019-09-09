const isDev = think.env === 'development';
const path = require('path');
const jwt = require('koa-jwt');

module.exports = [
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: isDev
    }
  },
  {
    handle: 'resource',
    enable: isDev,
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: /^\/(public|favicon\.ico)/
    }
  },
  {
    handle: jwt,
    match(ctx) {
      return !/^\/user\/login/.test(ctx.path);
    },
    options: {
      secret: think.config('jwt')['secret'],
      cookie: think.config('jwt')['cookie'],
      passthrough: false
    }
  },
  {
    handle: 'payload',
    options: {
      keepExtensions: true,
      limit: '5mb'
    }
  },
  {
    handle: 'router',
    options: {}
  },
  'logic',
  'controller'
];
