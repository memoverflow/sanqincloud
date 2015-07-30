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
        //注册用户性别
        Handlebars.registerHelper('gender', function(gender) {
            var result = '';
            switch (gender)
            {
                case "M":
                    result = "男";
                    break;
                case "F":
                    result = "女";
                    break;
            }
            return new Handlebars.SafeString(result);
        });
        //注册用户同步状态
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
    },function(){
        common.params.Name = $(".am-modal-prompt-input").val();
    });
    common.promise = "data.users.info.action(common.currentIndex,common.pageSize,common.params)";
    common.array = [
        {
            flag:data.users.status.flagEnabel,
            id:"UserID",
            callback:function(flag,userId){
                return data.users.status.action(flag,[userId]);
            },
            msg:"启用用户"
        },
        {
            flag:data.users.status.flagForbidden,
            id:"UserID",
            callback:function(flag,userId){
                return data.users.status.action(flag,[userId]);
            },
            msg:"禁用用户"
        },
        {
            flag:data.users.status.flagForSync,
            id:"UserID",
            callback:function(flag,userId){
                return data.users.status.action(flag,[userId]);
            },
            msg:"同步用户"
        }
    ];
    common.get(null);
    common.page();
});
