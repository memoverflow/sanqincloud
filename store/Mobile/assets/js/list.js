/**
 * AMD配置默认加载组件,加载顺序
 * 加载主模块,初始化主页面的相关内容
 */
require.config({
    baseUrl: "assets/js",
    paths : {
        "data": "app/data"
    },
    waitSeconds: 8
});
/*
 默认加载主模块
 */
define(["common","data"],function(common,data){
    "use strict"

    var list = {
        currentIndex:1,

        init:function(){
            common.renderParts()
                .done(function () {
                    $(document).ready(function () {
                        common.loading(true);
                        common.helper();
                        common.getBanners(1,3);
                        common.getLinks(1,8);
                        common.getList(list.currentIndex,8,"");
                        common.init();
                        list.trigger();
                    }
                });

        },
        trigger:function(){
            $(".am-store-more").on("click",function(){
                common.getList(++list.currentIndex,8,"");
            });
        }
    }
    list.init();
});