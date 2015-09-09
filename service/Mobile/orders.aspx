<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="orders.aspx.cs" Inherits="Microsoft.Cloud.Portal.Service.Mobile.orders" %>
<!doctype html>
<html class="no-js">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="三秦企业云服务平台">
    <meta name="keywords" content="三秦,企业云,西咸,微软">
    <meta name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, order-scalable=no">
    <title>用户管理</title>
    <!-- Set render engine for 360 browser -->
    <meta name="renderer" content="webkit">
    <!-- No Baidu Siteapp-->
    <meta http-equiv="Cache-Control" content="no-siteapp"/>
    <link rel="icon" type="image/png" href="assets/i/favicon.png">
    <!-- Add to homescreen for Chrome on Android -->
    <meta name="mobile-web-app-capable" content="yes">
    <link rel="icon" sizes="192x192" href="assets/i/app-icon72x72@2x.png">
    <!-- Add to homescreen for Safari on iOS -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-title" content="Amaze UI"/>
    <link rel="apple-touch-icon-precomposed" href="assets/i/app-icon72x72@2x.png">
    <!-- Tile icon for Win8 (144x144 + tile color) -->
    <meta name="msapplication-TileImage" content="assets/i/app-icon72x72@2x.png">
    <meta name="msapplication-TileColor" content="#0e90d2">
    <link rel="stylesheet" href="assets/css/amazeui.min.css">
    <link rel="stylesheet" href="assets/css/app.css">
</head>
<body id="body">
<!--[if lte IE 9]>
<p class="browsehappy">你正在使用<strong>过时</strong>的浏览器，Amaze UI 不提供支持。 请 <a href="http://browsehappy.com/" target="_blank">升级浏览器</a>以获得更好的体验！</p>
<![endif]-->
<!--头文件开始-->
<header data-am-widget="header" class="am-header am-header-default">
    <div class="am-header-left am-header-nav">
        <a href="javascript:history.back()" class="">
            <i class="am-header-icon am-icon-chevron-left"></i>
        </a>
    </div>
    <h1 class="am-header-title">
        三秦云平台
    </h1>
</header>
<!--头文件结束-->
<!--弹出菜单开始-->
<nav data-am-widget="menu" class="am-menu   am-menu-offcanvas1" data-am-menu-offcanvas>
        <a href="javascript: void(0)" class="am-menu-toggle">
            <i class="am-menu-toggle-icon am-icon-bars"></i>
        </a>
        <div class="am-offcanvas" >
            <div class="am-offcanvas-bar am-offcanvas-bar-flip">
                <ul class="am-menu-nav am-avg-sm-1">

                    <li class="am-parent">
                        <a href="##" class="">用户管理</a>
                        <ul class="am-menu-sub am-collapse  am-avg-sm-3 ">
                            <li class="">
                                <a href="users.aspx" class=""><span class="am-icon-user"></span> 人员管理</a>
                            </li>
                        </ul>
                    </li>

                </ul>
                <ul class="am-menu-nav am-avg-sm-1">
                    <li class="am-parent">
                        <a href="##" class="">订单管理</a>
                        <ul class="am-menu-sub am-collapse  am-avg-sm-3 ">
                            <li class="">
                                <a href="ordercharts.aspx" class=""><span class="am-icon-line-chart"></span> 图表展示</a>
                                <a href="orders.aspx" class=""><span class="am-icon-file"></span>  &nbsp;我的订单</a>
                            </li>
                        </ul>
                    </li>

                </ul>
                <ul class="am-menu-nav am-avg-sm-1">
                    <li class="am-parent">
                        <a href="##" class="">产品管理</a>
                        <ul class="am-menu-sub am-collapse  am-avg-sm-3 ">
                            <li class="">
                                <a href="products.aspx" class=""><span class="am-icon-play"></span> 产品开通</a>
                                <a href="myproducts.aspx" class=""><span class="am-icon-gift"></span>  我的产品</a>
                            </li>
                        </ul>
                    </li>

                </ul>

                <ul class="am-menu-nav am-avg-sm-1">
                    <li class="am-parent">
                        <a href="http://http://www.sanqincloud.com/mobile/index.html" class="">回到商店</a>
                    </li>

                </ul>
            </div>
        </div>
    </nav>

<!--弹出菜单结束-->
<!--主页菜单开始-->
<div data-am-widget="titlebar" class="am-titlebar am-titlebar-default">
    <h2 class="am-titlebar-title ">订单管理</h2>
