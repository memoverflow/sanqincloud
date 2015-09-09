/**
 * Created by XuRen on 15/7/8.
 */
require.config({
    baseUrl: "assets/js",
    shim:{
        "am":["jquery"],
        "hc":["jquery"]
    },
    paths : {
        "jquery" : 'libs/jquery.min',
        "am" : "libs/amazeui.min",
        "data": "app/data",
        "util":"app/util",
        "hc":"libs/highcharts"

    },
    waitSeconds: 10
});

/*
 人员管理主模块
 */
define(["jquery","am","data","util","hc"],function($,UI,data,util,hc){
    "use strict"

    var oc = {
        init:function(){
            data.orders.chart.action().done(function(result){
                $('.am-container').highcharts({
                    chart: {
                        type: 'line',
                    },
                    lang: {
                        noData: "没有相关数据"
                    },
                    noData: {
                        style: {
                            fontWeight: 'bold',
                            fontSize: '15px',
                            color: '#303030'
                        }
                    },
                    title: {
                        text: "消费情况表",
                    },
                    legend: {
                        enabled: false,
                    },
                    credits: false,
                    xAxis: {
                        categories: [],
                        labels: {
                            format: '{value}月'
                        }
                    },
                    yAxis: {
                        min: 0,
                        //minTickInterval: 3,
                        title: {
                            text: '消费金额 (元)'
                        }
                    },
                    tooltip: {
                        enabled: false,
                        formatter: function () {
                            return '<b>' + this.series.name + '</b><br/>' + this.x + ': ' + this.y + '元';
                        }
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: true
                            },
                            enableMouseTracking: false
                        }
                    },
                    series: [{
                        name: "消费情况",
                        data: result
                    }]
                });
            }).fail(function(result){
                console.log(result)
            });
        }
    };
    oc.init();
});