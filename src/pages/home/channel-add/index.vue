<template>
    <div id="channel-add">
        <RightHeader :title="title"></RightHeader>
        <div class="content-box">
            <div class="content">
                <!-- 主体内容 -->
                <div class="add-source-page" style="display: flex;">
                    <!-- 选择部分 -->
                    <div class="form-left" style="width: 400px; margin: 30px;">
                        <div style="display: flex; align-items: center;">
                            <label style="width: 100px; text-align: left;"
                                >渠道名称</label
                            >
                            <el-input
                                v-model="channel_name"
                                placeholder="请输入内容"
                            ></el-input>
                        </div>
                        <div
                            style="
                                margin-top: 20px;
                                display: flex;
                                align-items: center;
                            "
                        >
                            <label style="width: 78px; text-align: left;"
                                >商品</label
                            >
                            <el-select
                                v-model="book_index"
                                style="width: 200px;"
                                placeholder="请选择"
                                @change="selectBook"
                            >
                                <el-option
                                    v-for="(item, book_index) in book_data"
                                    :key="item.product_id"
                                    :label="item.product_name"
                                    :value="book_index"
                                    style="
                                        width: 200px;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        white-space: nowrap;
                                    "
                                ></el-option>
                            </el-select>
                        </div>

                        <div
                            style="
                                margin-top: 20px;
                                display: flex;
                                align-items: center;
                            "
                        >
                            <label style="width: 78px; text-align: left;"
                                >皮肤</label
                            >
                            <el-select
                                v-model="skin_index"
                                style="width: 200px;"
                                placeholder="请选择"
                                @change="selectSkin"
                            >
                                <el-option
                                    v-for="(item, skin_index) in skin_array"
                                    :key="item.skin_id"
                                    :label="item.skin_title"
                                    :value="skin_index"
                                    style="
                                        width: 200px;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        white-space: nowrap;
                                    "
                                ></el-option>
                            </el-select>
                        </div>

                        <el-button
                            type="primary"
                            style="margin-top: 30px;"
                            @click="sendSkin"
                            >提交</el-button
                        >
                    </div>
                    <!-- 显示部分 -->
                    <div class="show-skin">
                        <p
                            style="
                                font-size: 16px;
                                font-weight: 600;
                                margin-bottom: 1rem;
                            "
                        >
                            {{ current_skin.skin_title }}
                        </p>
                        <p>{{ current_skin.skin_reason }}</p>
                        <div
                            class="scroll-wrap"
                            style="
                                overflow: auto;
                                height: 500px;
                                position: relative;
                            "
                        >
                            <img
                                :src="current_skin.skin_img"
                                alt
                                style="width: 100%;"
                            />
                        </div>
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
import { setTimeout } from "timers";

export default {
    name: "channel-add",
    data() {
        return {
            title: "加入推广",
            //输入渠道名称
            channel_name: "",
            //所选书本的id
            product_id: "",
            //所选皮肤id
            skin_id: "",
            //选择书本下标
            book_index: "",
            //选择皮肤下标
            skin_index: "",
            //当前皮肤
            current_skin: {},
            //当前渲染皮肤数组
            skin_array: [],
            //当前请求所有的数据
            book_data: [],
        };
    },

    mounted() {
        // 模拟皮肤数据
        // this.book_data=mockData.book_data;
        // this.getCurrentSkin(0,0);

        // 请求皮肤数据
        this.getSkinData();
    },
    methods: {
        //获取当前皮肤
        getSkinData() {
            let uid = localStorage.getItem("uid");
            let token = localStorage.getItem("token");
            if (!uid || !token) {
                this.$router.push("/login");
            }

            let parmas = new URLSearchParams();
            parmas.append("uid", uid);
            parmas.append("token", token);

            this.$axios
                .post(this.$src + "/admin/channel/channel_index", parmas)
                .then((result) => {
                    if (result.data.code == "200") {
                        this.book_data = result.data.data;
                        //获取跳转的参数
                        let product_id = this.$route.query.product_id;
                        if (!product_id) {
                            this.book_index = 0;
                            this.skin_index = 0;
                            //计算默认显示的皮肤
                            this.getCurrentSkin(
                                this.book_index,
                                this.skin_index
                            );
                        } else {
                            //计算跳转指定的皮肤
                            this.getJumpSkin(product_id);
                        }
                        this.loading = false;
                    } else {
                        this.$message.error(result.data.message);
                    }
                });
        },

        //选择书本
        selectBook() {
            this.skin_index = 0;
            this.getCurrentSkin(this.book_index, 0);
        },
        //选择皮肤
        selectSkin() {
            this.getCurrentSkin(this.book_index, this.skin_index);
        },
        //计算当前默认显示的皮肤
        getCurrentSkin(book_index, skin_index) {
            //当前商品(默认第一个)
            let book_obj = this.book_data[book_index];
            let skin_array = book_obj.skin;
            //当前商品id
            this.product_id = book_obj.product_id;
            //当前皮肤数组
            this.skin_array = skin_array;
            //当前皮肤(默认第一个)
            this.current_skin = skin_array[skin_index];
            //当前皮肤id
            this.skin_id = this.current_skin.skin_id;
        },

        //计算跳转指定的皮肤
        getJumpSkin(product_id) {
            let data = this.book_data;
            for (let i = 0; i < data.length; i++) {
                if (data[i].product_id == product_id) {
                    //当前商品
                    let book_obj = data[i];
                    //当前商品所对应的皮肤数组
                    let skin_array = book_obj.skin;
                    //当前商品在数组中所对应的下标
                    this.book_index = i;
                    //当前皮肤在皮肤数组中所对应的下标
                    this.skin_index = 0;
                    //当前商品id
                    this.product_id = data[i].product_id;
                    //当前商品所对应的皮肤数组
                    this.skin_array = skin_array;
                    //当前皮肤(默认第一个)
                    this.current_skin = skin_array[0];
                    //当前皮肤id
                    this.skin_id = this.current_skin.skin_id;
                }
            }
        },

        //提交新增的渠道
        sendSkin() {
            let uid = localStorage.getItem("uid");
            let token = localStorage.getItem("token");
            if (!uid || !token) {
                this.$router.push("/login");
            }

            if (this.channel_name == "") {
                this.$message.error("请输入渠道名称");
            } else {
                let parmas = new URLSearchParams();
                parmas.append("uid", uid);
                parmas.append("token", token);
                parmas.append("channel_name", this.channel_name);
                parmas.append("product_id", this.product_id);
                parmas.append("skin_id", this.skin_id);

                this.$axios
                    .post(this.$src + "/admin/channel/channel_edit", parmas)
                    .then((result) => {
                        if (result.data.code == "200") {
                            this.$message.success("新增渠道成功!");
                            this.channel_name = "";
                        } else {
                            this.$message.error("新增渠道失败!");
                            if (result.data.code == "250") {
                                this.$router.push("/login");
                            }
                        }
                    });
            }
        },
    },
    components: {
        RightHeader,
        RightFooter,
    },
};
</script>
<style lang="css" scoped>
#channel-add {
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

.show-skin {
    width: 400px;
    margin-left: 100px;
    margin-top: 30px;
    border: 1px solid rgb(221, 221, 221);
    border-radius: 27px;
    text-align: left;
    padding: 30px;
}
</style>
