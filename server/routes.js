// 路由模块，建立从 URL 到控制器之间的映射
const express = require('express');
//  multer 中间件用于处理文件上传
const multer = require('multer');
const path = require('path');
const router = express.Router();
// dest 选项指定保存上传文件的路径，创建一个 temp 目录用于临时保存上传到的图片
const upload = multer({ dest: path.join(__dirname, 'public/upload/temp') });
const home = require('../controllers/home');
const image = require('../controllers/image');

module.exports = function(app) {
  router.get('/', home.index);
  router.get('/images/:image_id', image.index);
  // 将中间件添加到 image.create 控制器前，确保先处理用户上传的文件。single表示只处理单个上传文件，字段名为 file，在后续中间件中就可以通过 req.file 进行获取。
  router.post('/images', upload.single('file'), image.create);
  router.post('/images/:image_id/like', image.like);
  router.post('/images/:image_id/comment', image.comment);
  router.delete('/images/:image_id', image.remove);
  app.use(router);
};