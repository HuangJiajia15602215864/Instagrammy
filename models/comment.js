const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CommentSchema = new Schema({
  image_id: { type: ObjectId },// image_id 记录图片
  email: { type: String },
  name: { type: String },
  gravatar: { type: String },//用 MD5 对电子邮箱加密后得到的字符串，用于访问 Gravatar 服务。Gravatar 提供了跨网站的头像服务，如果你在集成了 Gravatar 服务的网站通过邮箱注册并上传了头像，那么别的网站也可以通过 Gravatar 访问你的头像。
  comment: { type: String },
  timestamp: { type: Date, default: Date.now },
});

CommentSchema.virtual('image')
  .set(function(image) {
    this._image = image;
  })
  .get(function() {
    return this._image;
  });

module.exports = mongoose.model('Comment', CommentSchema);
