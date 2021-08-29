define(["jquery","jquery-cookie"],function ($){
    //加载已经加入购物车的商品
    //数据源=goodsCarList.json goodsList.json,找出加入购物车的数据
    //通过异步串行处理
    function loadCarData(){
        new Promise(function (resolve,reject){
            $.ajax({
                url: "../data/goodsCarList.json",
                success: function (obj){
                    resolve(obj.data);
                },
                error: function (msg){
                    reject(msg);
                }
            })
        }).then(function (arr1){  //其实就是上面的resolve
            // console.log(arr1);
            //下载第二部分代码
            return new Promise(function (resolve,reject){
                $.ajax({
                    url: "../data/goodsList2.json",
                    success: function (arr2){
                        //将两份数据合并
                        var newArr = arr1.concat(arr2);
                        resolve(newArr);

                    },
                    error: function (msg){
                        console.log(msg);
                    }
                })
            }).then(function (arr){
                console.log(arr);
                //arr所有商品信息
                //在页面上加载购物车的数据
                //通过已经加入的购物车的数据 ，找出商品详细数据
                //1.在购物车拿到所有数据
                var cookieStr = $.cookie("goods");
                if (cookieStr){
                    var cookieArr = JSON.parse(cookieStr);
                    var newArr = [];

                    for (var i = 0; i < cookieArr.length; i++) {
                        for (var j = 0; j < arr.length; j++) {
                            if (cookieArr[i].id == arr[j].product_id || cookieArr[i].id == arr[j].goodsid){
                                arr[j].num = cookieArr[i].num;
                                //统一ID
                                arr[j].id = arr[j].product_id ? arr[j].product_id :arr[j].goods_id;
                                newArr.push(arr[j]);

                            }
                        }
                    }
                    // console.log(newArr);
                    //newArr存储购物车商品信息
                    //通过循环将拿到的数据添加到页面上

                    for (var i = 0; i < newArr.length; i++) {
                        var node = $(`<div class="item-row clearfix" id="${newArr[i].id}"> 
                                                    <div class="col col-check">  
                                                        <i class="iconfont icon-checkbox icon-checkbox-selected J_itemCheckbox" data-itemid="2192300031_0_buy" data-status="1">√</i>  
                                                    </div> 
                                                    <div class="col col-img">  
                                                        <a href="//item.mi.com/${newArr[i].id}.html" target="_blank"> 
                                                            <img alt="" src="${newArr[i].image}" width="80" height="80"> 
                                                        </a>  
                                                    </div> 
                                                    <div class="col col-name">  
                                                        <div class="tags">   
                                                        </div>     
                                                        <div class="tags">  
                                                        </div>   
                                                        <h3 class="name">  
                                                            <a href="//item.mi.com/${newArr[i].id}" target="_blank"> 
                                                               ${newArr[i].name}
                                                            </a>  
                                                        </h3>        
                                                    </div> 
                                                    <div class="col col-price"> 
                                                        ${newArr[i].price}元 
                                                        <p class="pre-info">  </p> 
                                                    </div> 
                                                    <div class="col col-num">  
                                                        <div class="change-goods-num clearfix J_changeGoodsNum"> 
                                                            <a href="javascript:void(0)" class="J_minus">
                                                                <i class="iconfont"></i>
                                                            </a> 
                                                            <input tyep="text" name="2192300031_0_buy" value="${newArr[i].num}" data-num="1" data-buylimit="20" autocomplete="off" class="goods-num J_goodsNum" "=""> 
                                                            <a href="javascript:void(0)" class="J_plus"><i class="iconfont"></i></a>   
                                                        </div>  
                                                    </div> 
                                                    <div class="col col-total"> 
                                                        ${(newArr[i].price * newArr[i].num).toFixed(1)}元 
                                                        <p class="pre-info">  </p> 
                                                    </div> 
                                                    <div class="col col-action"> 
                                                        <a id="2192300031_0_buy" data-msg="确定删除吗？" href="javascript:void(0);" title="删除" class="del J_delGoods"><i class="iconfont"></i></a> 
                                                    </div> 
                                                </div> `);
                        node.appendTo("#J_cartListBody .J_cartGoods")
                    }
                    isCheckAll();

                }
            })


        })
    }

    function download(){
        $.ajax({
            url: "../data/goodsCarList.json",
            success: function (obj){
                var arr = obj.data;
                for (var i = 0; i < arr.length; i++) {
                    $(`<li class="J_xm-recommend-list span4">    
                                    <dl> 
                                        <dt> 
                                            <a href="#"> 
                                                <img src="${arr[i].image}" srcset="//i1.mifile.cn/a1/pms_1551867177.2478190!280x280.jpg  2x" alt="小米净水器1A（厨下式）"> 
                                            </a> 
                                        </dt> 
                                        <dd class="xm-recommend-name"> 
                                            <a href="#"> 
                                                ${arr[i].name}
                                            </a> 
                                        </dd> 
                                        <dd class="xm-recommend-price">${arr[i].price}</dd> 
                                        <dd class="xm-recommend-tips">   ${arr[i].comments}好评    
                                            <a href="#" class="btn btn-small btn-line-primary" style="display: none;"  id="${arr[i].goodsid}">加入购物车</a>  
                                        </dd> 
                                        <dd class="xm-recommend-notice">

                                        </dd> 
                                    </dl>  
                                </li>`).appendTo("#J_miRecommendBox .xm-recommend ul");
                }
            },
            error: function (msg){
                console.log(msg);
            }
        })

    }

    function cartHover(){
        //事件委托添加
        $("#J_miRecommendBox .xm-recommend ul").on("mouseenter",".J_xm-recommend-list",function (){
            $(this).find(".xm-recommend-tips a").css("display",'block');
        })

        $("#J_miRecommendBox .xm-recommend ul").on("mouseleave",".J_xm-recommend-list",function (){
            $(this).find(".xm-recommend-tips a").css("display",'none');
        })


        //通过事件委托实现加入购物车操作
        $("#J_miRecommendBox .xm-recommend ul").on("click",".xm-recommend-tips .btn",function (){
            var id = this.id;

            var first = $.cookie("goods") == null ? true : false;

            //第一次添加，购物车为空，创建cookie
            if (first){
                var cookieArr = [{id:id, num: 1}];
                $.cookie("goods",JSON.stringify(cookieArr),{
                    expires: 7
                })
            }else{
                var same = false;
                var cookieStr = $.cookie("goods");
                var cookieArr = JSON.parse(cookieStr);
                for (var i = 0; i < cookieArr.length; i++) {
                    if(cookieArr[i].id == id){
                        cookieArr[i].num++;
                        same =true;
                        break;
                    }
                }
                if (!same){
                    var obj = {id: id, num: 1};
                    cookieArr.push(obj);
                }
                $.cookie("goods",JSON.stringify(cookieArr),{
                    expires: 7
                })
            }

            // alert($.cookie("goods"));
            isCheckAll();
            return false;
        })


    }

    //给全选按钮单选添加点击事件
    function checkFun(){
        //全选效果实现
        $("#J_cartBox .list-head .col-check").find("i").click(function (){
            //获取每一个单选框
            var allChecks = $("#J_cartListBody").find(".item-row .col-check").find("i");

            if ($(this).hasClass("icon-checkbox-selected")){
                $(this).add(allChecks).removeClass("icon-checkbox-selected");
            }else{
                $(this).add(allChecks).addClass("icon-checkbox-selected");
            }
            isCheckAll();
        })

        //商品单选框实现
        $("#J_cartListBody .J_cartGoods").on("click",".item-row .col-check i",function (){
            if ($(this).hasClass("icon-checkbox-selected")){
                $(this).removeClass("icon-checkbox-selected");
            }else{
                $(this).addClass("icon-checkbox-selected");
            }
            isCheckAll();
        })
    }

    //判断有多少个被选中
    function isCheckAll(){
        var allChecks = $("#J_cartListBody").find(".item-row");
        var isAll = true; //假设全部选择
        var total = 0;  //计算总价
        var count = 0;  //记录被选中的数量
        var totalCount = 0;  //全部商品总数
        allChecks.each(function (index,item){
            if (!$(item).find(".col-check i").hasClass("icon-checkbox-selected")){
                isAll = false;  //变成非全选状态
            }else{
                total += parseFloat($(item).find(".col-price").html().trim()) * parseFloat($(this).find(".col-num input").val());
                count += parseInt($(item).find(".col-num input").val());

            }
            totalCount += parseInt($(item).find(".col-num input").val());
        });
        //设置结果到页面上
        $("#J_selTotalNum").html(count);
        $("#J_cartTotalNum").html(totalCount);
        $("#J_cartTotalPrice").html(total);

        //判断是否全选，全部单选后，自动勾选全选
        if(isAll){
            $("#J_cartBox .list-head .col-check").find("i").addClass("icon-checkbox-selected");
        }else{
            $("#J_cartBox .list-head .col-check").find("i").removeClass("icon-checkbox-selected");
        }

    }

    return {
        download: download,
        cartHover: cartHover,
        loadCarData: loadCarData,
        checkFun: checkFun

    }
})