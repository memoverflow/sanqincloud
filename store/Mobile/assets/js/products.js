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
 产品管理主模块
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
        //注册是否需要授权
        Handlebars.registerHelper('authorize', function(flag) {
            var result = '';
            switch (flag)
            {
                case 1:
                    result = "是";
                    break;
                case 0:
                    result = "否";
                    break;
            }
            return new Handlebars.SafeString(result);
        });
    },function(){
        common.params.ProductName = $(".am-modal-prompt-input").val();
    });
    common.promise = "data.products.info.action(common.currentIndex,common.pageSize,common.params)";
    common.array = [
        {
            isCustomize:true,
            callback:function(sender){
                console.log(sender)
                //打开模态窗口
                $('#sq-modal-enable').modal();
                //修改密码按钮事件
                var enableBtn = $("#sq-modal-enable-confirm");
                var cancelBtn = $("#sq-modal-enable-cancel");
                cancelBtn.on("click",function(){
                    $('#sq-modal-enable').modal("close");
                });
                var $form = $('#sq-form-enable');
                enableBtn.on("click",function(){
                    var isvalid = $form.validator().data('amui.validator').isFormValid();
                    if(isvalid){
                        var code = $("#sq-vld-code").val();
                        var title = $("#sq-vld-title").val();
                        var userId = $("#sq-vld-userid").val();

                    }
                    return false;
                });
            }
        }
    ];
    common.get(null);
    common.page();
});
