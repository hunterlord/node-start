### 说明

这是一个前后端共存的基础搭建环境
采用如下包搭建
* [webpack](https://github.com/webpack/webpack)
* [koa2](https://github.com/koajs/koa)
* [browser-sync](https://github.com/BrowserSync/browser-sync)
* [pm2](https://github.com/Unitech/pm2)

#### 简单描述

* 前端热加载
* 后端更新触发前端刷新
* 快速生成生产环境
* 利用pm2集群，deploy，快速便捷

> 注意: 当前还在完善中

#### webpack 

> webpack loader 

* [art-template-loader](https://github.com/aui/art-template-loader)
* [postcss-loader](https://github.com/postcss/postcss-loader)
* [sass-loader](https://github.com/webpack-contrib/sass-loader)
* [style-loader](https://github.com/webpack-contrib/style-loader)
* [css-loader](https://github.com/webpack-contrib/css-loader)
* [babel-loader](https://github.com/babel/babel-loader)

### 安装

```shell
git clone https://github.com/hunterlord/node-start.git
cd node-start
npm i
```

### 开发

```shell
npm run start
```

#### 前端

> default webpack-dev-server set 'https:true'
> open https://localhost:8080

#### 后端

> open http://localhost:3000

#### 前后端同时开发 

```shell
npm run start-sync
```

> 执行以上命令会自动打开 https://localhost:3001
> 控制台 https://localhost:3002
> 如果修改webpack-dev-server 默认端口，则需要同时修改bs-config.js 中的proxy地址端口
