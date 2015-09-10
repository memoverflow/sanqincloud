require.config({
    baseUrl: "assets/js",
    shim: {
        "hbs": ["jquery"]
    },
    paths: {
        "jquery": 'libs/jquery.min',
        "hbs": "libs/handlebars.min",
        "data": "app/data"
    },
    waitSeconds: 10
});
/*
 产品管理主模块
 */
define(["jquery", "hbs", "common", "data"], function ($, Handlebars, common, data) {
    "use strict"

    common.helper(function () {
        //注册用户状态
        Handlebars.registerHelper('status', function (status) {
            var result = '';
            switch (status) {
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
        Handlebars.registerHelper('authorize', function (flag) {
            var result = '';
            switch (flag) {
                case 1:
                    result = "是";
                    break;
                case 0:
                    result = "否";
                    break;
            }
            return new Handlebars.SafeString(result);
        });
    }, function () {
        common.params.ProductName = $(".am-modal-prompt-input").val();
    });
    common.promise = "data.products.info.action(common.currentIndex,common.pageSize,common.params)";
    common.array = [
        {
            isCustomize: true,
            callback: function (id, sender) {
                var group = $("#am-dynamic-group");
                var usersCtrl = $("#am-users");
                group.empty();
                usersCtrl.empty();
                

                var params = common.params;
                params.ecCode = sender.ECCode;

                params.pageIndex = 1;
                params.pageSize = 1000000;

                var attrArrays = [];

                var callbackEvent = function (promises, arrays, sender, flag) {
                    promises.done(function () {
                        $('#sq-modal-enable').modal();
                        bindEvent(function (param, sender) {
                            $(param).each(function (i) {
                                param[i] = {
                                    AttrCode: this.AttrCode,
                                    AttrID: this.AttrID,
                                    AttrType: this.AttrType,
                                    AttrValue: $("#am-dynamic-group").children().eq(i).val()
                                }
                            });
                            console.log(arrays)
                            var entity = {
                                ECID: sender.ECID,
                                ECProductLinceseID: sender.ECProductLinceseID,
                                ProductCode: sender.ProductCode,
                                ProductExpend: param,
                                ProductID: sender.ProductID,
                                ServiceCode: sender.ServiceCode,
                                UserID: [parseInt($("#am-users").val())]
                            }
                            if (sender.UsedLicense < sender.TotalLicense) {
                                data.products.auditProductLincese.action(flag, entity).success(function (msg) {
                                    if (msg.statusText == "OK") {
                                        common.showMessage("提交产品成功，请转到我的产品页面查看");
                                    } else {
                                        common.showMessage("提交产品失败，请检查网络");
                                    }
                                });
                            } else {
                                common.showMessage("所选产品已经没有可用的License，请联系管理员！");
                            }
                            common.get();
                            $('#sq-modal-enable').modal("close");
                        }, arrays, sender);
                    });
                }

                var bindEvent = function (eventThings, param, sender) {
                    //修改密码按钮事件
                    var enableBtn = $("#sq-modal-enable-confirm");
                    var cancelBtn = $("#sq-modal-enable-cancel");
                    cancelBtn.on("click", function () {
                        $('#sq-modal-enable').modal("close");
                    });
                    var $form = $('#sq-form-enable');
                    enableBtn.on("click", function () {
                        var isvalid = $form.validator().data('amui.validator').isFormValid();
                        if (isvalid) {
                            var code = $("#sq-vld-code").val();
                            var title = $("#sq-vld-title").val();
                            var userId = $("#sq-vld-userid").val();
                            eventThings(param, sender);
                        }
                        return false;
                    });
                }
                if (sender.EnableMemberAssign == 0) {
                    var initPrams = data.products.productExpand.action(sender.ProductID).done(function (result) {
                        if (result != null && result.length > 0) {
                            attrArrays = result;
                            $(result).each(function (i, current) {
                                var type = current.AttrType;
                                var b = current;
                                var html = "";
                                var checkRule = "";
                                switch (type) {
                                    case 0:
                                        if (b.IsRequired != null) {//非空验证
                                            checkRule = "required";
                                        }
                                        if (b.MinLength != null) {//最小值
                                            checkRule += " minlength='" + b.MinLength + "'";
                                        }
                                        if (b.MaxLength != null) {//最大值
                                            checkRule += " maxlength='" + b.MaxLength + "'";
                                        }
                                        if (b.ValidateRegex != null) {//正则表达式
                                            checkRule += " pattern='/" + b.ValidateRegex + "/'";
                                        }
                                        html = "<input type='text' placeholder='" + b.AttrName + "' " + checkRule + " />";
                                        group.html(group.html() + html);
                                        break;
                                    case 1:
                                    case 3:
                                        console.log("在2015-9-10还没完成web版本，待完成web版本后mobile端会继续完成");
                                        //html = "<select class='am-input-sm'></select>";
                                        //group.html(group.html() + html);
                                        break;
                                }

                            });
                        }

                        params.productId = sender.ProductID;
                        var initUsers = data.products.auditUsers.action(params).done(function (users) {
                            $(users.DataSource).each(function (i, k) {
                                usersCtrl.append("<option value='" + this.UserID + "'>" + this.Name + "</option>");
                            });
                        });
                        callbackEvent($.when(initPrams, initUsers), attrArrays, sender, 0);
                    });
                    

                } else {
                    var initUsers = data.products.noAuditUsers.action(params).done(function (users) {
                        $(users.DataSource).each(function (i, k) {
                            usersCtrl.append("<option value='" + this.UserID + "'>" + this.Name + "</option>");
                        });
                    });
                    callbackEvent(initUsers, [], sender, 1);
                }
            }
        }
    ];
    common.get(null);
    common.page();
});
