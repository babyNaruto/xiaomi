console.log("main3.js加载成功");
/*
    配置模块引入
 */
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "login": "login"
    }
})
require(['login'], function (login){
    login.loginSend();
})