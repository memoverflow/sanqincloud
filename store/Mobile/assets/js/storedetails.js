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

    var store = {
        currentIndex:1,
        init:function(){
            common.renderParts()
                .done(function () {
                    $(document).ready(function () {
                        common.loading(true);
                        common.helper();
                        common.getLinks(1,8);
                        common.getBanners(1,3);
                        common.getStoreDetails();
                        common.init();
                    });
                });

        }
    };
    store.init();
});