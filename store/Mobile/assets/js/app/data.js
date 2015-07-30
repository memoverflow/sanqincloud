/**
 * Created by XuRen on 15/7/1.
 * 定义获取数据的地址
 */
define(["app/http"],function($http){
    "use strict"

    return {
        main:{
            desc:"获取主页相关接口",
            banners:{
                url:"/api/CMSContent/GetBannerContents/",
                desc:"获取banner的相关信息",
                action:function(pageIndex,pageSize){
                    return $http.get(this.url+"?pageIndex="+pageIndex+"&pageSize="+pageSize);
                }
            },
            case:{
                url:"/api/CMSContent/GetSucceedCaseContents/",
                desc:"获取成功案例",
                action:function(pageIndex,pageSize){
                    return $http.get(this.url+"?pageIndex="+pageIndex+"&pageSize="+pageSize);
                }
            },
            news:{
                desc:"信息公开",
                action:function(pageIndex,pageSize){
                    return $http.get("/api/CMSContent/GetNewsContents/?pageIndex="+pageIndex+"&pageSize="+pageSize);
                }
            },
            fisher:{
                desc:"新手指南",
                action:function(pageIndex,pageSize){
                    return $http.get("/api/CMSContent/GetNewUserHelpContents/?pageIndex="+pageIndex+"&pageSize="+pageSize);
                }
            },
            policy:{
                desc:"政策法规",
                action:function(pageIndex,pageSize){
                    console.log(this)
                    return $http.get("/api/CMSContent/GetPolicyReguContents/?pageIndex="+pageIndex+"&pageSize="+pageSize);
                }
            },
            notice:{
                desc:"最新公告",
                action:function(pageIndex,pageSize){
                    return $http.get("/api/CMSContent/GetLastNewsContents/?pageIndex="+pageIndex+"&pageSize="+pageSize);
                }
            },
            dynamic:{
                desc:"行业动态",
                action:function(pageIndex,pageSize){
                    return $http.get("/api/CMSContent/GetIndustryNewsContents/?pageIndex="+pageIndex+"&pageSize="+pageSize);
                }
            },
            experience:{
                desc:"体验中心",
                action:function(pageIndex,pageSize){
                    return $http.get("/api/CMSContent/GetExperienceCenterContents/?pageIndex="+pageIndex+"&pageSize="+pageSize);
                }
            },
            links:{
                url:"/api/CMSContent/GetLinkServiceContents/",
                desc:"热门应用",
                action:function(pageIndex,pageSize){
                    return $http.get(this.url+"?pageIndex="+pageIndex+"&pageSize="+pageSize);
                }
            }
        },
        store:{
            desc:'关于商城的接口',
            list:{
                desc:"商城商品的列表",
                url:"/api/SiProduct/GetProductList",
                action:function(pageIndex,pageSize,productName){
                    var url = this.url+"?pageIndex="+pageIndex+"&pageSize="+pageSize+"&productName="+productName;
                    return $http.get(url);
                }
            },
            details:{
                desc:"商品详细信息",
                url:"/api/SiProduct/GetProduct",
                action:function(id){
                    var url = this.url+"?productid="+id;
                    return $http.get(url);
                }
            }
        },
        part:{
            desc:"获取部件",
            action:function(url){
                return $.get(url);
            }
        }
    }
});

