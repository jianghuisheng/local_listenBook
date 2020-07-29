<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: "app",
    data() {
        return {};
    },
    created() {},
    mounted() {},
};
</script>
<style>
/* 引入全局文件 */
@import "./style.css";

#app {
    height: 100%;
    width: 100%;
}
</style>
