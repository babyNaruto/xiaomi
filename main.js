console.log("加载成功");
/*
    配置当前项目使用那些模块
    遵从AMD规范
    所有的js文件后缀可以省略
 */
require.config({
    paths: { //paths记录自己遇到的坑，许久才发现这个错误--naruto 2021/8/12
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "nav": "nav",
        "slide": "slide",
        "data": "data"
    },
    shim:{
        //设置依赖关系
        "jquery-cookie": ["jquery"]
    }
})

require(["nav","slide","data"],function (nav,slide,data){
    nav.download();
    nav.banner();
    nav.leftNavTab();
    nav.topNavTab();
    nav.searchTab();

    //商品列表加载
    slide.download();
    slide.slideTab();

    //主页加载
    data.download();
    data.tabMenu();

})