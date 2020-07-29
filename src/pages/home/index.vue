<template>
    <div id="home">
        <el-row class="row">
            <el-col  class="col-left" style="width:200px;">
                
                <div class="logo">
                    <img src="https://staticqc.xiaoxiafm.com/pc/image/logo.c289aee8306c2a35f17631caf62572de.jpg" alt="">听书宝
                </div>

                <el-menu :default-active="$route.path" style="background-color:#001529" router>
                    <el-menu-item index="/home/product">
                        <i class="icon">
                            <svg viewBox="0 0 1024 1024"  data-icon="inbox" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                <path d="M885.2 446.3l-.2-.8-112.2-285.1c-5-16.1-19.9-27.2-36.8-27.2H281.2c-17 0-32.1 11.3-36.9 27.6L139.4 443l-.3.7-.2.8c-1.3 4.9-1.7 9.9-1 14.8-.1 1.6-.2 3.2-.2 4.8V830a60.9 60.9 0 0 0 60.8 60.8h627.2c33.5 0 60.8-27.3 60.9-60.8V464.1c0-1.3 0-2.6-.1-3.7.4-4.9 0-9.6-1.3-14.1zm-295.8-43l-.3 15.7c-.8 44.9-31.8 75.1-77.1 75.1-22.1 0-41.1-7.1-54.8-20.6S436 441.2 435.6 419l-.3-15.7H229.5L309 210h399.2l81.7 193.3H589.4zm-375 76.8h157.3c24.3 57.1 76 90.8 140.4 90.8 33.7 0 65-9.4 90.3-27.2 22.2-15.6 39.5-37.4 50.7-63.6h156.5V814H214.4V480.1z"></path>
                            </svg>
                        </i>
                        商品管理
                    </el-menu-item>

                    <el-menu-item index="/home/material">
                        <i class="icon">
                            <svg viewBox="64 64 896 896" class="" data-icon="switcher" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M752 240H144c-17.7 0-32 14.3-32 32v608c0 17.7 14.3 32 32 32h608c17.7 0 32-14.3 32-32V272c0-17.7-14.3-32-32-32zm-40 600H184V312h528v528zm168-728H264c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h576v576c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V144c0-17.7-14.3-32-32-32zM300 550h296v64H300z"></path></svg>
                        </i>
                        <span slot="title">推广素材</span>
                    </el-menu-item>

                    <el-menu-item index="/home/channel">
                        <i class="icon">
                            <svg viewBox="64 64 896 896" class="" data-icon="table" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 208H676V232h212v136zm0 224H676V432h212v160zM412 432h200v160H412V432zm200-64H412V232h200v136zm-476 64h212v160H136V432zm0-200h212v136H136V232zm0 424h212v136H136V656zm276 0h200v136H412V656zm476 136H676V656h212v136z"></path></svg>
                        </i>
                        <span slot="title">渠道管理</span>
                    </el-menu-item>

                    <el-menu-item index="/home/order">
                        <i class="icon">
                            <svg viewBox="64 64 896 896" class="" data-icon="bank" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M894 462c30.9 0 43.8-39.7 18.7-58L530.8 126.2a31.81 31.81 0 0 0-37.6 0L111.3 404c-25.1 18.2-12.2 58 18.8 58H192v374h-72c-4.4 0-8 3.6-8 8v52c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-52c0-4.4-3.6-8-8-8h-72V462h62zM512 196.7l271.1 197.2H240.9L512 196.7zM264 462h117v374H264V462zm189 0h117v374H453V462zm307 374H642V462h118v374z"></path></svg>
                        </i>
                        <span slot="title">订单详情</span>
                    </el-menu-item>
                    
                </el-menu>
            </el-col>

            <el-col  class="col-right">
                <!-- <keep-alive> -->
                    <router-view></router-view>
                <!-- </keep-alive> -->
            </el-col>

        </el-row>

    </div>
</template>



<script>
    export default {
        name: "home",
        data() {
            return {

            };
        },
        watch:{
            '$route.path': function(newVal,oldVal){
                let pageTitle=document.getElementById('page-title');
                switch(newVal){
                    case '/home/product':
                        pageTitle.innerHTML="商品管理";
                        break;
                    case '/home/material':
                        pageTitle.innerHTML="推广素材";
                        break;
                    case '/home/channel':
                        pageTitle.innerHTML="渠道管理";
                        break;
                    case '/home/order':
                        pageTitle.innerHTML="订单详情";
                        break;
                    default:
                        pageTitle.innerHTML="听书宝";
                }
            }
        }
    };
</script>
<style lang="css" scoped>
    #home{
        height: 100%;
        width: 100%; 
    }

    .row{
        height:100%;
        display:flex;
        flex-direction:row;
    }

    .col-left{
        background-color:#001529;
        position:relative;
        overflow: auto;
        height: 100vh;
        position: fixed;
        left: 0px;
        flex: 0 0 200px;
        max-width: 200px;
        min-width: 200px;
        width: 200px;
    }

    .logo{
        color: rgb(255, 255, 255);
        text-align: center;
        padding: 15px;
    }

    .logo img{
        width: 40px;
        margin-right: 10px; 
    }

    .el-menu-item{
        height:40px;
        line-height:40px;
        padding-right:16px;
        padding-left:24px;
        font-size:14px;
        color: hsla(0,0%,100%,.65);
        display:flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    .el-menu-item.is-active{
        background:#1890ff;
        color:#fff;
    }

    .icon{
        min-width: 14px;
        margin-right: 10px;
        font-size: 14px;
        -webkit-transition: font-size .15s cubic-bezier(.215,.61,.355,1),margin .3s cubic-bezier(.645,.045,.355,1);
        transition: font-size .15s cubic-bezier(.215,.61,.355,1),margin .3s cubic-bezier(.645,.045,.355,1);
    }
   

    .col-right{
        height:100%;
        overflow:auto;
        background-color:#f0f2f5;
        margin-left:200px;
    }
</style>
