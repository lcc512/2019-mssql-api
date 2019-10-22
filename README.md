# Marketing CSMS（后台服务）
> 仿电费计费业扩系统的部分功能模块的全栈实现
>
> 2019年10月开发实现



## 技术应用

- express 组件路由实现
- express 组件通信实现
- mysql 数据库



## 开发，打包

```shell
nodemon add.js
```



## Git

```
git status
git add .
git commit -m 'describtion'
git clone https://github.com/lcc512/2019-mssql-api.git
```

## 文件目录

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

