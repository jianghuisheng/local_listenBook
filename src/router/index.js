import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

//登录页
const login = (r) =>
    require.ensure([], () => r(require("@/pages/login")), "login");
//注册页
const register = (r) =>
    require.ensure([], () => r(require("@/pages/register")), "register");
//主页及子页面
const home = (r) =>
    require.ensure([], () => r(require("@/pages/home")), "home");
const product = (r) =>
    require.ensure([], () => r(require("@/pages/home/product")), "product");
const material = (r) =>
    require.ensure([], () => r(require("@/pages/home/material")), "material");
const channel = (r) =>
    require.ensure([], () => r(require("@/pages/home/channel")), "channel");
const channelAdd = (r) =>
    require.ensure(
        [],
        () => r(require("@/pages/home/channel-add")),
        "channel-add"
    );
const order = (r) =>
    require.ensure([], () => r(require("@/pages/home/order")), "order");
const incomeTrend = (r) =>
    require.ensure(
        [],
        () => r(require("@/pages/home/income-trend")),
        "income-trend"
    );

//配置路由词典
const routes = [
    {
        path: "/",
        component: login,
        name: "登录页",
    },
    {
        path: "/login",
        component: login,
        name: "登录页",
    },
    {
        path: "/register",
        component: register,
        name: "注册页",
    },
    {
        path: "/home",
        name: "首页",
        component: home,
        redirect: "/home/product",
        children: [
            {
                path: "/home/product",
                component: product,
                meta: ["商品管理"],
            },
            {
                path: "/home/material",
                component: material,
                meta: ["推广素材"],
            },
            {
                path: "/home/channel",
                component: channel,
                meta: ["渠道管理"],
            },
            {
                path: "/home/channel_add",
                component: channelAdd,
                meta: ["添加渠道"],
            },
            {
                path: "/home/order",
                component: order,
                meta: ["订单详情"],
            },
            {
                path: "/home/income-trend",
                component: incomeTrend,
                meta: ["收入趋势"],
            },
        ],
    },
];

export default new Router({
    // hash history开关
    // mode: "history",
    routes,
});
