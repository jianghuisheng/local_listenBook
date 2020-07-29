<template>
    <div id="product">
        <!-- 头部 -->
        <RightHeader :title="title"></RightHeader>
        <!-- 内容区域 -->
        <div class="content-box">
            <div class="content" v-loading="loading">
                <div class="content-flex">
                    <div
                        class="content-item"
                        v-for="item in product_list"
                        :key="item.id"
                    >
                        <div>
                            <img
                                :src="item.product_cover"
                                alt=""
                                class="cover-img"
                            />
                            <div class="title-box">
                                <img
                                    v-if="item.is_new"
                                    src="https://daka666-1253442168.file.myqcloud.com/college_pro_media/tool/files/20181009_180813_new1.png"
                                    alt=""
                                    class="new"
                                />
                                <img
                                    v-if="item.is_hot"
                                    src="https://daka666-1253442168.file.myqcloud.com/college_pro_media/tool/files/20181009_181647_hot1.png"
                                    alt=""
                                    class="hot"
                                />
                                {{ item.product_name }}
                            </div>
                            <p class="item-info">
                                单价：￥{{ item.product_price.toFixed(2) }}
                            </p>
                            <p class="item-info">
                                分成：{{ item.product_welfare }}%
                            </p>
                            <p class="item-info">
                                万粉收益：￥{{
                                    item.product_fans_profit.toFixed(2)
                                }}
                            </p>
                            <p class="item-info">
                                ARPU值：￥{{ item.product_arpu.toFixed(2) }}
                            </p>
                        </div>
                        <el-button
                            type="primary"
                            class="recommend"
                            @click="addRecommend(item.product_id)"
                            >加入推广</el-button
                        >
                    </div>
                </div>
            </div>
        </div>
        <!-- 底部区域 -->
        <RightFooter></RightFooter>
    </div>
</template>

<script>
import RightHeader from "../../../public/right-header/index";
import RightFooter from "../../../public/right-footer/index";
import mockData from "./data.js";

export default {
    name: "product",
    data() {
        return {
            title: "商品管理",
            //加载动画
            loading: false,
            //商品列表
            product_list: [],
        };
    },
    components: {
        RightHeader,
        RightFooter,
    },

    methods: {
        // 获取商品数据
        getProductData() {
            // v-loading="loading"
            this.loading = true;
            // 验证
            let uid = localStorage.getItem("uid");
            let token = localStorage.getItem("token");
            if (!uid || !token) {
                this.$router.push("/login");
            }

            // 参数必需通过此方法添加
            let parmas = new URLSearchParams();
            parmas.append("uid", uid);
            parmas.append("token", token);

            this.$axios
                .post(this.$src + "/admin/popularize/product", parmas)
                .then((result) => {
                    if (result.data.code == "200") {
                        this.product_list = result.data.data;
                        this.loading = false;
                    } else {
                        this.$message.error(result.data.message);
                        if (result.data.code == "250") {
                            this.$router.push("/login");
                        }
                    }
                });
        },

        //加入推广
        addRecommend(product_id) {
            this.$router.push("/home/channel_add?product_id=" + product_id);
        },
    },
    mounted() {
        //模拟数据
        this.product_list = mockData.product_list;
        // this.getProductData();
    },
};
</script>

<style lang="css" scoped>
#product {
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
}
.content-flex {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.content-item {
    flex-direction: column;
    display: flex;
    justify-content: space-between;
    margin: 20px;
    border-radius: 5px;
    width: 250px;
    box-shadow: rgb(154, 154, 154) 0px 2px 46px -14px;
}
.cover-img {
    width: 100%;
    border-radius: 5px 5px 0px 0px;
}
.title-box {
    font-size: 18px;
    text-align: left;
    padding-left: 20px;
    margin-top: 10px;
    font-weight: 600;
    padding-bottom: 10px;
}
.new {
    width: 30px;
}
.hot {
    width: 20px;
}
.item-info {
    text-align: left;
    padding-left: 20px;
    margin-top: 0;
    margin-bottom: 1em;
}
.recommend {
    margin: 0px auto 16px;
    width: 86px;
}
</style>
