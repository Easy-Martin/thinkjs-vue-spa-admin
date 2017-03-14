<template>
    <div class="setting">
        <el-form ref="form" :model="info" label-width="100px" :rules="rules1">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="info.name"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="info.username" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="联系方式">
                <el-input v-model="info.mobile"></el-input>
            </el-form-item>

            <el-form-item label="联系地址">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="info.address">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="info.loading" @click="handleSubmit1">修改个人信息</el-button>
            </el-form-item>
            <el-form-item>
                <transition name="errorMove">
                    <div class="adderror" v-show="info.isNotice">
                        <el-alert :title="info.msg" :closable="false" :type="info.type" show-icon></el-alert>
                    </div>
                </transition>
            </el-form-item>
        </el-form>
        <el-form ref="newForm" :model="password" label-width="100px" :rules="rules2">
            <el-form-item label="旧密码" prop="oldpassword">
                <el-input type="password" v-model="password.oldpassword"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newpassword">
                <el-input type="password" v-model="password.newpassword"></el-input>
            </el-form-item>
            <el-form-item label="重复密码" prop="repassword">
                <el-input type="password" v-model="password.repassword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="success" :loading="password.loading" @click="handleSubmit2">修改登录密码</el-button>
            </el-form-item>
            <el-form-item>
                <transition name="errorMove">
                    <div class="adderror" v-show="password.isNotice">
                        <el-alert :title="password.msg" :closable="false" :type="password.type" show-icon></el-alert>
                    </div>
                </transition>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex';
    import { updateToken } from '../utils';
    export default {
        name: 'SETTING',
        data() {
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.password.repassword !== '') {
                        this.$refs.newForm.validateField('repassword');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.password.newpassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                info: {
                    isNotice: false,
                    username: '',
                    name: '',
                    mobile: '',
                    address: '',
                    loading:false,
                    msg: '',
                    type: 'error'
                },
                password: {
                    isNotice: false,
                    oldpassword: '',
                    loading:false,
                    newpassword: '',
                    repassword: '',
                    msg: '',
                    type: 'error'
                },
                rules1: {
                    name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
                },
                rules2: {
                    oldpassword: [{ required: true, message: '请输入登录密码', trigger: 'blur' }],
                    newpassword: [{ required: true, validator: validatePass, trigger: 'blur' }],
                    repassword: [{ required: true, validator: validatePass2, trigger: 'blur' }],
                }
            }
        },
        created() {
            this.getSelf();
        },
        computed:{
            ...mapGetters(['getToken', 'getRefreshToken'])
        },
        watch:{
            'info.isNotice'(n){
                if(n){
                    this.info.loading = false;
                    setTimeout(() => {
                        this.info.isNotice = false;
                    }, 2000)
                }
            },
            'password.isNotice'(n){
                if(n){
                    this.password.loading = false;
                    setTimeout(() => {
                        this.password.isNotice = false;
                    }, 2000)
                }
            }
        },
        methods: {
            ...mapActions(['setToken', 'getSelfInfo','editSelfInfo','resetSelfPassword']),
            getSelf(){
                this.getSelfInfo({
                    token:this.getToken
                }).then( result => {
                    this.info.username = result.data.username;
                    this.info.name = result.data.name;
                    this.info.mobile = result.data.mobile;
                    this.info.address = result.data.address;
                }).catch(err => {
                    updateToken(this, err ,this.getSelf)
                })
            },
            handleSubmit1() {
                this.$refs.form.validate((valid) => {
                    if (valid && this.info.loading === false) {
                        this.editInfo();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            editInfo() {
                this.info.loading = true;
                this.editSelfInfo({
                    token:this.getToken,
                    name: this.info.name,
                    address: this.info.address,
                    mobile: this.info.mobile
                }).then(result => {
                    this.info.type = 'success'
                    this.info.isNotice = true;
                    this.info.msg = '修改个人信息成功'
                }).catch( err => {
                    updateToken(this, err ,this.editInfo).catch(err =>{
                        this.info.type = 'error'
                        this.info.isNotice = true;
                        this.info.msg = err.msg
                    })
                })
            },
            handleSubmit2() {
                this.$refs.newForm.validate((valid) => {
                    if (valid && this.password.loading === false) {
                        this.resetpasswd();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetpasswd() {
                this.password.loading = true;
                this.resetSelfPassword({
                    token:this.getToken,
                    password: this.password.oldpassword,
                    repassword: this.password.repassword,
                }).then(result => {
                    this.password.type = 'success'
                    this.password.isNotice = true;
                    this.password.msg = '修改密码成功'
                }).catch(err => {
                    updateToken(this, err ,this.resetpasswd).catch(err =>{
                        this.info.type = 'error'
                        this.info.isNotice = true;
                        this.info.msg = err.msg
                    })
                })
            }
        }
    }

</script>
<style>
    .setting {
        padding: 50px 20px;
    }
    
    .adderror {
        line-height: normal;
        opacity: 1;
    }
    
    .errorMove-enter-active {
        animation: errorMove-in .5s;
    }
    
    .errorMove-leave-active {
        animation: errorMove-out .5s;
    }
    
    @keyframes errorMove-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes errorMove-out {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
</style>