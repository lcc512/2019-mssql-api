#Marketing CSMS（前台界面，后台服务）
> 仿电费计费业扩系统的部分功能模块的全栈实现
>
> 2019年10月开发实现



## 技术应用

### 前台界面

- vue-cli 脚手架搭建
- element-ui 样式框架
- vue-router 路由导航
- vue-print-nb 打印

### 后台服务

- express 组件路由实现
- express 组件通信实现
- mysql 数据库



##开发，打包

```shell
npm run dev
npm run build

nodemon add.js
```



##Git

```
git status
git add .
git commit -m 'describtion'
git clone https://github.com/lcc512/my201910test.git

git status
git add .
git commit -m 'describtion'
git clone https://github.com/lcc512/2019-mssql-api.git
```



## 文件目录

### 前台

```shell
|-- App.vue #vue入口
|-- assets
|   `-- logo.png
|-- components
|   |-- Business
|   |   |-- AsideCommon.vue #通用侧边栏
|   |   |-- Charge.vue #算费主vue
|   |   |-- Charges #算费页面相关
|   |   |   |-- ChargeAudit.vue
|   |   |   |-- ChargeAuditList.vue
|   |   |   |-- ChargeCalcu.vue
|   |   |   |-- ChargeCheck.vue
|   |   |   |-- ChargeCheckList.vue
|   |   |   |-- ChargeEnter.vue
|   |   |   |-- ChargeEnterList.vue
|   |   |   `-- ChargeReady.vue
|   |   |-- Information.vue #档案编辑主vue
|   |   `-- Informations #档案编辑页面相关
|   |       |-- InforEdit.vue
|   |       |-- InforEditApply.vue
|   |       |-- InforEditMain.vue
|   |       |-- InforNew.vue
|   |       `-- InfotEditList.vue
|   |-- HelloWorld.vue
|   |-- Home.vue
|   |-- Login.vue
|   |-- NotFound.vue
|   |-- Register.vue
|   `-- commonCompon
|-- main.js #程序主入口
`-- router
    `-- index.js #vue路由配置
```

### 后台

```
|-- README.md
|-- app.js #主入口文件
|-- config.js
|-- controllers #控制器文件
|   |-- charges.js #费用相关
|   |-- comment.js
|   |-- inforEdit.js
|   |-- session.js
|   |-- topic.js
|   |-- user.js #档案信息相关
|   `-- workFlow.js #流程相关
|-- models
|   |-- db.js #数据库连接配置
|   |-- testDb.js
|   `-- utils.js #工具
|-- package-lock.json
|-- package.json
|-- router.js #访问路由配置
|-- tbdlzs.sql #数据库导入文件
`-- routers
```

