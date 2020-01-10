// 获取评论以及到每个评论对应的图片
const async = require('async');
const ImageModel = require('../models/image');
const CommentModel = require('../models/comment');

module.exports = {
    newest: function (callback) {
        CommentModel.find({}, {}, {
            limit: 5,
            sort: {
                timestamp: -1
            }
        }, function (
            err,
            comments,
        ) {
            if (err) return callback(err);
            var attachImage = function (comment, next) {
                ImageModel.findOne({
                    _id: comment.image_id
                }, function (err, image) {
                    if (err) throw err;
                    comment.image = image;
                    next(err);
                });
            };

            // 用 async.each 函数对一个数组中所有对象进行异步操作,三个参数：
            //collection：用于接收异步操作的集合，这里是评论集；
            //iteratee：异步操作函数，这里是 attachImage 函数；
            //callback：全部操作执行完成的回调函数。
            async.each(comments, attachImage, function (err) {
                if (err) throw err;
                callback(err, comments);
            });
        });
    },
};