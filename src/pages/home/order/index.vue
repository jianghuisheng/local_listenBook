<template>
    <div id="order">
        <RightHeader :title="title"></RightHeader>
        <div class="content-box">
            <div class="content" v-loading="loading">
                <div class="total">
                    <el-row>
                        <el-col :span="5">
                            <div>
                                <div>{{ pay_data.pay_total }}</div>
                                支付总金额
                            </div>
                        </el-col>
                        <el-col :span="5">
                            <div>
                                <div>{{ pay_data.no_total }}</div>
                                未支付总金额
                            </div>
                        </el-col>
                        <el-col :span="4">
                            <div>
                                <div>{{ pay_data.back_total }}</div>
                                退款总额
                            </div>
                        </el-col>
                        <el-col :span="5">
                            <div>
                                <div>{{ pay_data.channel_before }}</div>
                                分成前渠道收入
                            </div>
                        </el-col>
                        <el-col :span="5">
                            <div>
                                <div>{{ pay_data.channel_after }}</div>
                                分成后渠道收入
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <!-- 查询层 -->
                <div class="search-box">
                    <div class="search-box-left">
                        <el-button
                            type="primary"
                            class="downloadData"
                            @click="download()"
                            >下载数据</el-button
                        >
                    </div>
                    <div class="search-box-right">
                        <span class="date-select">
                            <el-date-picker
                                v-model="date_range"
                                type="daterange"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                            ></el-date-picker>
                        </span>

                        <el-select
                            v-model="status"
                            style="width: 150px;"
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                        <el-button
                            type="primary"
                            class="submit"
                            @click="goSearch()"
                            >提交</el-button
                        >
                    </div>
                </div>

                <!-- 表格数据 -->
                <div class="data-table">
                    <el-table
                        class="art_material"
                        :data="table_data"
                        style="width: 100%; border-bottom: 1px solid #eee;"
                    >
                        <el-table-column
                            label="订单ID"
                            prop="order_id"
                        ></el-table-column>
                        <el-table-column
                            label="渠道昵称"
                            prop="ditch_name"
                        ></el-table-column>
                        <el-table-column label="头像" prop="head_img">
                            <!-- 图片显示 -->
                            <template slot-scope="scope">
                                <img
                                    :src="scope.row.head_img"
                                    width="40px"
                                    class="head_pic"
                                />
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="用户名"
                            prop="user_name"
                        ></el-table-column>
                        <el-table-column
                            label="产品名称"
                            prop="product_name"
                        ></el-table-column>
                        <el-table-column label="订单状态" prop="order_status">
                            <template slot-scope="scope">
                                <span v-if="scope.row.order_status == 0"
                                    >未支付</span
                                >
                                <span v-if="scope.row.order_status == 1"
                                    >已支付</span
                                >
                                <span v-if="scope.row.order_status == 2"
                                    >已退款</span
                                >
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="支付金额"
                            prop="pay_count"
                        ></el-table-column>
                        <el-table-column
                            label="支付时间"
                            prop="pay_time"
                        ></el-table-column>
                    </el-table>

                    <!-- 处理分页 -->
                    <el-pagination
                        style="text-align: right; margin-top: 30px;"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="current_page"
                        :page-sizes="[5, 10, 20, 40]"
                        :page-size="pagesize"
                        layout="total,sizes,prev, pager, next, jumper"
                        :total="total"
                    ></el-pagination>
                </div>
            </div>
        </div>
        <RightFooter></RightFooter>
    </div>
</template>
<script>
import RightHeader from "../../../public/right-header/index";
import RightFooter from "../../../public/right-footer/index";
import mockData from "./data.js";

