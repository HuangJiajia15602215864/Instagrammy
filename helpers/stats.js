const async = require('async');
const ImageModel = require('../models/image');
const CommentModel = require('../models/comment');

module.exports = function(callback) {
 // async.parallel接口，它接受两个参数：
 // tasks：一个函数数组，每个函数对应一个异步任务（所有任务将并发执行），并且接受一个回调函数用于返回任务执行的结果；
 // callback：整个任务组的回调函数，可以获取所有异步任务执行完成后的所有结果。
  async.parallel(
    [
      // 统计图片总数
      function(next) {
        ImageModel.count({}, next);
      },
       // 统计评论总数
      function(next) {   
        CommentModel.count({}, next);
      },
      // 对图片所有访问量求和
      function(next) {   
        ImageModel.aggregate(
          [
            {
              $group: {
                _id: '1',
                viewsTotal: { $sum: '$views' },
              },
            },
          ],
          function(err, result) {
            if (err) {
              return next(err);
            }
            var viewsTotal = 0;
            if (result.length > 0) {
              viewsTotal += result[0].viewsTotal;
            }
            next(null, viewsTotal);
          },
        );
      },
      // 对所有点赞数求和
      function(next) {
        ImageModel.aggregate(
          [
            {
              $group: {
                _id: '1',
                likesTotal: { $sum: '$likes' },
              },
            },
          ],
          function(err, result) {
            if (err) {
              return next(err);
            }
            var likesTotal = 0;
            if (result.length > 0) {
              likesTotal += result[0].likesTotal;
            }
            next(null, likesTotal);
          },
        );
      },
    ],
    function(err, results) {
      callback(null, {
        images: results[0],
        comments: results[1],
        views: results[2],
        likes: results[3],
      });
    },
  );
};