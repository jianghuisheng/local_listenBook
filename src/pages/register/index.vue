<template>
    <div id="register">
        <el-form class="regform">
            <p class="login-text">注册</p>
            <el-form-item>
                <el-input
                    type="text"
                    v-model="username"
                    @blur="inputUserBlur"
                    @change="checkRegister"
                    placeholder="请输入公司名称或者真实姓名"
                    style=" margin-bottom: 30px;"
                ></el-input>
            </el-form-item>

            <el-form-item>
                <el-input
                    type="text"
                    placeholder="联系方式"
                    v-model="phone"
                    @blur="inputPhoneBlur"
                    @change="checkRegister"
                    style="width:220px; margin-bottom: 30px;"
                ></el-input>

                <el-button
                    v-if="sendAuthCode"
                    @click="getAuthCode"
                    type="primary"
                    style="width:105px;"
                >获取验证码</el-button>
                <el-button
                    v-if="!sendAuthCode"
                    style="width:105px;"
                >{{authTime}}</el-button>

            </el-form-item>

            <el-form-item>
                <el-input
                    type="number"
                    class="auth_input"
                    placeholder="请输入验证码"
                    v-model="verification"
                    @blur="inputVerifyBlur"
                    @change="checkRegister"
                    style=" margin-bottom: 30px;"
                ></el-input>
            </el-form-item>


            <el-form-item>
                <el-input
                    type="password"
                    placeholder="请输入密码"
                    v-model="password"
                    @blur="inputPasswordBlur"
                    @change="checkRegister"
                    style="margin-bottom: 30px;"
                ></el-input>
            </el-form-item>

            <el-form-item>
                <el-input
                    type="password"
                    placeholder="请确认密码"
                    v-model="confirm"
                    @blur="inputConfirmBlur"
                    @change="checkRegister"
                ></el-input>
            </el-form-item>

            <el-form-item>
                <div style="text-align:right;margin:30px 0">
                    <p>已有账号,<router-link to="/login" style="color:#1890ff;">立即登录</router-link></p>
                </div>

                <el-button v-if="isRegister" type="primary" class="submitBtn" @click.native.prevent="goreRister">注册</el-button>
                <el-button v-if="!isRegister" class="submitBtn" disabled="true">注册</el-button>

                <!-- 联系客服 -->
                <div class="contact-server">
                    <img src="./image/server.png" style="width: 100%;">
                </div>
                
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    name: "register",
    data() {
        return {
            //注册用户名
            username: "",
            //注册手机号
            phone: "",
            //获取验证码倒计时
            authTime: 60,  
            //显示获取按钮还是倒计时
            sendAuthCode: true,    
            //输入验证码
            verification: "",
            //注册密码
            password: "",
            //确认密码
            confirm:"",
            //注册按钮激活
            isRegister: false
           
        };
    },
    methods: {
        //输入用户名完成时验证
        inputUserBlur() {
            if (!this.username) {
                this.$message.error("用户名不能为空"); 
            }else{
                //发起请求验证是否已注册
                //this.username='';
            }
        },
        //验证手机号规则
        isPhoneNumber(number) {
            let reg = /^13\d{9}|14\d{9}|15\d{9}|16\d{9}|17\d{9}|18\d{9}$/;
            if (!number.match(reg)) {
                return false;
            } else {
                return true;
            }
        },
        //输入手机号完成时验证
        inputPhoneBlur() {
            if (!this.isPhoneNumber(this.phone)) {
                if (this.phone == "") {
                    this.$message.error("手机号不能为空");
                } else {
                    this.$message.error("请输入合法手机号");
                    this.phone='';
                }
            }
        },

        //获取验证码方法
        getAuthCode() {
            if(this.phone){
                var params = new URLSearchParams();
                params.append("phone", this.phone); 
                this.$getData('',parmas).then((result)=>{
                    //如果请求成功
                    //按钮倒计时
                    this.sendAuthCode = false;
                    var timer = setInterval(() => {
                        this.authTime--;
                        if (this.authTime <= 0) {
                            this.sendAuthCode = true;
                            this.authTime=60;
                            clearInterval(timer);
                        }
                    }, 1000);     
                });
            }else{
                this.$message.error("请输入手机号");
            }
        
        },

        //验证码验证规则
        isVerifyNumber(number) {
            var reg = /^[0-9]{6}$/;
            if (!number.match(reg)) {
                return false;
            } else {
                return true;
            }
        },

        //输入验证码完成时验证
        inputVerifyBlur(){
            if (!this.isVerifyNumber(this.verification)) {
                if (this.verification == "") {
                    this.$message.error("验证码不能为空");
                } else {
                    this.$message.error("请输入合法验证码");
                    this.verification='';
                }
            }
        },

        //密码验证规则
        isPasswordNumber(number) {
            //任意字符6到18位(含符号)
            var reg = /^.{6,18}$/;
            if (!number.match(reg)) {
                return false;
            } else {
                return true;
            }
        },

        //输入密码完成时验证
        inputPasswordBlur() {
            if (!this.isPasswordNumber(this.password)) {
                if (this.password == "") {
                    this.$message.error("密码不能为空");
                } else {
                    this.$message.error("密码长度为8到16位");
                    this.password='';
                }
            }else if( this.confirm && this.password!= this.confirm ){

                this.$message.error("两次密码输入不一致");

            }
        }, 

        //输入确认密码完成时验证
        inputConfirmBlur() {
            if (!this.isPasswordNumber(this.confirm)) {
                if (this.confirm == "") {
                    this.$message.error("确认密码不能为空");
                } else {
                    this.$message.error("密码长度为8到16位");
                    this.confirm='';
                }
            }else if( this.password && this.confirm!= this.password ){

                this.$message.error("两次密码输入不一致");

            }
        },

        //校验注册按钮是否可点
        checkRegister() {
            if (
                this.username && 
                this.isPhoneNumber(this.phone) && 
                this.isVerifyNumber(this.verification) && 
                this.isPasswordNumber(this.password) &&
                this.isPasswordNumber(this.confirm)
            ) {
                this.isRegister = true;
            } else {
                this.isRegister = false;
            }
        },
        //用户点击注册
        goRegister() {





          
        }, 
    }
};
</script>
<style lang="css" scoped>
    #register {
        width: 100%;
        height: 100%;
        position: relative;
    }
    .login-text {
        font-size: 20px;
        margin-bottom: 20px;
    }
    .regform {
        width: 330px;
        margin: 120px auto 0px;
        position: relative;
    }
    .submitBtn {
        width: 100%;
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
</style>
