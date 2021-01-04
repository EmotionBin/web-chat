# web-chat

[中文版](./README.md) [English](./zh_en.md)

[web-chat](https://www.huangweibinupup.cn:8888) it's a web chat room，implementation of front end based on [vue](https://github.com/vuejs/vue) and [element-ui](https://github.com/ElemeFE/element)，the back end is implemented by [Koa](https://koa.bootcss.com) and [mysql](https://www.mysql.com)  

- [preview](https://www.huangweibinupup.cn:8888)

PS: the server will expire on April 17 2021，if it cannot be accessed，the server will expire  

## Feature

- [x] registration and login
- [x] wechat login
- [x] single login
- [x] automatic refresh token of active user
- [x] group chat and single chat
- [x] check chat history
- [x] send pictures
- [x] picture preview
- [x] city，temperature and weather info of client
- [x] current online user list
- [x] address book
- [x] check user info
- [x] search user

## Skill

**front end**  

- vue@2.6.11
- vue-router@3.2.0
- vuex@3.4.0
- element-ui@2.14.1
- axios@0.21.0
- dayjs@1.9.6
- md5@2.3.0
- nprogress@0.2.0
- socket.io-client@3.0.4

**back end**  

- koa@2.13.0
- axios@0.21.0
- image-size@0.9.3
- jsonwebtoken@8.5.1
- socket.io@3.0.4

## Start

you need to install a higher version of [node](http://nodejs.cn) and npm environment  

```bash
# clone project
git clone https://github.com/EmotionBin/web-chat.git

# enter project directory
cd web-chat

# installation dependency
npm install

# you can also use Taobao image cnpm for dependent installation，but you need to change the source
cnpm install

# run project
npm run serve
```

after the project run，open the browser to access it  

## Contact Me

my email 313200064@qq.com  

you can email me

if you think it will help you， you can buy me a cup of coffee

![payme](https://github.com/EmotionBin/web-chat/blob/main/src/assets/dialog/pay.png)  

## License

[MIT](http://opensource.org/licenses/MIT)  

MIT License  

Copyright (c) 2021 EmotionBin  
