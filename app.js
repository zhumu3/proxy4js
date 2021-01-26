var express = require('express');
var url = require('./URL.js');
var proxy = require('http-proxy-middleware');
var app = express();
app.all('*', function (req, res, next) {//必须卸载app.get前面才有效
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    if (req.method == "OPTIONS") {
        res.send(200);
        /*让options请求快速返回*/
    } else {
        next();
    }
});

app.use('/', proxy({
    // 代理跨域目标接口
    target: url.link,
    changeOrigin: true,

    // 修改响应头信息，实现跨域并允许带cookie
    onProxyRes: function(proxyRes, req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Credentials', 'true');
    },
    // 修改响应信息中的cookie域名
//  cookieDomainRewrite: ''  // 可以为false，表示不修改
}));

app.listen('8021');//你的端口