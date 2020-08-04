// 引入服务器模块
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: '127.0.0.1',  // 数据库服务器的地址
    user: 'root',         // 数据库的账号 
    password: 'a1314520',         // 数据库的密码
    database: 'wzry'     // 数据库名称
});
// 连接数据库或打开数据库
connection.connect();

// 获取英雄列表
const getHeroList = (callback) => {
    connection.query("select * from heros", (err, data) => {
        callback(err, data)
    });
};

// 删除英雄
const delHeroById = (id, callback) => {
    connection.query("delete  from heros where id=?", [id], callback);
};

// 添加英雄
const addHero = (name, gender, img, callback) => {
    connection.query("insert into heros (name,gender,img) values (?,?,?)", [name, gender, img], callback);
};

// 通过id获取英雄信息
const getHeroById = (id, callback) => {
    connection.query("select * from heros where id=?", [id], callback);
};

// 更新英雄
const updateHero = (id, name, gender, img, callback) => {
    connection.query("update heros set name=?,gender=?,img=? where id=?", [name, gender, img, id], callback);
};




// 注册
const register = (data, callback) => {
    const { username, password } = data;
    connection.query('insert into user (username,password) values (?,?);', [username, password], callback)
};

// 登录
// 用户登录
const login = function (data, callback) {
    // 查找数据库，是否有匹配的用户
    const { username, password } = data;
    connection.query('select * from user where username=? and password=?', [username, password], callback)
}

// 导出模块
module.exports = {
    register,
    getHeroList,
    delHeroById,
    addHero,
    getHeroById,
    updateHero,
    login

}