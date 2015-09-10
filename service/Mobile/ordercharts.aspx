<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ordercharts.aspx.cs" Inherits="Microsoft.Cloud.Portal.Service.Mobile.ordercharts" %>
<!doctype html>
<html class="no-js">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="三秦企业云服务平台">
    <meta name="keywords" content="三秦,企业云,西咸,微软">
    <meta name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>订单视图</title>
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
    <h2 class="am-titlebar-title ">订单管理-图表分析</h2>
</div>
<div class="am-container"></div>
<!--主页菜单结束-->
<!--回到顶部开始-->
<div data-am-widget="gotop" class="am-gotop am-gotop-fixed">
    <a href="#top" title="回到顶部">
        <span class="am-gotop-title">回到顶部</span>
        <i class="am-gotop-icon am-icon-chevron-up"></i>
    </a>
</div>
<!--回到顶部结束-->
<script src="assets/js/libs/require.js" data-main="assets/js/ordercharts" type="application/javascript"></script>
</body>
</html>