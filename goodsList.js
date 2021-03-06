define(["jquery"],function ($) {
    //数据下载
    function download(){
        $.ajax({
            type: "get",
            url: "../data/goodsList2.json",
            success: function (arr){
                // alert(arr);
                //加载大图数据到页面上
                $(`<div data-v-61428f58 class = 'section'>
                    <div data-v-61428f58 class = 'components-list-box'>
                        <div data-v-a2d6c756 class="channel-product-imgText">
                            <div data-v-a2d6c756 class = 'channel-product-top'>
                                <div data-v-a2d6c756 class = 'product-cell shadow product_with_tag product_tag_1'>
                                    <div data-v-a2d6c756 class = 'figure'>
                                        <a href="goodsDesc.html?product_id=${arr[0].product_id}">
                                            <img data-v-a2d6c756 style = 'background-color: rgb(178, 184, 205);' src="${arr[0].image}" alt=""/>
                                        </a>
                                    </div>
                                    <div data-v-a2d6c756 class = 'content'>
                                        <h3 data-v-a2d6c756 class = 'title'>
                                            <a data-v-a2d6c756 href="goodsDesc.html?product_id=${arr[0].product_id}">
                                                ${arr[0].name}
                                            </a>
                                        </h3>
                                        <p data-v-a2d6c756 class = 'desc'> ${arr[0].desc}</p>
                                        <p data-v-a2d6c756 class = 'price'>
                                            <strong data-v-a2d6c756>${arr[0].price}</strong>元
                                            <span data-v-a2d6c756>起</span>
                                            <del data-v-a2d6c756>${arr[0].del}</del>
                                        </p>
                                        <p data-v-a2d6c756 class = 'link'>
                                            <a data-v-a2d6c756 href="#">立即购买</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`).appendTo(".app-body");

                //=====小图商品============
                for (var i = 1; i < arr.length; i++) {
                    //每2个商品创建一行
                    if (i % 2 != 0){
                       var row = $(`<div data-v-61428f58 class = 'section'>
                    <div data-v-61428f58 class = 'components-list-box'>
                        <div data-v-45ef62b1 class = 'channel-product channel-product-two4'>
                            <div data-v-45ef62b1 class = 'row'>
                   
                            </div>
                        </div>
                    </div>
                </div>`);
                       row.appendTo(".app-body");
                    }
                    //开始创建每一个小商品
                    $(`<div data-v-45ef62b1 class = 'span10 product-cell shadow'>
                                    <div data-v-45ef62b1 class = 'figure'>
                                        <a data-v-45ef62b1 href="goodsDesc.html?product_id=${arr[i].product_id}" class = 'exposure'>
                                            <img data-v-45ef62b1 style = 'background-color: rgb(189, 193, 217);' src="${arr[i].image}" alt=""/>
                                        </a>
                                    </div>
                                    <h3 data-v-45ef62b1 class = 'title'>
                                        <a data-v-45ef62b1 href="${arr[i].product_id}">${arr[i].name}</a>
                                    </h3>
                                    <p data-v-45ef62b1 class = 'desc'>${arr[i].desc} </p>
                                    <p data-v-45ef62b1 class = 'price'>
                                        <strong data-v-45ef62b1>${arr[i].price}</strong>元
                                        <span data-v-45ef62b1>起</span>
                                        <del data-v-45ef62b1>${arr[i].price}del</del>
                                    </p>
                                </div>`).appendTo(row.find(".row"));
                }
            },
            error: function (msg){
                console.log(msg);
            }
        })
    }
    //实现商品列表页的轮播图效果
    function banner() {
        //获取页面上所有的图
        var oDiv = $(".swiper-container  .swiper-wrapper");
        //获取页面上所有的按钮
        var aBtns = $(".swiper-container  .swiper-pagination a");
        //设置当前图片的下标
        var iNow = 0;
        var time = null;

        //给页面按钮添加点击
        aBtns.click(function (){
            iNow = $(this).index();
            tab();
            return false;  //阻止a链接默认行为

        })

        //定时器
        let timer = setInterval(function () {
            iNow++;
            tab();
        }, 2000);
        //切换函数
        function tab() {
            aBtns.removeClass("swiper-pagination-bullet-active").eq(iNow).addClass("swiper-pagination-bullet-active");
            if(iNow == aBtns.size()){
                aBtns.eq(0).addClass("swiper-pagination-bullet-active")
            }
            oDiv.animate({left: -2560 * iNow},1000,function () {
                //最后一张图片结束时
                if (iNow == aBtns.size()){
                    iNow = 0;
                    oDiv.css("left",0);
                }
            });
        }

        //给整个轮播图添加移入移出
        $(".swiper-container").mouseenter(function (){
            clearInterval(timer);
        });
        $(".swiper-container").mouseleave(function (){
            timer = setInterval(function () {
                iNow++;
                tab();
            }, 2000);
        });


    }
    return {
        download: download,
        banner: banner
    }
})