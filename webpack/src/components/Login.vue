<template>
    <div class="login">
        <div class="login_from">
            <h2>管理平台登陆</h2>
            <form method="post" id="formpostsub">
                <div class="form-group">
                    <label for="username"></label>
                    <input type="text" class="subuser" v-model="username" name="username" id="username" autocomplete="off" placeholder="账号">
                </div>
                <div class="form-group">
                    <label for="password"></label>
                    <input type="password" class="subpasswd" v-model="password" name="password" id="password" placeholder="密码">
                </div>
                <login-button @click="submitAction" :disabled="disabled">{{btnText}}</login-button>
                <div v-show="errMsg!=''" class="errormsg">{{errMsg}}</div>
            </form>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex';
    import LoginButton from './lib/LoginButton'
    import Api from '../api';
    export default {
        name: 'LOGIN',
        data() {
            return {
                username: '',
                password: '',
                errMsg: '',
                disabled: false,
                btnText: '登陆'
            }
        },
        components: {
            LoginButton
        },
        created() {
            document.title = ' 登陆';
        },
        methods: {
            ...mapActions(['loginAction']),
            submitAction(e) {
                this.disabled = true;
                this.btnText = '正在登陆...';
                this.loginAction({
                    username: this.username,
                    password: this.password,
                }).then(() => {
                    this.$router.replace('/');
                    
                }).catch(err => {
                    this.errMsg = err.msg;
                    this.disabled = false;
                    this.btnText = '登陆';
                })
            }
        }
    }

</script>
<style scoped>
    @keyframes bag {
        0% {
            background: #333
        }
        25% {
            background: #222
        }
        50% {
            background: #111
        }
        75% {
            background: #222
        }
        100% {
            background: #333
        }
    }
    
    .login {
        padding: 0;
        width: 100%;
        height: 100%;
        position: fixed;
        background: #5fa1d5;
        animation: bag 8s infinite;
        overflow: hidden;
    }
    
    .login_from {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    
    .login h2 {
        font-size: 24px;
        font-weight: 400;
        text-align: center;
        color: white;
        margin-bottom: 25px;
    }
    
    .login input {
        height: 50px;
        width: 300px;
        border-radius: 30px;
        text-align: center;
        font-size: 16px;
        border: 1px solid #fff;
        outline: none;
    }
    
    .form-group {
        margin-bottom: 15px;
    }
    
    .errormsg {
        margin-top: 15px;
        font-size: 14px;
        text-align: center;
        border-radius: 30px;
        color: #fff;
        padding: 10px;
        width: 100%;
        background: rgba(255, 0, 0, 0.4);
    }
</style>