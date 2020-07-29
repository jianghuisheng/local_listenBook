<template>
    <div id="login">
        <!-- 登录输入框 -->
        <div class="login-box">
            <header class="login-text">登录</header>

            <!-- 输入手机号与密码-->
            <div>
                <div class="phone-box">
                    <el-input
                        type="text"
                        placeholder="请输入合法手机号"
                        v-model="phone"
                        @blur="inputPhoneBlur"
                        @change="checkLogin"
                    >
                    </el-input>
                </div>
                <div class="password-box">
                    <el-input
                        type="password"
                        placeholder="请输入密码(8到16位任意字符)"
                        v-model="password"
                        @blur="inputPasswordBlur"
                        @change="checkLogin"
                    >
                    </el-input>
                </div>
                <div class="register-box">
                    <span @click="goRegister">立即注册</span>
                </div>
                <div class="button-box" @click="goLogin">
                    <el-button
                        :type="is_login ? 'primary' : ''"
                        size="medium"
                        :disabled="!is_login"
                        >登录</el-button
                    >
                </div>
            </div>

            <!-- 服务号扫码登录 -->
            <div class="scan-login-box">
                <div class="left-line"></div>
                <div class="scan-login-text">服务号扫码登录</div>
                <div class="right-line"></div>
            </div>

            <el-button type="primary" size="medium" @click="scanLogin"
                >服务号扫码登录</el-button
            >

            <!-- 联系客服 -->
            <div class="contact-server" @click="connectServer">
                <img src="./image/server.png" style="width: 100%;" />
            </div>
        </div>

        <!-- 登录提示 -->
        <div class="login-tip">
            <p style="margin-bottom: 4px;">通知：</p>
            <p style="margin-top: 0px;">
                为方便各渠道方登录听书宝后台，高效处理工作，现增加新功能：支持服务号绑定手机和密码，并使用手机密码登录，方便多人登录后台。（解决每次服务号登录都需管理员扫码问题）
            </p>
            <p style="margin-bottom: 4px;">操作方式：</p>
            <p style="margin: 0px;">
                1. 服务号管理员点击进入听书宝后台，选择【服务号扫码登陆】
            </p>
            <p style="margin-top: 0px;">2. 进入之后设置信息【手机号+密码】</p>
            <p style="margin-bottom: 4px;">注意：</p>
            <p style="margin: 0px;">1. 第一次登录需要服务号管理员进行操作</p>
            <p style="margin-top: 0px; margin-bottom: 30px;">
                2. 之后即可以通过手机号+密码的方式，多人登录，高效协作！
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name: "login",
    data() {
        return {
            //登录手机号
            phone: "",
            //登录密码
            password: "",
            //登录按钮激活
            is_login: false,
        };
    },
    methods: {
        //验证手机号
        isPhoneNumber(number) {
            let reg = /^13\d{9}|14\d{9}|15\d{9}|16\d{9}|17\d{9}|18\d{9}$/;
            if (!number.match(reg)) {
                return false;
            } else {
                return true;
            }
        },

        //验证密码
        isPasswordNumber(number) {
            //任意字符6到18位(含符号)
            var d = /^.{6,18}$/;
            if (!number.match(d)) {
                return false;
            } else {
                return true;
            }
        },

        //输入手机号与密码校验登录按钮是否可点
        checkLogin() {
            let phone = this.phone;
            let password = this.password;
            if (this.isPhoneNumber(phone) && this.isPasswordNumber(password)) {
                this.is_login = true;
            } else {
                this.is_login = false;
            }
        },
        //输入手机号完成时验证
        inputPhoneBlur() {
            let phone = this.phone;
            if (!this.isPhoneNumber(phone)) {
                this.phone = "";
                if (phone == "") {
                    this.$message.error("手机号不能为空");
                } else {
                    this.$message.error("请输入合法手机号");
                }
            }
        },

        //输入密码完成时验证
        inputPasswordBlur() {
            let password = this.password;
            if (!this.isPasswordNumber(password)) {
                this.password = "";
                if (password == "") {
                    this.$message.error("密码不能为空");
                } else {
                    this.$message.error("密码长度为8到16位");
                }
            }
        },
        //用户注册
        goRegister() {
            this.$message("功能待开发，敬请期待");
            //this.$router.push('/register');
        },

        //用户点击登录
        goLogin() {
            // 默认账号:18123456789  mm123456
            let parmas = new URLSearchParams();
            parmas.append("username", this.phone);
            parmas.append("password", this.password);

            // this.$axios.post(this.$src+'/admin/login',parmas).then((result)=>{
            //     if(result.data.code=='200'){
            //         localStorage.setItem('uid',result.data.data.uid);
            //         localStorage.setItem('token',result.data.data.token);
            //         //存用户名在本地
            //         this.$router.push('/home');
            //     }else{
            //         this.$message.error(result.data.message);

            //     }
            // })
            // this.$router.push("/home");

            localStorage.setItem("uid", this.phone);
            localStorage.setItem("token", this.password);
            this.$router.push("/home");
        },
        //服务号扫码登录
        scanLogin() {
            this.$message("功能待开发，敬请期待");
        },
        //联系客服
        connectServer() {
            this.$message("功能待开发，敬请期待");
        },
    },
};
</script>
<style lang="css" scoped>
#login {
    width: 100%;
    height: 100%;
    position: relative;
}
.login-box {
    width: 330px;
    margin: 120px auto 0px;
    position: relative;
}
.login-text {
    font-size: 20px;
    margin-bottom: 20px;
}

.phone-box {
    margin-bottom: 30px;
}

.password-box {
    margin-bottom: 20px;
}

.register-box {
    margin-bottom: 20px;
    text-align: right;
}

.register-box span {
    display: inline-block;
    color: #1890ff;
    cursor: pointer;
    height: 100%;
}
button {
    width: 100%;
}
.scan-login-box {
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 40px;
    margin-bottom: 22px;
}

.left-line {
    border-top: 1px solid rgb(221, 221, 221);
    flex: 1 1 0%;
}

.scan-login-text {
    padding: 0px 15px;
}
.right-line {
    border-top: 1px solid rgb(221, 221, 221);
    flex: 1 1 0%;
}

@keyframes breath {
    0% {
        transform: scale(0.9);
    }
    100% {
        transform: scale(1);
    }
}
.contact-server {
    animation: breath 1s linear alternate infinite both;
    cursor: pointer;
    width: 50px;
    height: 50px;
    position: absolute;
    bottom: 20px;
    right: -40%;
    border-radius: 50%;
    box-shadow: rgba(24, 144, 255, 0.2) 1px 1px 1px 1px,
        rgba(24, 144, 255, 0.2) -1px -1px 1px 1px,
        rgba(24, 144, 255, 0.2) -1px 1px 1px 1px,
        rgba(24, 144, 255, 0.2) 1px -1px 1px 1px;
}

.login-tip {
    width: 70%;
    margin: 40px auto 0px;
    max-width: 580px;
}
.login-tip p {
    margin-bottom: 1em;
}
</style>
