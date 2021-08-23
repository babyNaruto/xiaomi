//引入当前页面需要加载的模块
require.config({
    paths:{
        "jquery": "jquery-1.11.3",
        //引入首页导航的部分代码
        "nav": "nav",
        "goodsList": "goodsList"
    }
})
require(["nav","goodsList"], function (nav,goodsList){
    nav.topNavDownload();
    nav.leftNavDownload();
    nav.leftNavTab();
    nav.topNavTab();
    nav.searchTab();
    nav.allGoodsTab();

    //加载商品数据
    goodsList.download();
    goodsList.banner();



})