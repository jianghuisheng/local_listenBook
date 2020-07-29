<template>
    <div id="channel">
        <RightHeader :title="title"></RightHeader>
        <div class="content-box">
            <div class="content" v-loading="loading">
                <!-- 搜索框 -->
                <div class="search-box">
                    <div class="search-box-left">
                        <el-button
                            type="primary"
                            class="addChannel"
                            @click="channelAdd"
                            >新增渠道</el-button
                        >
                        <el-button
                            type="primary"
                            class="downloadData"
                            @click="download"
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
                        <el-input
                            v-model="keyword"
                            placeholder="请输入内容"
                            class="input-keyword"
                        ></el-input>
                        <el-button
                            type="primary"
                            class="submit"
                            @click="goSearch"
                            >提交</el-button
                        >
                    </div>
                </div>
                <!-- 表格数据 -->
                <div class="data-table">
                    <el-table :data="table_data">
                        <el-table-column
                            prop="id"
                            label="渠道ID"
                        ></el-table-column>
                        <el-table-column
                            prop="name"
                            label="渠道昵称"
                            width="140"
                        ></el-table-column>
                        <el-table-column
                            prop="product_name"
                            label="产品名称"
                            width="140"
                        ></el-table-column>
                        <el-table-column
                            prop="price"
                            label="价格"
                        ></el-table-column>
                        <el-table-column
                            prop="url"
                            label="推广链接"
                            width="180"
                        >
                            <template slot-scope="scope">
                                <el-button
                                    type
                                    @click="getLink(scope.$index, scope.row)"
                                    >获取链接</el-button
                                >
                                <el-button
                                    type
                                    @click="specific(scope.$index, scope.row)"
                                    >专属文案</el-button
                                >
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="skins_name"
                            label="皮肤"
                        ></el-table-column>
                        <el-table-column prop="uv" label="UV"></el-table-column>
                        <el-table-column
                            prop="click_transfer"
                            label="点击转化率"
                            width="110"
                        ></el-table-column>
                        <el-table-column
                            prop="pay_transfer"
                            label="付费转化率"
                            width="110"
                        ></el-table-column>
                        <el-table-column
                            prop="no_pay_number"
                            label="未支付人数"
                        ></el-table-column>
                        <el-table-column
                            prop="no_pay_money"
                            label="未支付金额"
                            width="120"
                        ></el-table-column>
                        <el-table-column
                            prop="pay_person"
                            label="支付人数"
                        ></el-table-column>
                        <el-table-column
                            prop="pay_money"
                            label="支付金额"
                        ></el-table-column>
                        <el-table-column
                            prop="create_time"
                            label="创建时间"
                            width="100"
                        ></el-table-column>
                        <el-table-column fixed="right" label="操作" width="190">
                            <template slot-scope="scope">
                                <el-dropdown>
                                    <el-button type style="width: 90px;"
                                        >管理
                                        <i
                                            class="el-icon-arrow-down el-icon--right"
                                            style="font-size: 12px;"
                                        ></i>
                                    </el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item
                                            @click.native="
                                                orderDetail(
                                                    scope.$index,
                                                    scope.row
                                                )
                                            "
                                            >订单详情</el-dropdown-item
                                        >
                                        <el-dropdown-item
                                            style="display: none;"
                                            @click.native="
                                                profitTrend(
                                                    scope.$index,
                                                    scope.row
                                                )
                                            "
                                            >收入趋势</el-dropdown-item
                                        >
                                    </el-dropdown-menu>
                                </el-dropdown>
                                <el-button
                                    type="primary"
                                    @click="handleEdit(scope.$index, scope.row)"
                                    style="width: 60px;"
                                    >编辑</el-button
                                >
                            </template>
                        </el-table-column>
                    </el-table>

                    <!-- 处理分页 -->
                    <el-pagination
                        style="text-align: right; margin-top: 30px;"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="current_page"
                        :page-size="pagesize"
                        :page-sizes="[5, 10, 20, 40]"
                        layout="total,sizes,prev, pager, next, jumper"
                        :total="total"
                    ></el-pagination>
                </div>
            </div>

            <!-- 获取链接的模态框 -->
            <div v-if="get_link">
                <div class="get-link-modal"></div>
                <div class="get-link-content">
                    <div class="get-link-title-box">
                        <div class="get-link-title">获取链接</div>
                    </div>
                    <div class="get-link-body">
                        <p class="specific-link">专属链接</p>
                        <div class="copy-link" style="margin-bottom: 20px;">
                            <div
                                class="input-link"
                                :data-clipboard-text="current_link"
                            >
                                <input
                                    type="text"
                                    :value="current_link"
                                    style="width: 280px;"
                                />
                            </div>
                            <el-button type="primary" class="copy-link-button">
                                <!-- v-clipboard:error="onError"复制失败时的回调函数 -->
                                <span
                                    v-clipboard:copy="current_link"
                                    v-clipboard:success="onCopy"
                                    >复制链接</span
                                >
                            </el-button>
                        </div>

                        <div style="display: flex;">
                            <div style="flex: 1 1 0%;">
                                <p class="specific-link">
                                    专属二维码（鼠标右键复制）
                                </p>
                                <img
                                    :src="qr_code"
                                    alt
                                    style="
                                        width: 180px;
                                        box-shadow: rgba(0, 0, 0, 0.2) 0px 2px
                                            8px 0px;
                                    "
                                />
                            </div>
                            <div style="flex: 1 1 0%; display: block;">
                                <p class="specific-link">
                                    GIF素材图（鼠标右键复制）
                                </p>
                                <img
                                    :src="cover"
                                    alt=""
                                    style="
                                        width: 180px;
                                        box-shadow: rgba(0, 0, 0, 0.3) 0px 2px
                                            8px 0px;
                                    "
                                />
                            </div>
                        </div>
                    </div>
                    <br />
                    <div class="knowBox">
                        <el-button
                            type="primary"
                            class="copy-link-know"
                            @click="hasKnow"
                        >
                            <span>我知道了</span>
                        </el-button>
                    </div>
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
    name: "channel",
    data() {
        return {
            //导航名称
            title: "渠道管理",
            //加载动画
            loading: false,
            //时间选择范围
            date_range: "",
            //搜索关键字
            keyword: "",

            //默认数据总数
            total: 1,
            //每页的数据条数
            pagesize: 5,
            //默认开始页面
            current_page: 1,

            //后端请求数据
            table_data: [],
            //打开获取链接模态框
            get_link: false,
            //当前要获取的链接
            current_link: "",
            //当前要获取的二唯码
            qr_code: "",
            //当前渠道模态框封面图
            cover: "",
        };
    },

    components: {
        RightHeader,
        RightFooter,
    },
    mounted() {
        // 模拟数据
        this.table_data = mockData.table_data;
        // this.getChannelData(
        //     this.pagesize,
        //     this.current_page,
        //     this.date_range,
        //     this.keyword,
        //     0
        // );
    },
    methods: {
        //获取数据
        getChannelData(pagesize, current_page, date_range, keyword, download) {
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
            parmas.append("uid", uid);
            parmas.append("token", token);
            parmas.append("limit", pagesize);
            parmas.append("page", current_page);
            parmas.append("start_time", start_time);
            parmas.append("end_time", end_time);
            parmas.append("keyword", keyword);

            //请求数据
            if (!download) {
                this.$axios
                    .post(this.$src + "/admin/channel/channel_list", parmas)
                    .then((result) => {
                        if (result.data.code == "200") {
                            this.total = result.data.data.total;
                            this.current_page = parseInt(
                                result.data.data.currentPage
                            );
                            this.table_data = result.data.data.data;
                            this.loading = false;
                        } else {
                            this.$message.error(result.data.message);
                            if (result.data.code == "250") {
                                this.$router.push("/login");
                            }
                        }
                    });
                //下载数据
            } else {
                window.location.href =
                    this.$src +
                    "/admin/channel/channel_excel?" +
                    parmas.toString();
            }
        },
        //新增渠道
        channelAdd() {
            this.$router.push("/home/channel_add");
        },
        //下载数据
        download() {
            this.getChannelData(
                this.pagesize,
                this.current_page,
                this.date_range,
                this.keyword,
                1
            );
        },
        //提交搜索
        goSearch() {
            this.getChannelData(
                this.pagesize,
                this.current_page,
                this.date_range,
                this.keyword
            );
        },
        //获取链接
        getLink(index, row) {
            this.get_link = true;
            this.current_link = row.url;
            let src =
                "http://tool.oschina.net/action/qrcode/generate?data=" +
                row.url +
                "&output=image%2Fjpeg&error=L&type=10&margin=6&size=4&__Random-String__";
            this.qr_code = src;
            this.cover = row.cover;
        },
        //复制链接
        onCopy() {
            this.$message({
                message: "复制链接成功",
                type: "success",
            });
        },
        //我知道了
        hasKnow() {
            this.get_link = false;
        },

        //专属文案
        specific(index, row) {
            //传递关联的文章id
            let article_list = row.article_list;
            this.$router.push("/home/material?article_list=" + article_list);
        },

        //订单详情
        orderDetail(index, row) {
            let channel_id = row.id;
            this.$router.push("/home/order?channel_id=" + channel_id);
        },
        //收入趋势
        profitTrend(index, row) {
            let channel_id = row.id;
            this.$router.push("/home/income-trend?id=" + channel_id);
        },

        //表格编辑
        handleEdit(index, row) {
            let id = row.id;
            let name = row.name;
            this.$prompt("渠道名称", "编辑渠道", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputValue: name,
            }).then(({ value }) => {
                let uid = localStorage.getItem("uid");
                let token = localStorage.getItem("token");
                if (!uid || !token) {
                    this.$router.push("/login");
                }
                let parmas = new URLSearchParams();
                parmas.append("uid", uid);
                parmas.append("token", token);
                parmas.append("id", id);
                parmas.append("channel_name", value);

                this.$axios
                    .post(this.$src + "/admin/channel/channel_edit", parmas)
                    .then((result) => {
                        if (result.data.code == "200") {
                            this.getChannelData(
                                this.pagesize,
                                this.current_page,
                                this.date_range,
                                this.keyword
                            );
                            this.$message.success("修改渠道成功!");
                        } else {
                            this.$message.error(result.data.message);
                            if (result.data.code == "250") {
                                this.$router.push("/login");
                            }
                        }
                    });
            });
        },

        //每页显示几条数据
        handleSizeChange: function (pagesize) {
            this.pagesize = pagesize;
            this.getChannelData(
                pagesize,
                this.current_page,
                this.date_range,
                this.keyword
            );
        },

        //点击第几页
        handleCurrentChange: function (current_page) {
            this.current_page = current_page;
            this.getChannelData(
                this.pagesize,
                current_page,
                this.date_range,
                this.keyword
            );
        },
    },
};
</script>

