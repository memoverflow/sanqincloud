/**
 * AMD配置默认加载组件,加载顺序配置
 * 加载主模块,初始化主页面的相关内容
 */
require.config({
    baseUrl: "assets/js",
    shim:{
        "am":["jquery"],
        "hbs":["jquery"]
    },
    paths : {
        "jquery" : 'libs/jquery.min',
        "am" : "libs/amazeui.min",
        "hbs" : "libs/handlebars.min",
        "data": "app/data"
    },
    waitSeconds: 10
});

/*
默认加载主模块
 */
define(["jquery","am","hbs","data"],function($,UI,Handlebars,data){
    "use strict"
    
    var sq = {
        user:{
            toolbars:[],
            instance:{},
            compile:function(id,target,dataJson){
                var source   = $(id).html();
                var template = Handlebars.compile(source);
                $(target).html(template(dataJson));
            },
            showMessage:function(msg){
                var sqAlert = $("#sq-alert");
                sqAlert.find("#sq-alert-content").text(msg);
                sqAlert.modal();
            },
            changePwd:function(){
                //打开模态窗口
                $('#sq-modal-changePwd').modal();
                //修改密码按钮事件
                var changePwdBtn = $("#sq-modal-changePwd-confirm");
                var cancelBtn = $("#sq-modal-changePwd-cancel");
                var $form = $('#sq-form-changePwd');

                changePwdBtn.on("click",function(){
                    var isvalid = $form.validator().data('amui.validator').isFormValid();
                    if(isvalid){
                        //验证原密码是否正确
                        data.user.validatePwd.action({ orgPwd: $("#sq-vld-pwd-old").val() }).done(function(result){
                            if(result){
                                changePwdBtn.addClass("am-disabled");
                                sq.user.instance.Password = $("#sq-vld-pwd-1").val();
                                data.user.changePwd.action(sq.user.instance)
                                .done(function(result){
                                    sq.user.showMessage("更改密码成功!");
                                }).fail(function(){
                                    sq.user.showMessage("更改密码失败,请检查网络");
                                }).always(function(){
                                    $('#sq-modal-changePwd').modal("close");
                                    changePwdBtn.removeClass("am-disabled");
                                });
                            }
                            else{
                                $('#sq-modal-changePwd').modal("close");
                                sq.user.showMessage("更改密码失败,请检查原始密码");
                                $form.reset();
                            }
                        });
                    }
                    return false;
                });

            },
            trigger:function(){
                var toolbar = $("#sq-toolbar");
                toolbar.find("li>a").each(function(i,k){
                    if(i == 0)
                        $(this).click(sq.user.changePwd);
                });
                var cancelBtn = $("#sq-modal-changePwd-cancel");
                cancelBtn.on("click",function(){
                    $('#sq-modal-changePwd').modal("close");
                });
            },
            get:function(){
                //获取用户数据
                data.user.info.action().done(function (result) {
                    sq.user.instance = result;
                    sq.user.compile("#sq-toolbar-template","#sq-toolbar",result);
                    sq.user.trigger();

                }).fail(function (result) {
                });

            }

        }
    };
    sq.user.get();
});
