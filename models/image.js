const mongoose = require('mongoose');
const path = require('path');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({// 数据对象的模式
  title: { type: String },
  description: { type: String },
  filename: { type: String },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
});

// 虚字段uniqueId,不会保存到数据库，在每次查询时临时计算，通常用于对普通字段进行格式调整或组合。
ImageSchema.virtual('uniqueId').get(function() {
  return this.filename.replace(path.extname(this.filename), '');
});

// 编译为名为 Image 的模型并导出
module.exports = mongoose.model('Image', ImageSchema);