export default {
    name: "order",
    data() {
        return {
            title: "订单详情",

            //加载动画
            loading: false,

            // 支付数据
            pay_data: {},

            //时间选择范围
            date_range: "",

            //下拉菜单选择
            options: [
                {
                    value: "9",
                    label: "全部",
                },

                {
                    value: "1",
                    label: "已支付",
                },

                {
                    value: "0",
                    label: "未支付",
                },

                {
                    value: "2",
                    label: "已退款",
                },
            ],
            //当前选择的支付状态
            status: "9",

            //表格数据
            table_data: [],

            //默认数据总数
            total: 0,
            //每页的数据条数
            pagesize: 5,
            //默认开始页面
            current_page: 1,
        };
    },

    mounted() {
        // 模拟数据
        this.pay_data = mockData.pay_data;
        this.table_data = mockData.table_data;

        //获取收入概况数据
        // this.getMoneyData();
        //获取订单数据
        // this.getOrderData(
        //     this.pagesize,
        //     this.current_page,
        //     this.status,
        //     this.date_range,
        //     0
        // );
    },

    methods: {
        //请求收入概况
        getMoneyData() {
            let uid = localStorage.getItem("uid");
            let token = localStorage.getItem("token");
            if (!uid || !token) {
                this.$router.push("/login");
            }

            let parmas = new URLSearchParams();
            parmas.append("uid", uid);
            parmas.append("token", token);
            this.$axios
                .post(this.$src + "/admin/orderdata/order_count", parmas)
                .then((result) => {
                    if (result.data.code == "200") {
                        this.pay_data = result.data.data;
                    } else {
                        this.$message.error(result.data.message);
                        if (result.data.code == "250") {
                            this.$router.push("/login");
                        }
                    }
                });
        },

        //请求订单数据
        getOrderData(pagesize, current_page, status, date_range, download) {
            //如果不是下载数据
            if (!download) {
                this.loading = true;
            }

            let start_time;
            let end_time;
            //判断时间范围是否有选或者是否清除了时间
            if (
                date_range == "" ||
                date_range[0] == null ||
                date_range[1] == null
            ) {
                start_time = "";
                end_time = "";
            } else {
                start_time = date_range[0].toLocaleDateString();
                end_time = date_range[1].toLocaleDateString();
            }
            //验证登录
            let uid = localStorage.getItem("uid");
            let token = localStorage.getItem("token");
            if (!uid || !token) {
                this.$router.push("/login");
            }
            let parmas = new URLSearchParams();
            parmas.append("limit", pagesize);
            parmas.append("page", current_page);
            parmas.append("status", status);
            parmas.append("start_time", start_time);
            parmas.append("end_time", end_time);
            parmas.append("uid", uid);
            parmas.append("token", token);
            //获取从渠道列表跳转过来的传参
            let channel_id = this.$route.query.channel_id;
            if (channel_id) {
                parmas.append("channel_id", channel_id);
            }
            //请求数据
            if (!download) {
                this.$axios
                    .post(this.$src + "/admin/orderdata/order_list", parmas)
                    .then((result) => {
                        if (result.data.code == "200") {
                            this.table_data = result.data.data.data;
                            this.current_page = parseInt(
                                result.data.data.currentPage
                            );
                            this.total = result.data.data.total;
                            this.loading = false;
                        } else {
                            this.$message.error(result.data.message);
                            if (result.data.code == "250") {
                                // this.$router.push("/login");
                            }
                        }
                    });
                //下载数据
            } else {
                window.location.href =
                    this.$src +
                    "/admin/orderdata/order_excel?" +
                    parmas.toString();
            }
        },

        //下载数据
        download() {
            this.getOrderData(
                this.pagesize,
                this.current_page,
                this.status,
                this.date_range,
                1
            );
        },

        //查询数据
        goSearch() {
            this.getOrderData(
                this.pagesize,
                this.current_page,
                this.status,
                this.date_range
            );
        },

        //每页显示几条数据
        handleSizeChange(size) {
            this.pagesize = size;
            this.getOrderData(
                size,
                this.current_page,
                this.status,
                this.date_range
            );
        },

        //点击第几页
        handleCurrentChange(current_page) {
            this.current_page = current_page;
            this.getOrderData(
                this.pagesize,
                current_page,
                this.status,
                this.date_range
            );
        },
    },
    components: {
        RightHeader,
        RightFooter,
    },
};
</script>
<style lang="css" scoped>
#order {
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
    width: calc(100vw - 280px);
    min-height: calc(100vh - 208px);
    padding: 24px;
    background: rgb(255, 255, 255);
    text-align: center;
}

.search-box {
    position: relative;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
}

.search-box-left {
    width: 88px;
}

.downloadData {
    margin-left: 0;
}
.search-box-right {
    flex: 1 1 0%;
    display: flex;
    justify-content: flex-end;
}

.date-select {
    display: inline-block;
    margin-right: 15px;
}
.input-keyword {
    width: 200px;
}

.submit {
    margin-left: 15px;
}

.el-dropdown-menu {
    min-width: 100px !important;
    top: 270px !important;
}
.table-theader {
    background-color: #fff;
}

.table-tr {
    background-color: #fff;
}
.table-td {
    background-color: #fff;
}
.block-col-2 {
    display: flex;
    align-items: center;
    border: 1.4px solid #bfcbd9;
    border-radius: 4px;
    position: relative;
    cursor: pointer;
}
.el-icon--right {
    margin-left: 35px;
    color: #ddd;
}
/* total统计 */
.total {
    margin-bottom: 20px;
    padding: 30px 0px;
}
.el-col {
    border-radius: 4px;
    border-right: 1px solid rgb(238, 238, 238);
}
.el-col:last-child {
    border-right: none;
}
</style>
