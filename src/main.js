import Vue from "vue";
import App from "./App";
//引入路由组件
import router from "./router";

//引入请求组件
import axios from "axios";

//引入UI组件
import ElementUI from "element-ui";
import "element-ui/lib/theme-default/index.css";

//引入剪切板功能
import VueClipboard from "vue-clipboard2";

//引入图表插件
import ECharts from "vue-echarts/components/ECharts";

//导入echarts的图形类型
import "echarts/lib/chart/radar"; //雷达图
import "echarts/lib/chart/line"; //线形图
import "echarts/lib/chart/bar"; //饼形图
import "echarts/lib/component/polar"; //极坐标图

//手动引入 ECharts 各模块来减小打包体积
import "echarts/lib/component/tooltip"; //提示框
import "echarts/lib/component/legend"; //说明
import "echarts/lib/component/title.js"; //标题

//注册ECharts组件
Vue.component("v-chart", ECharts);

//生产提示
Vue.config.productionTip = false;

//注册
Vue.use(ElementUI);
Vue.use(VueClipboard);

//测试服务器地址
//Vue.prototype.$src='http://ollege.mrwfg.cn';

//正式环境服务器
Vue.prototype.$src = "http://service.college.otse5.cn";

//请求方法
Vue.prototype.$axios = axios;

//图片下载地址
Vue.prototype.$downloadUrl =
    "http://ollege.mrwfg.cn/index.php/index/home/saveimg?url=";

new Vue({
    el: "#app",
    router,
    template: "<App/>",
    components: { App },
});
