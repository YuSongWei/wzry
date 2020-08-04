const express = require('express');
const app = express();
const port = 3001;
// 引入路由
const router = require("./router");
// 引入中间件
const bodyParser = require("body-parser");

// 设置静态文件
app.use(express.static("../public"));
app.use(express.static("../upload"))
// 配置中间件,处理参数
app.use(bodyParser.urlencoded());

app.use(router);

app.listen(port, () => console.log("服务器启动成功"));