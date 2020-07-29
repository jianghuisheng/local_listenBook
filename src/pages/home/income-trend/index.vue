<template>
    <div id="income-trend">
        <RightHeader :title="title"></RightHeader>
        <div class="content-box">
            <div class="content">
                <div class="dateSelect">
                    <el-date-picker
                        v-model="dateRange"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
                    ></el-date-picker>
                    <el-button type="primary" class="postDate" @click="postDate">提交</el-button>
                </div>
                <div class="chart-box">
                    <v-chart
                        theme="ovilia-green"
                        :options="option"
                        style="width: 100%;height:100%;"
                        ref="myEcharts"
                    />
                </div>
            </div>
        </div>
        <RightFooter></RightFooter>
    </div>
</template>
<script>
import RightHeader from "../../../public/right-header/index";
import RightFooter from "../../../public/right-footer/index";

//引入图表组件
import ECharts from "vue-echarts/components/ECharts";

export default {
    name: "income-trend",
    data() {
        return {
            title: "听书宝",
            //时间选择
            dateRange: "",
            //图表选项配置
            option: {
                title: {
                    text: "收益趋势图",
                    left:'center'  ,
                    //配置文字样式
                    textStyle:{
                        //文字颜色
                        color:'#000',
                        //字体风格,'normal','italic','oblique'
                        fontStyle:'normal',
                        //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                        fontWeight:'bold',
                        //字体系列
                        fontFamily:'sans-serif',
                        //字体大小
                　　　　 fontSize:18, 
                    }
                },
                //添加提示项
                tooltip: {
                    //显示默认项
                    trigger: "axis"
                },
                // 定义标题，实现筛选(只有一个数据选项，取消)
                // legend: {
                //     data: ["收益"]
                // },
                xAxis: {
                    data: [
                        "0:00",
                        "1:00",
                        "2:00",
                        "3:00",
                        "4:00",
                        "5:00",
                        "6:00",
                        "7:00",
                        "8:00",
                        "9:00",
                        "10:00",
                        "11:00",
                        "12:00",
                        "13:00",
                        "14:00",
                        "15:00",
                        "16:00",
                        "17:00",
                        "18:00",
                        "19:00",
                        "20:00",
                        "21:00",
                        "22:00",
                        "23:00"
                    ]
                },
                yAxis: {
                    type: "value"
                },
                //数据源
                series: [
                    {
                        name: "收益",
                        type: "line",
                        //数据长度对应上面的xAxis里的data
                        data: [
                            0.2,
                            0.3,
                            0.9,
                            0.6,
                            0.1,
                            0.9,
                            0.4,
                            0.2,
                            0.1,
                            0.4,
                            0.7,
                            0.3,
                            0.5,
                            0.9,
                            0.1,
                            0.2,
                            0.3,
                            0.1,
                            0.2,
                            0.4,
                            0.5,
                            0.1,
                            0.2,
                            0.6
                        ]
                    }
                ]
            }
        };
    },
    components: {
        RightHeader,
        RightFooter,
        "v-chart": ECharts
    },
    methods: {
        //提交日期
        postDate() {
            let startTime = this.dateRange[0].getTime();
            let endTime = this.dateRange[1].getTime();
            this.clacDateRange(startTime,endTime);
        },

        //格式化时间范围
        clacDateRange(start,end){
            this.option.xAxis.data=[];
            for(let day=start;day<=end;day+=86400000){
                let singleDay=new Date(day).toLocaleDateString();
                this.option.xAxis.data.push(singleDay);
            }
        },
        //图表在不同屏幕下自适应
        selfAdaption() {
            let that = this;
            setTimeout(() => {
                window.addEventListener("resize", function() {
                    that.$refs.myEcharts.resize();
                });
            }, 10);
        }
    },
    created() {},
    mounted() {
        //图表自适应
        this.selfAdaption();
    }
};
</script>
<style lang="css" scoped>
    #income-trend {
        width: 100%;
        height: 100%;
        position: relative;
    }
    .content-box {
        margin: 24px 16px 0px;
        overflow: hidden;
        background: #fff;
        width: calc(100vw - 232px);
        min-height: calc(100vh - 160px);
    }
    .content {
        width: calc(100vw - 232px);
        min-height: calc(100vh - 160px);
        padding: 24px;
        background: rgb(255, 255, 255);
        text-align: center;
    }
    .dateSelect {
        padding: 30px 0;
        display: flex;
        text-align: center;
        width: 320px;
        margin: 0 auto;
    }
    .postDate {
        margin-left: 40px;
    }
    .chart-box {
        width: 100%;
        height: 500px;
        margin-top: 40px;
        -webkit-tap-highlight-color: transparent;
        user-select: none;
        position: relative;
    }
</style>
