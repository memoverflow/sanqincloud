/**
 * Created by XuRen on 15/7/1.
 * 定义获取数据的地址
 */
define(["app/http"],function($http){
    "use strict"

    return {
        user:{
            desc:"当前用户操作的相关地址",
            info:{
                url:"/Home/GetUserInfo",
                desc:"获取用户的基本信息",
                action:function(){
                    return $http.get(this.url);
                }
            },
            validatePwd:{
                url: '/home/ValidationOrgPwd',
                desc:"验证输入的原密码是否正确",
                action:function(dataJson){
                    return $http.post(this.url,dataJson);
                }
            },
            changePwd:{
                url:"/Home/ChangePwd",
                desc:"修改用户密码",
                action:function(dataJson){
                    return $http.post(this.url,dataJson);
                }
            }
        },
        users:{
            desc:"用户的管理操作",
            info:{
                url:"/api/ecuser/",
                desc:"获取EC用户数据",
                action:function(pageIndex,pageSize,params){
                    var sortedBy = params.sortedBy;
                    var sortDir = params.sortDir;
                    var name = params.Name;
                    var userName = params.UserName;
                    var startDate = params.StartTime;
                    var endDate = params.EndTime;
                    return $http.get(this.url+'?pageIndex=' + pageIndex + "&pageSize=" + pageSize + "&sortBy=" + sortedBy + "&sortDir=" + sortDir + "&name=" + encodeURI(name) + "&userName=" + encodeURI(userName) + "&startDate=" + startDate + "&endDate=" + endDate);
                }
            },
            status:{
                url:"/api/ecuser/Handle/",
                desc:"修改用户状态:启用/禁用",
                flagEnabel:1,
                flagForbidden:2,
                flagForSync:3,
                action: function (flag, dataJson) {
                    var url = this.url + "?opreate=" + flag;
                    return $http.post(url,dataJson);
                }
            },
            search:{
                url:"",
                searchInfo:{ Name: "", UserName: "", StartTime: "", EndTime: "" }
            }
        },
        orders:{
            desc:"订单管理接口",
            chart:{
                url:"/api/chartorder",
                desc:"订单图表",
                action:function(){
                    return $http.get(this.url);
                }
            },
            info:{
                desc:"获取订单",
                url:"/api/ecorder/",
                action:function(pageIndex,pageSize,params,searchparams){
                    var sortBy = params.sortedBy;
                    var sortDir = params.sortDir;
                    return $http.post(this.url+'?pageIndex=' + pageIndex + "&pageSize=" + pageSize + "&sortBy=" + sortBy + "&sortDir=" + sortDir, searchparams);
                }
            },
            cancel:{
                desc:"取消订单",
                url:"/api/ecorder/",
                action:function(ids){
                    return $http.post(this.url,{"":ids});
                }
            }
        },
        products:{
            desc:"产品管理接口",
            info:{
                url:"/api/ECProductLincese/",
                desc:"",
                action:function(pageIndex,pageSize,params){
                    var sortBy = params.sortedBy;
                    var sortDir = params.sortDir;
                    var productName = params.ProductName;
                    return $http.get(this.url+'?pageIndex=' + pageIndex + "&pageSize=" + pageSize + "&sortBy=" + sortBy + "&sortDir=" + sortDir + "&name=" + encodeURI(name) + "&productName=" + encodeURI(productName));
                }
            },
            enable:{
                url:"/api/ECProductLincese/",
                desc:"开通产品",
                flagEnabel:1,
                flagForbidden:2,
                flagForSync:3,
                action:function(flag,dataJson){
                    var url = this.url + "?opreate="+flag;
                    return $http.post(url,dataJson);
                }
            },
            productExpand:{
                url:"/api/ECProductLincese/",
                desc:"获取产品扩展",
                action:function(productId){
                    return $http.get(this.url + "?productId=" + productId);
                }
            },
            auditUsers: {
                url: "/api/ecuser/",
                desc: "获取授权产品的用户信息",
                action: function (params) {
                    var sortedBy = params.sortedBy;
                    var sortDir = params.sortDir;
                    var pageIndex = params.pageIndex;
                    var pageSize = params.pageSize;
                    var ecCode = params.ecCode;
                    var productId = params.productId;
                    return $http.get(this.url + "?pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&sortBy=" + sortedBy + "&sortDir=" + sortDir + "&ECCode=" + ecCode + "&ProductID=" + productId);

                }
            },
            noAuditUsers: {
                url: "/api/ecuser/",
                desc: "获取未授权产品的用户信息",
                action: function (params) {
                    var sortedBy = params.sortedBy;
                    var sortDir = params.sortDir;
                    var pageIndex = params.pageIndex;
                    var pageSize = params.pageSize;
                    var ecCode = params.ecCode;
                    return $http.get(this.url + "?pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&sortBy=" + sortedBy + "&sortDir=" + sortDir + "&ECCode=" + ecCode );

                }
            },
            auditProductLincese: {
                url: "/api/ECProductLincese/",
                desc: "授权产品",
                action: function (flag,info) {
                    return $http.post(this.url+"?flag="+ flag, info);

                }
            }
        },
        myproducts:{
            desc:"我的产品管理",
            info:{
                url:"/api/ECProduct/",
                desc:"获取我开通的产品的数据",
                action:function(pageIndex,pageSize,params){
                    var sortedBy = params.sortedBy;
                    var sortDir = params.sortDir;
                    var productName = params.ProductName;
                    var status = params.Status;
                    return $http.get("/api/ECProduct/?pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&sortBy=" + sortedBy + "&sortDir=" + sortDir + "&ProductName=" + encodeURI(productName) + "&Status=" + status);
                }
            },
            status:{
                url:"/api/ECProduct/",
                desc:"修改我的产品状态:启用/禁用",
                flagEnabel:1,
                flagForbidden:2,
                flagForSync:3,
                action:function(flag,dataJson){
                    var url = this.url + "?opreate="+flag;
                    return $http.put(url,dataJson);
                }
            }
        },
    }
});

