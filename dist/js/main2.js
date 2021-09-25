console.log("main2.js加载成功");
/*
    配置模块引入
 */
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "register": "register"
    }
})
require(['register'], function (register){
    register.registerSend();
})