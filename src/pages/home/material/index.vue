<template>
    <div id="material">
        <RightHeader :title="title"></RightHeader>
        <div class="content-box">
            <div class="content" v-loading="loading">
                <el-tabs v-model="active_name" @tab-click="handleClick">
                    <el-tab-pane label="文案素材" name="1">
                        <el-table
                            class="art_material"
                            :data="table_data"
                            style="width: 100%; border-bottom: 1px solid #eee;"
                        >
                            <el-table-column label="封面图">
                                <template slot-scope="scope">
                                    <img
                                        :src="scope.row.cover"
                                        height="60px"
                                        class="head_pic"
                                    />
                                </template>
                            </el-table-column>
                            <el-table-column label="文章">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.is_new == 0"></span>
                                    <span v-if="scope.row.is_new == 1">
                                        <img
                                            src="./image/new.png"
                                            alt=""
                                            class="new"
                                            style="width: 30px;"
                                        />
                                    </span>
                                    <span v-if="scope.row.is_hot == 0"></span>
                                    <span v-if="scope.row.is_hot == 1">
                                        <img
                                            src="./image/hot.png"
                                            alt=""
                                            class="hot"
                                            style="width: 20px;"
                                        />
                                    </span>
                                    {{ scope.row.article }}
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="对应商品"
                                prop="product_name"
                            ></el-table-column>
                            <el-table-column label="对应皮肤">
                                <!-- 字体变红色 -->
                                <template slot-scope="scope">
                                    <span
                                        style="color: red;"
                                        v-if="scope.row.skin"
                                        >{{ scope.row.skin }}</span
                                    >
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="推荐理由"
                                prop="reason"
                            ></el-table-column>

                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button
                                        type="primary"
                                        @click="seeArticle(scope.row.href)"
                                    >
                                        查看文章
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                        <!-- 处理分页 -->
                        <el-pagination
                            style="text-align: right; margin-top: 30px;"
                            layout="total,sizes,prev, pager, next"
                            :page-sizes="[5, 10, 20, 40]"
                            :page-size="pagesize"
                            @size-change="handleSizeChange"
                            @current-change="currentChange"
                            :total="total"
                            background
                        ></el-pagination>
                    </el-tab-pane>

                    <el-tab-pane label="图片素材" name="2">
                        <div class="ele-row-flex">
                            <div
                                class="img-wrapper"
                                v-for="item in pictures"
                                :key="item.id"
                                @mouseenter="addActive(item.id)"
                                @mouseleave="removeActive(item.id)"
                            >
                                <div>
                                    <div class="img-show">
                                        <img
                                            style="width: 100%; height: 100%;"
                                            :src="item.url"
                                            al=""
                                        />
                                    </div>
                                    <p class="img-des">
                                        {{
                                            item.name +
                                            "(" +
                                            item.width +
                                            "*" +
                                            item.height +
                                            ")"
                                        }}
                                    </p>
                                </div>

                                <!-- 判断svg图是否显示 -->
                                <div
                                    :class="
                                        item.id == show_id
                                            ? 'svg-show'
                                            : 'svg-hidden'
                                    "
                                >
                                    <div>
                                        <el-button
                                            type="primary"
                                            @click="downloadPicture(item.url)"
                                            >下载图片</el-button
                                        >
                                    </div>
                                    <div
                                        style="
                                            color: rgb(0, 0, 0);
                                            position: absolute;
                                            top: 4px;
                                            right: 6px;
                                        "
                                    >
                                        <i
                                            class="anticon anticon-fullscreen"
                                            style="
                                                color: rgb(255, 255, 255);
                                                font-size: 18px;
                                            "
                                        >
                                            <svg
                                                viewBox="64 64 896 896"
                                                class
                                                data-icon="fullscreen"
                                                width="1em"
                                                height="1em"
                                                fill="currentColor"
                                                aria-hidden="true"
                                                @click="clickActive(item.url)"
                                            >
                                                <path
                                                    d="M290 236.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L169 160c-5.1-.6-9.5 3.7-8.9 8.9L179 329.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zm352.7 187.3c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6 43.7 43.7a8.01 8.01 0 0 0 13.6-4.7L863.9 169c.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370a8.03 8.03 0 0 0 0 11.3l42.4 42.4zM845 694.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L734 787.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L855 864c5.1.6 9.5-3.7 8.9-8.9L845 694.9zm-463.7-94.6a8.03 8.03 0 0 0-11.3 0L236.3 733.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L160.1 855c-.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-.8 9.4-8.9 4.7-13.6L290 787.6 423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z"
                                                ></path>
                                            </svg>
                                        </i>
                                    </div>
                                </div>

                                <!-- 模态框弹出对应大图 -->
                                <el-dialog
                                    :visible.sync="dialog_visible"
                                    width="25%"
                                    :show-close="show_close"
                                >
                                    <div>
                                        <img
                                            :src="click_cover"
                                            style="width: 100%;"
                                        />
                                    </div>
                                </el-dialog>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
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
    name: "material",
    data() {
        return {
            title: "推广素材",
            //加载动画
            loading: false,
            //当前激活菜单
            active_name: "1",
            //默认数据总数
            total: 0,
            //每页的数据条数
            pagesize: 5,
            //默认开始页面
            current_page: 1,
            //文章数据
            table_data: [],
            //图片素材
            pictures: [],
            //鼠标移入时图片ID,
            show_id: "",
            //模态框展示开关按钮
            dialog_visible: false,
            //模态框关闭按钮
            show_close: false,
            //模态框需要展示的图片
            click_cover: "",
        };
    },

    mounted() {
        // 模拟数据
        this.table_data = mockData.table_data;
        this.pictures = mockData.pictures;
        // this.getArticleData(this.pagesize, this.current_page);
        // this.getPictureMaterial();
    },
    methods: {
        //获取文章素材(要加分页)
        getArticleData(pagesize, current_page) {
            this.loading = true;

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

            //获取渠道管理跳转过来的ID
            let article_list = this.$route.query.article_list;
            if (article_list) {
                parmas.append("article_list", article_list);
            }

            this.$axios
                .post(this.$src + "/admin/popularize/popularize", parmas)
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
        },
        //获取图片素材
        getPictureMaterial() {
            let uid = localStorage.getItem("uid");
            let token = localStorage.getItem("token");
            if (!uid || !token) {
                this.$router.push("/login");
            }
            let parmas = new URLSearchParams();
            parmas.append("uid", uid);
            parmas.append("token", token);

            this.$axios
                .post(this.$src + "/admin/popularize/picture", parmas)
                .then((result) => {
                    if (result.data.code == "200") {
                        this.pictures = result.data.data;
                    } else {
                        this.$message.error(result.data.message);
                        if (result.data.code == "250") {
                            this.$router.push("/login");
                        }
                    }
                });
        },
        //点击切换标签
        handleClick() {},

        //查看文章
        seeArticle(src) {
            if (src) {
                window.open(src);
            } else if (src == "#") {
                this.$message.error("当前链接提供不正常");
            } else {
                this.$message.error("当前文章暂无链接");
            }
        },

        //点击第几页
        currentChange(current_page) {
            this.current_page = current_page;
            this.getArticleData(this.pagesize, current_page);
        },

        //每页显示几条数据
        handleSizeChange(pagesize) {
            this.pagesize = pagesize;
            this.getArticleData(pagesize, this.current_page);
        },
        //图片素材鼠标进入时
        addActive(id) {
            this.show_id = id;
        },
        //图片素材鼠标移出时
        removeActive(id) {
            this.show_id = "";
        },
        //图片素材点击查看大图
        clickActive(url) {
            this.dialog_visible = true;
            this.click_cover = url;
        },
        //点击下载图片
        downloadPicture(imgSrc) {
            window.location.href = this.$downloadUrl + imgSrc;
        },
    },
    components: {
        RightHeader,
        RightFooter,
    },
};
</script>

<style lang="css" scoped>
#material {
    width: 100%;
    height: 100%;
    position: relative;
}
.content {
    width: calc(100vw - 232px);
    min-height: calc(100vh - 160px);
    padding: 24px;
    background: rgb(255, 255, 255);
}
.content-box {
    margin: 24px 16px 0px;
    overflow: hidden;
    background: #fff;
    width: calc(100vw - 232px);
    min-height: calc(100vh - 160px);
}

.ele-row-flex {
    display: flex;
    flex-flow: wrap;
}

.img-wrapper {
    margin: 20px;
    border-radius: 5px;
    width: 250px;
    box-shadow: rgb(154, 154, 154) 0px 2px 46px -14px;
    position: relative;
}

.img-des {
    margin-bottom: 0px;
    padding: 5px 0px;
}

.img-show {
    width: 100%;
    height: 120px;
}

.svg-show {
    display: block;
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(154, 154, 154, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
}

.svg-hidden {
    display: none;
}

.el-dialog--small {
    width: 15% !important;
}
</style>
