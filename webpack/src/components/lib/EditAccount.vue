<template>
    <div>
        <transition name="bounce">
            <div class="mark_ly" :class="show?'active':''" v-show="show"></div>
        </transition>
        <transition name="move">
            <div class="newAccount" :class="show?'active':''" v-show="show">
                <div class="breadcrumb">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="newFoem">
                    <el-form ref="form" label-position="top" :model="newAccount" label-width="80px" :rules="rules">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="newAccount.name" placeholder="必须填写"></el-input>
                        </el-form-item>
                        <el-form-item label="用户名" prop="username" >
                            <el-input v-model="newAccount.username" placeholder="必须填写"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" v-if="newAccount.actionType==0"  prop="password" >
                            <el-input v-model="newAccount.password" placeholder="必须填写"></el-input>
                        </el-form-item>
                        <el-form-item label="电话">
                            <el-input v-model="newAccount.mobile" placeholder="可选择填写"></el-input>
                        </el-form-item>
                        <el-form-item label="地址">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="可选择填写" v-model="newAccount.address">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="可访问菜单权限">
                            <el-checkbox-group v-model="menu">
                                <el-checkbox v-for="page in pages" :label="page.menu_id" :key="page.menu_id" :disabled="page.disabled">{{page.name}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item style="width:100%;">
                            <el-button type="primary" :loading="newAccount.editloading" @click="editAccount">{{(newAccount.actionType==0)?'添加账户':'修改账户'}}</el-button>
                            <el-button type="success" :loading="newAccount.resetloading" @click="resetpasswd" v-show="newAccount.actionType!=0">密码重置</el-button>
                            <el-button type="warning" :loading="newAccount.delloading" @click="delUser" v-show="newAccount.actionType!=0">删除账户</el-button>
                            <el-button type="danger" @click="cancel">取消操作</el-button>
                        </el-form-item>
                        

                        <el-form-item>
                            <transition name="errorMove">
                                <div class="adderror" v-show="newAccount.isNotice">
                                    <el-alert :title="newAccount.msg" :closable="false" :type="newAccount.type" show-icon></el-alert>
                                </div>
                            </transition>
                        </el-form-item>
                    </el-form>
                    <div class="notice">

                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    export default {
        name: 'EDIT_ACCOUNT',
        data(){
           return {
                menu:[],
                pages:[{
                    name:'账户管理',
                    type:'success',
                    id:11
                }],
                rules:{
                    name:[{ required: true, message: '请输入姓名', trigger: 'blur' }],
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 3, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' }
                    ],
                }
           } 
        },
        created(){
            let temp_arr1 = this.getMenuList.allMenu;
            let temp_arr2 =  [];
            temp_arr1.forEach((item,index) => {
                if(item.menu_id === '6'){
                    item.disabled = true;
                } else {
                    item.disabled = false;
                }
            });
            this.getMenuList.thisMenu.forEach((item,index) => {
                temp_arr2.push(item.menu_id)
            });
            this.pages = temp_arr1;
            this.menu = temp_arr2;
        },
        computed:{
            ...mapGetters(['getMenuList']),
        },
        methods:{
            cancel(){
                this.$parent.show = false;
            },
            editAccount(){
                if(this.newAccount.editloading){
                    return false;
                }
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.$emit('editAccount')
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            },
            resetpasswd(){
                if(this.newAccount.resetloading){
                    return false;
                }
                this.$emit('resetpasswd')
            },
            delUser(){
                if(this.newAccount.delloading){
                    return false;
                }
                this.$emit('delUser')
            },
            showAllMenu(){
                alert(1)
            }
        },
        props:{
            show:{
                type:Boolean,
                required:true,
                default:()=>{
                    return false
                }
            },
            title:{
                type:String,
                required:true,
            },
            newAccount:{
                type:Object,
                required:true,
                default:()=>{
                    return {}
                }
            },
        }
    }

</script>

<style>
    .newAccount {
        overflow: auto;
        position: fixed;
        z-index: 999999;
        width: 500px;
        height: 100%;
        right: 0px;
        top: 0;
        background: #fff;
    }
    
    .breadcrumb {
        padding: 20px 20px 0;
        height: 60px;
        border-bottom: 1px solid #eee;
        width: 100%;
    }
    
    .breadcrumb span {
        font-size: 16px;
    }
    
    .newFoem {
        padding: 20px;
        
    }
    .newFoem .notice {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
        padding: 20px;
    }

    .bounce-enter-active {
        animation: bounce-in .5s;
    }
    .bounce-leave-active {
        animation: bounce-out .5s;
    }
    .move-enter-active {
        animation: move-in 0.5s;
    }
    .move-leave-active {
        animation: move-out 0.5s
    }
    .errorMove-enter-active {
        animation: errorMove-in .5s;
    }
    .errorMove-leave-active {
        animation: errorMove-out .5s;
    }
    @keyframes bounce-in {
        from {opacity:0;}
        to {opacity:0.4;}
    }
    @keyframes bounce-out {
        from {opacity:0.4;}
        to {opacity:0;}
    }
    @keyframes move-in {
        from {right:-500px;}
        to {right:0px;}
    }
    @keyframes move-out {
        from {right:0px;}
        to {right:-500px;}
    }
    @keyframes errorMove-in {
        from {opacity:0;}
        to {opacity:1;}
    }
    @keyframes errorMove-out {
        from {opacity:1;}
        to {opacity:0;}
    }
    
</style>