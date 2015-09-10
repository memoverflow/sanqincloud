/**
 * AMD配置默认加载组件,加载顺序配置
 * 加载主模块,初始化主页面的相关内容
 */
require.config({
    baseUrl: "assets/js",
    shim: {
        "am": ["jquery"],
        "hbs": ["jquery"]
    },
    paths: {
        "jquery": 'libs/jquery.min',
        "am": "libs/amazeui.min",
        "hbs": "libs/handlebars.min",
        "data": "app/data",
        "util": "app/util",
        "loader": "libs/dragloader"
    },
    waitSeconds: 10
});
/*
通用模块
 */
define(["jquery", "am", "hbs", "data", "util", "loader"], function ($, UI, Handlebars, data, util, loader) {
    "use strict"

    var common = {
        staticPageSize: 8,
        pageSize: 8,
        currentIndex: 1,
        sizeIndex: 1,
        pageCount: 0,
        promise: "",
        instance: {},
        array: [],
        searchparams: {
            ECName: "",
            ContactName: ""
        },
        params: {
            EndTime: "",
            Name: "",
            StartTime: "",
            UserName: "",
            sortDir: "desc",
            sortedBy: "CreateTime",
            ProductName: "",
            Status: ""
        },
        compile: function (id, target, dataJson) {
            var source = $(id).html();
            var template = Handlebars.compile(source);
            $(target).html(template(dataJson));
        },
        showMessage: function (msg) {
            var sqAlert = $("#sq-alert");
            sqAlert.find("#sq-alert-content").text(msg);
            sqAlert.modal();
        },
        helper: function (helpers, searchcallback) {
            helpers();
            Handlebars.registerHelper('ifeq', function (v1, v2, options) {
                if (v1 === v2) {
                    return options.fn(this);
                }
                return options.inverse(this);
            });
            //注册日期,货币等
            Handlebars.registerHelper('date', function (date) {
                var result = new Date(date).format("yyyy-MM-dd hh:mm");
                return new Handlebars.SafeString(result);
            });

            $('#sq-btn-search').on('click', function () {
                $("#sq-common-search").modal();
                $(".am-modal-prompt-input").focus();
            });
            $("#sq-search-cancel").click(function () { common.closeModal("#sq-common-search"); });
            $("#sq-search-confirm").click(function () {
                searchcallback();
                common.get();
                common.closeModal("#sq-common-search");
            });
        },
        get: function () {
            eval(this.promise).done(function (result) {
                $(result.DataSource).each(function (i, k) {
                    var obj = this;
                    data.products.productExpand.action(this.ProductID).done(function (attr) {
                        if (attr != null && attr.length > 0 && (attr[0].AttrType == 1 || attr[0].AttrType == 3))
                        {
                            console.log(obj)
                            console.log(attr)
                        }
                    });
                });
                common.instance = result.DataSource;
                common.pageCount = Math.ceil(result.TotalRecord / common.staticPageSize);
                common.compile("#sq-common-template", "#sq-common-container", { result: common.instance });
                $.AMUI.accordion.init();
                common.init();
            });
        },
        closeModal: function (id) {
            $(id).modal("close");
        },
        init: function () {
            var editlabels = $(".am-badge");
            editlabels.on("click", function () {
                var index = $(this).attr("data-tag");
                var current = common.instance[index];

                common.compile("#sq-toolbar-template", "#sq-toolbar", current);
                $("#sq-toolbar").modal();
                $("#cancelBtn").click(function () {
                    common.closeModal("#sq-toolbar");
                });
                common.trigger(current);
                return false;
            });

        },
        trigger: function (current) {
            $("#sq-toolbar").find("li>a").each(function (i, k) {
                $(this).click(function () {
                    $(common.array).each(function (ii, kk) {
                        var obj = this;
                        if (i == ii) {
                            if (this.isCustomize) {
                                this.callback(this, current);
                            } else {
                                this.callback(this.flag, current[this.id]).done(function () {
                                    common.showMessage(obj.msg + "成功");
                                    common.get();
                                }).fail(function () {
                                    common.showMessage(obj.msg + "失败");
                                });
                            }

                        }
                    });
                    common.closeModal("#sq-toolbar");

                });
            });

        },

        page: function () {
            $("#am-load-more").click(function () {
                common.sizeIndex++;
                if (common.sizeIndex <= common.pageCount) {
                    common.pageSize = common.sizeIndex * common.staticPageSize;
                    common.get();
                }
                else {
                    $(this).hide();
                }
            });

        }
    };
    return common;
});
