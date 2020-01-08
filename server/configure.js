const path = require('path');
// 用于渲染用户界面的模板引擎
const exphbs = require('express-handlebars');
const express = require('express');
// 用于解析客户端请求的中间件，包括 HTML 表单和 JSON 请求
const bodyParser = require('body-parser');
// 用于收发 cookie
const cookieParser = require('cookie-parser');
// 用于记录日志的中间件，对于开发调试和生产监控都很有用
const morgan = require('morgan');
// 为老的浏览器提供 REST 请求的兼容性支持
const methodOverride = require('method-override');
// 用于在发生错误时打印调用栈，仅在开发时使用
const errorHandler = require('errorhandler');

const routes = require('./routes');

module.exports = function(app) {
  app.engine('handlebars', exphbs());
  app.set('view engine', 'handlebars');
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser('secret-value'));
  // express 自带的静态资源中间件,用于向客户端发送图片、CSS 等静态文件
  app.use('/public/', express.static(path.join(__dirname, '../public')));

  if (app.get('env') === 'development') {
    app.use(errorHandler());
  }
  routes(app);
  return app;
};