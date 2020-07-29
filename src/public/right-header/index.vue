
<template>
    <div id="right-header">
        <div class="title">
            <span class="border"></span>
            <span>{{title}}</span>
        </div>
        <div>
            <el-dropdown>
                <span class="el-dropdown-link">
                    {{account}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>


<script>
    export default {
        name: "right-header",
        data() {
            return {
                account:'惠心课堂的公众号'
            };
        },
        props:['title'],
        methods:{
            logout(){

                let parmas = new URLSearchParams();
                parmas.append('token',localStorage.getItem('token'));
                parmas.append('uid',localStorage.getItem('uid'));

                this.$axios.post(this.$src+'/admin/login/login_out',parmas).then((result)=>{
                    if(result.data.code=='200'){
                        this.$router.push('/login');
                        this.$message.success('退出登录成功');
                        localStorage.removeItem('uid');
                        localStorage.removeItem('token');  
                    }else{
                        this.$message.error(result.data.message);
                    }
                })  
            }
        },
        created() {

        },
        mounted() {
           
        }
    };
</script>

<style lang="css" scoped>

    #right-header{
        padding: 0 50px;
        height: 64px;
        line-height: 64px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background-color:#fff;
    }

    .title{
        font-size:14px;
        display:flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    .border{
        display:inline-block;
        width: 2px;
        height: 14px;
        background-color:#1890ff;
        margin-right: 8px;
    }
    .el-dropdown{
        height:64px;
    }
    .el-dropdown-link{
        display:inline-block;
        width:160px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .el-dropdown-menu{
        width:160px;
    }
</style>




   
