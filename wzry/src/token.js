// 生成token
const createToken = function (username) {
    // 密钥，用来验证真伪
    const key = 'wzry'
    const data = username + '_' + key;
    // 生成base64字符串
    const token = Buffer.from(data).toString('base64')
    return token;
};

// 验证token是否有效
const verifyToken = function (token) {
    const context = Buffer.from(token, 'base64').toString('ascii')
    return context.indexOf('wzry') > -1
};

// 验证权限的方法
const checkRole = (req, res) => {
    // 获取请求头token，验证token是否有效
    const token = req.headers.authorization;
    if (token) {
        const isVerify = verifyToken(token);
        if (!isVerify) {
            return res.json({ code: -1, msg: '你没有访问权限' })
        }
    } else {
        return res.json({ code: -1, msg: '请带上你的token' })
    }

}

module.exports = {
    createToken,
    verifyToken,
    checkRole
}