<style lang="css" scoped>
#channel {
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

.search-box {
    position: relative;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
}
.search-box-left {
    width: 225px;
    display: flex;
    justify-content: flex-start;
}
.addChannel {
    margin-right: 15px;
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
    min-width: 90px !important;
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
.get-link-modal {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: #000;
    opacity: 0.7;
    z-index: 200;
}
.get-link-content {
    width: 480px;
    height: 480px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -240px;
    margin-top: -240px;
    z-index: 201;
    background: #fff;
    border-radius: 4px;
}
.get-link-title-box {
    padding: 16px 24px;
    border-radius: 4px 4px 0 0;
    background: #fff;
    color: rgba(0, 0, 0, 0.65);
    border-bottom: 1px solid #e8e8e8;
}

.get-link-title {
    margin: 0;
    font-size: 16px;
    line-height: 22px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
}

.get-link-body {
    padding: 24px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;
}

.specific-link {
    padding-left: 5px;
    margin-top: 0;
    margin-bottom: 1em;
}
.copy-link {
    position: relative;
    margin-left: 0;
    margin-right: 0;
    height: auto;
    zoom: 1;
    display: block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: 20px;
    display: flex;
}

.input-link {
    display: block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 62.5%;
}

.input-link input {
    width: 280px;
    font-family: Chinese Quote, -apple-system, BlinkMacSystemFont, Segoe UI,
        PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue,
        Helvetica, Arial, sans-serif;
    font-variant: tabular-nums;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
    position: relative;
    display: inline-block;
    padding: 4px 10px;
    width: 100%;
    height: 32px;
    font-size: 14px;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.65);
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    outline: none;
}

.copy-link-button {
    position: relative;
    left: 50px;
    height: 32px;
}

.knowBox {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}
.copy-link-know {
    position: relative;
    left: 343px;
    height: 32px;
}
</style>
