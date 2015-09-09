require.config({
    baseUrl: "assets/js",
    shim:{
        "hbs":["jquery"]
    },
    paths : {
        "jquery" : 'libs/jquery.min',
        "hbs" : "libs/handlebars.min",
        "data":"app/data"
    },
    waitSeconds: 10
});
/*
 人员管理主模块
 */
define(["jquery","hbs","common","data"],function($,Handlebars,common,data){
    "use strict"

    common.helper(function(){
        //注册产品状态
        Handlebars.registerHelper('status', function(status) {
            var result = '';
            switch (status)
            {
                case 0:
                    result = "开通";
                    break;
                case 1:
                    result = "启用";
                    break;
                case 2:
                    result = "禁用";
                    break;

            }
            return new Handlebars.SafeString(result);
        });
        //注册产品同步状态
        Handlebars.registerHelper('sync', function(sync) {
            var result = '';
            switch (sync)
            {
                case 0:
                    result = "待同步";
                    break;
                case 1:
                    result = "同步成功";
                    break;
                case 2:
                    result = "同步失败";
                    break;
            }
            return new Handlebars.SafeString(result);
        });
        //注册产品同步状态
        Handlebars.registerHelper('link', function(link) {
            var result = "<a href="+link+" target='_blank'>"+link+"</a>";

            return new Handlebars.SafeString(result);
        });
    },function(){
        common.params.ProductName = $(".am-modal-prompt-input").val();
    });
    common.promise = "data.myproducts.info.action(common.currentIndex,common.pageSize,common.params)";
    common.array = [
        {
            flag:data.myproducts.status.flagEnabel,
            id:"ProductID",
            callback:function(flag,productId){
                return data.myproducts.status.action(flag,[{ECProductID:productId}]);
            },
            msg:"启用"
        },
        {
            flag:data.myproducts.status.flagForbidden,
            id:"ProductID",
            callback:function(flag,productId){
                return data.myproducts.status.action(flag,[{ECProductID:productId}]);
            },
            msg:"禁用"
        },
        {
            flag:data.myproducts.status.flagForSync,
            id:"ProductID",
            callback:function(flag,productId){
                return data.myproducts.status.action(flag,[{ECProductID:productId}]);
            },
            msg:"重新同步"
        }
    ];
    common.get(null);
    common.page();
});
