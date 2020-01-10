# Instagrammy
基于Express + MongoDB 搭建图片分享社区

# 目录结构
--controllers       控制器，定义接口逻辑
     ——home.js      首页
     ——image.js     图片详情页
--helpers           侧边栏数据统计
     ——stats        统计数据，利用async.parallel实现异步任务并发执行
     ——images       最受欢迎图片，根据点赞数展示前九个图片
     ——comments     最新评论，通过数据库操作，获取最新评论前五个，利用async.each 函数对获取到的评论去异步获取对应的图片
     ——sidebar      侧边栏数据汇总，利用async.parallel并发获取三个模块的数据
--models            图片&评论数据结构模型，Schema，model
     ——image
     ——comment
--node_modules      项目依赖
--public            静态资源文件夹
     --upload
          --temp    上传到服务器的暂存图片，当图片上传成功后，则删除
--server             
     ——routes       路由模块，建立路由列表
     ——configure    导入项目运用到的各种中间件，从而实现简化入口文件server.js
--views             静态页面，利用handlebars渲染引擎
     --layouts      
          ——main    页面模板
     --partials     侧边框
          ——stats    
          ——images
          ——comments
     ——image         图片页面
     ——index         首页
--package.json
--package-lock.json
--README.md          项目须知
--server.js          入口文件（连接数据库并启动服务）