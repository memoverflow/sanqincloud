/**
 * AMD配置默认加载组件,加载顺序配置
 * 加载主模块,初始化主页面的相关内容
 */
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
        //注册用户状态
        Handlebars.registerHelper('status', function(status) {
            var result = '';
            switch (status)
            {
                case 0:
                    result = "创建";
                    break;
                case 1:
                    result = "启用";
                    break;
                case 2:
                    result = "禁用";
                    break;
                case 4:
                    result = "编辑";
                    break;
                case 5:
                    result = "重置密码";
                    break;
                default:
                    result = "其他";
                    break;
            }
            return new Handlebars.SafeString(result);
        });
        Handlebars.registerHelper('status', function(status) {
            var result = '';
            switch (status)
            {
                case 0:
                    result = "未支付";
                    break;
                case 1:
                    result = "已支付";
                    break;
                case 2:
                    result = "废单";
                    break;
                default:
                    result = "其他";
                    break;
            }
            return new Handlebars.SafeString(result);
        });
    },function(){
        common.searchparams.ECName = $(".am-modal-prompt-input").val();
    });
    common.promise = "data.orders.info.action(common.currentIndex,common.pageSize,common.params,common.searchparams)";
    common.array = [
        {
            flag:"",
            id:"OrderID",
            callback:function(flag,id){
                return data.orders.cancel.action([id]);
            },
            msg:"取消订单"
        }
    ];
    common.get(null);
    common.page();

});
