const express = require("express");
// 文件上传
const formidable = require("formidable");
const path = require("path");

// 获取路由对象
const router = express.Router();
const model = require("./module");
const tokenUtil = require("./token");

// 设置允许跨域请求
router.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    // 设置完请求头后，交给后续的中间件进行处理
    next()
});

// 3.1 编写get方法，地址为/getHeroList的接口
router.get('/getHeroList', (req, res) => {
    tokenUtil.checkRole(req, res);
    // 3.2 通过数据库查询数据
    model.getHeroList((err, data) => {
        if (err) {
            // 3.3 如果查询错误，返回客户端错误信息
            return res.json({ code: -1, msg: err })
        } else {
            // 3.4 把英雄数据返回到客户端
            return res.json({ code: 200, data })
        }
    })
})

// 删除英雄
router.get("/delHeroById", (req, res) => {
    tokenUtil.checkRole(req, res);
    // 获取英雄id {id:1}
    const { id } = req.query;
    model.delHeroById(id, (err, data) => {
        if (err) {
            res.json({ code: -1, msg: "删除失败" })
        } else {
            res.json({ code: 200, msg: '删除成功' });
        }
    })
});

// 添加英雄
router.post("/addHero", (req, res) => {
    const { name, gender, img } = req.body;
    model.addHero(name, gender, img, (err, data) => {
        if (err) {
            res.json({ code: -1, msg: "添加失败" })
        } else {
            res.json({ code: 200, msg: '添加成功' });
        }
    });
});

// 图片上传
router.post("/uploadFile", (req, res) => {
    // console.log(req.body);//{}
    const form = formidable({
        // 设置图片路径
        uploadDir: path.join(__dirname, "../upload"),
        keepExtensions: true //保存图片的后缀
    });
    form.parse(req, (err, fields, files) => {
        // 读取上传图片的路径
        const filePath = files.avatar.path;
        // 截取文件名
        const fileName = path.basename(filePath);
        res.json({ code: 0, src: fileName });
    });
});

// 通过id获取英雄信息
router.get("/getHeroById", (req, res) => {
    const { id } = req.query;
    model.getHeroById(id, (err, data) => {
        if (err) {
            res.json({ code: -1, msg: err })
        } else {
            res.json({ code: 200, data: data[0] });
        }
    });
});

// 修改英雄
router.post("/updateHero", (req, res) => {
    const { id, name, gender, img } = req.body;
    model.updateHero(id, name, gender, img, (err, data) => {
        if (err) {
            res.json({ code: -1, msg: "修改失败" })
        } else {
            res.json({ code: 200, msg: '修改成功' });
        }
    });
});

// 注册
router.post('/register', (req, res) => {
    model.register(req.body, (err, data) => {
        if (err) {
            res.json({ code: -1, msg: err })
        } else {
            res.json({ code: 200, data })
        }
    })
});

// 登录
router.post("/login", (req, res) => {
    model.login(req.body, (err, result) => {
        if (err) {
            res.json({ code: -1, msg: err })
        } else if (result.length == 0) {
            res.json({ code: -1, msg: "用户不存在或者密码错误" })
        } else {
            //   创建token
            const myToken = tokenUtil.createToken(req.body.username)
            res.json({ code: 200, msg: '登录成功', token: myToken })
        }
    })
})



// 导出模块
module.exports = router;