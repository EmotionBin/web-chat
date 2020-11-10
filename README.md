# 前端篇

## 前言

一个可进行单人聊天、多人聊天的 web 应用，包括聊天模块(参考微信)，朋友圈模块(参考微信)，视频模块(参考抖音)

本系统分为两个部分：

1. 多人聊天室(本项目)
2. 后台管理系统(这个是打算做的，等我有余力再完成~)

所以在这里的所有篇幅中，默认介绍的是**多人聊天室**项目的设计内容

## 技术栈 

`vue 2.x` +` vue-router` +` vuex` +` vue-cli` + `element-ui` + `axios` + `socket.io`(`socket.io-client`)  

可选：  

1. normalize.css，可用于设置默认 css 样式，[传送门](https://github.com/necolas/normalize.css)
2. nprogress，一个进度条插件，[传送门](https://github.com/rstacruz/nprogress)
3. MD5，md5加密插件，[传送门](https://www.npmjs.com/package/md5)

**备注**  

这里 `socket.io` 为 node 服务端所用的框架，`socket.io-client` 为客户端所用的框架  

## 实现

### 登录

可考虑实现以下功能：  

- 单点登录(只能在一个页面上登录，若在其他地方也进行登录则会挤掉当前登录的用户)
- 第三方登录(如github、微信、qq等)

**关于后端**

防止 SQL 注入，先验证用户名，根据输入用户名查找数据库，如有能找到响应的用户再进行密码比对

### 主题

配置可修改主题颜色的功能，有以下两种模式：  

- 日间模式-浅色调
- 页面模式-深色调

### 获取定位

1. 先获取用户的ip地址
2. 再根据ip地址定位

### 获取天气

根据获取的定位信息查询天气信息，具体可以调用和风天气API[传送门](https://dev.heweather.com/)

### 生成唯一的ID

参考花裤衩 `createUniqueString()`

### 照片删除二次确认

照片删除需要二次确认

### 所有请求数据加密(待确认!!!!!!!!)

请求发送给后端的一些敏感数据，加密传输

### 图片旋转并保存

比如朋友圈编辑功能，图片可旋转并保存图片旋转状态

### 浏览器提示

初次进入时，如果不是使用 Chrome 浏览器则进行提示，建议使用 Chrome 浏览器

### 文本的复制粘贴

对于有需要的地方自动复制文字到剪切板，方便用户操作

### 朋友圈

模仿微信朋友圈

### 视频

模仿抖音

### utils

1. 时间戳格式化
2. 防抖、节流
3. open 方法，创建 a 标签打开新页面(参考 d2-admin)，不用 `window.open()`，因为可能会被拦截
4. **utils中所有自己写的通用方法都需要加上$，以$开头，以便于区分**

### ajax请求

使用axios，并且限制最大并发数，目前暂时定为 5，也就是说最多只能同时发送 5 个 ajax 请求

### 防抖

每一个按钮都尽量使用防抖技术，进行性能优化

### bus

绑定到原型链上，所有事件名全小写，以中划线分割，如 `example-event`

### console.log()

console.log()方法使用简写 log() 替换

### 关于token

1. 服务端给前端的 token 不能是真正意义上的 token，应该是一个 hash 字符串，这个字符串是真正的 token 的一个映射，服务端会存储一个 token 映射集合
2. token 需要自动刷新，对于活跃用户，只要发送请求并且 token 验证通过就刷新 token，延长 token 过期时间，详见我 github 上 demo 的 token 自动刷新
3. 单点登录，只允许在一个地方登录，如果在其他地方又进行了登录则会挤掉当前账号
4. token 过期时间默认为半小时

**对于第3点，由于使用了第三方登录的功能，待定**

### 样式与风格

参考**飞书**、**语雀**等

### 消息类型区分

利用 type 区分消息类型

- type 为 1，即为别人给自己发的消息
- type 为 2，即为我给别人发的消息，
- type 为 3，即为广播消息(XXX加入群聊或者XXX退出群聊)

### 动画

适当增加过渡动画

### 语义化标签

尽量的使用 `ul` `li` `header` `footer` 等语义化标签

### 代码规范

1. 使用 eslint 进行代码规范
2. 定期 code review
3. **不写分号，发现一个分号扣十块钱工资**

### 打印

增加打印功能，直接连接打印机进行打印

### 关于聊天消息的时间显示

1. 如果是今天则显示 hh:mm 如15:24
2. 如果是昨天则显示 昨天 hh:mm 如 昨天 15:24
3. 如果早于昨天则显示 yyyy/mm/dd 如 2020/10/01

### 关于前端权限

1.个别页面有权限要求，进入的时候判断权限，如果没有权限则不让进入，使用 vue-router 的 meta 进行进入页面时的权限判断

### 关于图片

1. 在图片多的情况下尽量对图片进行缓存，提高性能
2. 图片使用 hash 值映射，如 `sdfgsdf` 映射到图片 `test.png` 
3. 对于后端，图片存在 images 文件夹下，每存放一张图片就为它生成一个 hash 值，并做好记录存入数据库中，前端读取图片的时候，只通过一个指定接口，这个接口需要传入图片 hash 值，根据 hash 值查找图片并返回，**所有返回的图片设置强缓存或协商缓存etag**

### 关于css

1. 设置通用 css 类名，如类名 flex-center-row 等价于 flex 行布局水平垂直居中

### 全屏功能

可以让页面全屏，全屏的切换参考 [d2-admin](https://github.com/d2-projects/d2-admin)  

### 命名规则

1. 组件、css 类名命名为全小写+中划线
2. 路由命名尽量别用中划线，使用单词 + / 

### 导入与导出功能

1. 导出功能使用插件[@d2-projects/vue-table-export](https://www.npmjs.com/package/@d2-projects/vue-table-export) ，开发导出 xlsx 功能
2. 导入功能使用插件[@d2-projects/vue-table-import](https://www.npmjs.com/package/@d2-projects/vue-table-import) ，开发导入 xlsx 功能

### vuex

1. module 语法，mapMutation等
2. vuex自动引入，参考 vue-element-admin 或 d2-admin
3. 数据持久化，参考 d2-admin 

