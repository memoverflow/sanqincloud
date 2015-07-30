/**
 * Created by XuRen on 15/7/1.
 * 使用jquery获取用户数据的基础通用类
 */
define(["jquery"],function($){
    "use strict"

    function request(options){
        $.AMUI.progress.start();
        var promise = $.ajax(options)
            promise.always(function(){
                $.AMUI.progress.done();
            });
        return promise;
    }
    return {
        get:function(url){
            return request({type:"get",url:url,dataType:"json",cache:false});
        },
        post:function(url,dataJson){
            return request({type:"post",url:url,dataType:"json",data:dataJson,cache:false});
        },
        put:function(url,dataJson){
            return request({type:"put",url:url,dataType:"json",data:dataJson,cache:false});
        },
        delete:function(url){
            return request({type:"delete",url:url,dataType:"json",cache:false});
        }
    };
});
