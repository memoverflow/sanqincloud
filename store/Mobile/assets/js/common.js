/**
 * AMD配置默认加载组件,加载顺序
 * 加载主模块,初始化主页面的相关内容
 */
require.config({
    baseUrl: "assets/js",
    shim:{
        "am":["jquery"],
        "hbs":["jquery"],
        "swiper":["jquery"]
    },
    paths : {
        "jquery" : 'libs/jquery.min',
        "am" : "libs/amazeui.min",
        "hbs" : "libs/handlebars.min",
        "data": "app/data",
        "swiper":"libs/amazeui.swiper.min"
    },
    waitSeconds: 8
});
/*
 默认加载主模块
 */
define(["jquery","am","hbs","data","swiper"],function($,UI,Handlebars,data,swiper){
    "use strict"

    var common =  {
        compile:function(id,target,dataJson){
            var source   = $(id).html();
            var template = Handlebars.compile(source);
            $(target).html(template(dataJson));
        },
        loginUrl:"https://sts.fengxicloud.com/adfs/ls/?wa=wsignin1.0&wtrealm=https://www.sanqincloud.com&wctx=rm%3d0%26id%3dpassive%26ru%3d%252f&wct=2015-04-09T08%3a05%3a07Z",
        currentUser:{},
        views:[
            {name:"cases",url:"parts/cases.html"},
            {name:"header",url:"parts/header.html"},
            {name:"hotapp",url:"parts/hotapp.html"},
            {name:"links",url:"parts/links.html"},
            {name:"modal",url:"parts/modal.html"},
            {name:"nav",url:"parts/nav.html"},
            {name:"notice",url:"parts/notice.html"},
            {name:"list",url:"parts/list.html"},
            {name:"store",url:"parts/store.html"},
            {name:"details",url:"parts/details.html"},
            {name:"alert",url:"parts/alert.html"},
            {name:"news",url:"parts/news.html"},
            {name:"search",url:"parts/search.html"},
            {name:"contact",url:"parts/contact.html"},
            {name:"licences",url:"parts/licences.html"},
            {name:"head",url:"parts/head.html"}

        ],
        head:"parts/head.html",
        listAction:[
            {title:"信息公开",action:data.main.news.action},
            {title:"新手指南",action:data.main.fisher.action},
            {title:"政策法规",action:data.main.policy.action},
            {title:"最新公告",action:data.main.notice.action},
            {title:"行业动态",action:data.main.dynamic.action},
            {title:"体验中心",action:data.main.experience.action},
        ],
        loading:function(status){
            if(!status){
                $("#modal").hide();
            }
        },
        getPart: function(item) {
            return data.part.action(item.url);
        },
        renderParts:function(){
            //render head
            $("body").hide();
            var parts = [];
            parts.push(common.views[common.views.length-1]);
            $("body").find("div").each(function(i){
                var id = $(this).attr("id");
                parts.push(common.lookup(id));

            });
            var promises = parts.map(common.getPart);
            return $.when.apply(this, promises).then(function(){
                $(arguments).each(function(i){
                    if(parts[i].name == "head") {
                        $("head").html(this[0]);
                    }
                    else
                        $("#"+parts[i].name).html(this[0]);
                });
                $("body").show();
            });


        },
        hideMore:function(result,pageIndex,pageSize){
            if(result.TotalRecord<=pageIndex * pageSize)
                $(".am-store-more").hide();
        },
        lookup:function(id){
            for(var i = 0;i<common.views.length;i++){
                var item = common.views[i];
                if(item.name == id)
                    return item;
            }
        },
        showMessage:function(msg){
            var sqAlert = $("#sq-alert");
            sqAlert.find("#sq-alert-content").text(msg);
            sqAlert.modal();
        },
        queryString:function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]); return null;
        },

        login:function(){
            var cookie = $.AMUI.utils.cookie;
            var user = JSON.parse(cookie.get("user"));
            if(user == null || user.UserID == undefined ){
                //获取当前是否登录
                data.user.action().done(function(result){
                    user = result;
                    if(result == null){
                       $(".am-topbar-login").find("a").text("登录").attr("href",common.loginUrl);
                    }else{
                        $(".am-topbar-login").hide();
                        $("#sq-user-show").show().dropdown();
                        $("#sq-user-banner").text("欢迎您 "+result.UserName);
                    }
                    cookie.set("user",JSON.stringify(user));
                    common.currentUser = user;
                });
            }else{
                $(".am-topbar-login").hide();
                $("#sq-user-show").show().dropdown();
                $("#sq-user-banner").text("欢迎您 "+user.UserName);
                common.currentUser = user;
            }

        },
        init:function(){
            this.login();
            $(".am-topbar-search").click(function(){
                $("#sq-common-search").modal();
                $(".am-modal-prompt-input").focus();
            });
            $("#sq-search-cancel").click(function(){$("#sq-common-search").modal("close");});
            $("#sq-search-confirm").click(function(){
                var val = $(".am-modal-prompt-input").val();
                window.location = "store.html?search="+encodeURIComponent(val);
                $("#sq-common-search").modal("close");
            });
        },
        helper:function(){
            Handlebars.registerHelper('txtsp', function(html) {
                var result = html.replace(/<\/?.+?>/g,"").substr(0,54);
                return new Handlebars.SafeString(result);
            });
            Handlebars.registerHelper('preview', function(img) {
                var result = (img == ""|| img ==null)?"mobile/assets/images/preview.png":img;
                return new Handlebars.SafeString(result);
            });
            Handlebars.registerHelper('attachment', function(attachment) {
                var result = (attachment == ""|| attachment ==attachment)?"javascript:void(0)":"/"+attachment;
                return new Handlebars.SafeString(result);
            });
            Handlebars.registerHelper('json', function(json) {
                var result = JSON.stringify(json);
                return new Handlebars.SafeString(result);
            });
        },
        pop:function(){
            $('#my-popover').popover({
                content: 'Popover via JavaScript'
            })
        },
        getBanners:function(pageIndex,pageSize){
            data.main.banners.action(pageIndex,pageSize).done(function(result){
                common.compile("#sq-common-template","#am-banner-container",{result:result.DataSource});
                $(".am-banner").flexslider();
            }).fail(function(){
                common.showMessage("获取菜单数据失败!");
            }).always(function(){
                common.loading(false);
            });
        },
        getNews:function(pageIndex,pageSize){
            data.main.news.action(pageIndex,pageSize).done(function(result){
                common.compile("#sq-news-template","#am-news-container",{result:result.DataSource});
                $(".am-notice .swiper-container").swiper({
                    pagination: '.am-notice .swiper-container .swiper-pagination'
                });
            }).fail(function(){
                common.showMessage("获取信息数据失败!");
            });
        },
        getHotApp:function(pageIndex,pageSize){
            data.main.hotapp.action(pageIndex,pageSize).done(function(result){
                common.compile("#sq-hotapp-template","#am-hotapp-container",{result:result.DataSource});
            }).fail(function(){
                common.showMessage("获取信息数据失败!");
            });
        },
        getLinks:function(pageIndex,pageSize){
            data.main.links.action(pageIndex,pageSize).done(function(result){
                common.compile("#sq-links-template","#am-links-container",{result:result.DataSource});
            }).fail(function(){
                common.showMessage("获取综合服务数据失败!");
            });
        },
        getCases:function(pageIndex,pageSize){
            data.main.case.action(pageIndex,pageSize).done(function(result){
                common.compile("#sq-cases-template","#am-cases-container",{result:result.DataSource});
                $(".am-case .swiper-container").swiper({
                    pagination: '.am-case .swiper-container .swiper-pagination'
                });
            }).fail(function(){
                common.showMessage("获取成功案例数据失败!");
            });
        },

        getStoreList:function(pageIndex,pageSize){
            var query = this.queryString("search");
            var productName = query == null?"": decodeURIComponent(query);
            data.store.list.action(pageIndex,pageSize,productName).done(function(result){
                common.hideMore(result,pageIndex,pageSize);
                if(result == null || result.DataSource == null || result.DataSource.length == 0)
                    return;
                if(pageIndex>1) {
                    var html = '<ul id="am-store-container' + pageIndex + '"></ul>';
                    $(".am-store-list ul:last").after(html);
                    common.compile("#sq-store-template", "#am-store-container"+pageIndex, {result: result.DataSource});

                }
                else {
                    common.compile("#sq-store-template", "#am-store-container", {result: result.DataSource});
                }
                common.addOrder();

            }).fail(function(){
                common.showMessage("获取成功案例数据失败!");
            });
        },
        getStoreDetails:function(){
            var id = this.queryString("id");
            data.store.details.action(id).done(function(result){
                $(".am-page-content-title").text(result.ProductName);
                $("#am-content-html").html(result.Description);
                common.loading(false);
            }).fail(function(){
                common.showMessage("获取成功案例数据失败!");
            });
        },
        getList:function(pageIndex,pageSize){
            var catagory = this.queryString("catagory");
            var item = this.listAction[catagory];
            $("#newsTitle").text(item.title);
            item.action(pageIndex,pageSize).done(function(result){
                common.hideMore(result,pageIndex,pageSize);
                if(result == null || result.DataSource == null || result.DataSource.length == 0)
                    return;
                if(pageIndex>1) {
                    var html = '<ul id="am-list-container' + pageIndex + '"></ul>';
                    $(".am-store-list ul:last").after(html);
                    common.compile("#sq-list-template", "#am-list-container"+pageIndex, {result: result.DataSource});
                }
                else {
                    common.compile("#sq-list-template", "#am-list-container", {result: result.DataSource});
                }

            }).fail(function(){
                common.showMessage("获取成功案例数据失败!");
            });
        },
        getContent:function(){
            var id = this.queryString("ContentID");
            data.main.content.action(id).done(function(result){
                $(".am-page-content-title").text(result.ContentTitle);
                $("#am-content-html").html(result.Description);
                common.loading(false);
            }).fail(function(){
                common.showMessage("获取内容数据失败!");
            });
        },
        addOrder:function(){
            $(".am-btn-tryout").click(function(){
                var code = $(this).attr("data-store");
                var price = $(this).attr("data-price");
                var productId = $(this).attr("data-id");
                common.loading(true);
                $("#sq-common-number").modal();
                $("#sq-number-cancel").click(function(){$("#sq-common-number").modal("close");});
                $("#sq-number-confirm").click(function(){
                    var val = $("#am-number").val();
                    if(val > 0) {
                        data.store.price.action(code, val).done(function (prices) {
                            if (common.currentUser.UserID) {
                                var item = {
                                    IdentityName: common.currentUser.UserName,
                                    ProductID: productId,
                                    BuyPrice:prices.PriceValue,
                                    BuyNum:val
                                }
                                var postData ={"":[item]};
                                data.store.add.action(postData).done(function (result) {
                                    common.showMessage("试用成功,请转到自服务门户查看!");
                                    common.loading(false);
                                }).fail(function () {
                                    common.showMessage("添加订单失败,请联系网站管理员!");
                                    common.loading(false);
                                });
                            }
                            else {
                                window.location = common.loginUrl;
                            }
                            $("#sq-common-search").modal("close");

                        });
                    }

                });

            });
        }
    };
    return common;
});
