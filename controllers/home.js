const sidebar = require('../helpers/sidebar');
const ImageModel = require('../models/image');
// 主页
module.exports = {
    index: function(req, res) {
      // find 方法查询图片,find 是查询多条数据记录的通用方法,四个参数如下：
      // filter：过滤器，是一个 JavaScript 对象，用 {} 表示查询所有记录；
      // projection（可选）：查询所返回的字段，可以是对象或字符串，我们用 {} 表示返回所有字段；
      // options（可选）：查询操作的选项，用 sort 选项对返回结果进行排序（按照发布时间 timestamp 进行倒序排列，即把最新发布的放在最前面）；
      // callback：回调函数，用于添加在查询完毕时的业务逻辑。
      const viewModel = {images: []};
      ImageModel.find({}, {}, { sort: { timestamp: -1 } }, function(err, images) {
        if (err) throw err;
        viewModel.images = images;
        sidebar(viewModel, function(viewModel) {
          res.render('index', viewModel);
        });
      });
      
    },
  };
  