</div>
<!--订单列表开始-->
<section id="sq-common-container" data-am-widget="accordion" class="am-accordion am-accordion-default"
         data-am-accordion='{ "multiple": true }'>
    <span class="am-cf am-center"><i class="am-icon-spinner am-icon-pulse"></i> 加载中...</span>
</section>
<script id="sq-common-template" type="text/x-handlebars-template">
    {{#each result}}
    <dl class="am-accordion-item" >
        <dt class="am-accordion-title">
            <span class="am-text-truncate">{{OrderSeqNo}}</span>
            {{#ifeq Status 0}}
            <a data-tag="{{@index}}" href="javascript:void(0)" class="am-badge am-badge-success am-radius am-fr"><i class="am-icon-remove"></i> 取消</a>
            {{/ifeq}}
        </dt>
        <dd class="am-accordion-bd am-collapse">
            <!-- 规避 Collapase 处理有 padding 的折叠内容计算计算有误问题， 加一个容器 -->
            <div class="am-accordion-content">
                <table class="am-table am-table-bordered">
                    <tbody>
                    <tr>
                        <td class="am-active">应收金额</td>
                        <td>{{Price}}</td>
                    </tr>
                    <tr>
                        <td class="am-active">实收金额</td>
                        <td>{{BuyPrice}}</td>
                    </tr>
                    <tr>
                        <td class="am-active">订单状态</td>
                        <td>{{status Status}}</td>
                    </tr>
                    <tr>
                        <td class="am-active">订单提交时间</td>
                        <td>{{date CreateTime}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </dd>
    </dl>
    {{/each}}
</script>
<!--订单列表结束-->
<!--主页菜单结束-->

<!--提示框开始-->
<div class="am-modal am-modal-alert" tabindex="-1" id="sq-alert">
    <div class="am-modal-dialog">
        <div class="am-modal-hd">提示信息</div>
        <div class="am-modal-bd">
            <span id="sq-alert-content"></span>
        </div>
        <div class="am-modal-footer">
            <span class="am-modal-btn">确定</span>
        </div>
    </div>
</div>
<!--提示框结束-->
<!--工具栏开始-->
<div data-am-widget="navbar" class="am-navbar am-cf am-navbar-default " id="">
    <ul class="am-navbar-nav am-cf am-avg-sm-2">
        <li>
            <a href="javascript:void(0)" class="" id="sq-btn-search">
                <span class="am-icon-search"></span>
                <span class="am-navbar-label">查询</span>
            </a>
        </li>
        <li>
            <a href="" class="">
                <span class="am-icon-refresh"></span>
                <span class="am-navbar-label">刷新</span>
            </a>
        </li>

    </ul>
</div>
<div class="am-modal-actions" id="sq-toolbar">
</div>
<script id="sq-toolbar-template" type="text/x-handlebars-template">
    <div class="am-modal-actions-group">
        <ul class="am-list">
            <li class="am-modal-actions-header">取消{{ContactName}}的订单{{OrderSeqNo}}?</li>
            </li>
            <li>
                <a href="javascript:void(0)"><span class="am-icon-remove"></span> 取消</a>
            </li>
        </ul>
    </div>
    <div class="am-modal-actions-group">
        <button class="am-btn am-btn-secondary am-btn-block" id="cancelBtn">取消</button>
    </div>
</script>
<!--工具栏结束-->
<!--查询订单开始-->
<div class="am-modal am-modal-prompt" tabindex="-1" id="sq-common-search">
    <div class="am-modal-dialog">
        <div class="am-modal-hd">查询订单</div>
        <div class="am-modal-bd">
            请输入
            <input type="text" class="am-modal-prompt-input">
        </div>
        <div class="am-modal-footer">
            <span class="am-modal-btn" id="sq-search-cancel">取消</span>
            <span class="am-modal-btn" id="sq-search-confirm">提交</span>
        </div>
    </div>
</div>
<!--查询订单结束-->
<!--回到顶部开始-->
<div data-am-widget="gotop" class="am-gotop am-gotop-fixed">
    <a href="#top" title="回到顶部">
        <span class="am-gotop-title">回到顶部</span>
        <i class="am-gotop-icon am-icon-chevron-up"></i>
    </a>
</div>
<!--回到顶部结束-->
<script src="assets/js/libs/require.js" data-main="assets/js/orders" type="application/javascript"></script>
</body>
</html>