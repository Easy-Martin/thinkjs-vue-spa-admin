<template>
    <div class="account">
        <div class="add">
            <el-button @click="showEdit(false,'0')" type="text">+添加新账户</el-button>
        </div>
        <div class="accountList">
            <el-table :data="accountList" border style="width: 100%">
                <el-table-column prop="name" label="姓名" width="100"></el-table-column>
                <el-table-column prop="username" label="用户名" width="150"></el-table-column>
                <el-table-column prop="create_time" label="创建日期" width="120"></el-table-column>
                <el-table-column prop="update_time" label="更新时间" width="120"></el-table-column>
                <el-table-column prop="update_by" label="操作人员" width="150"></el-table-column>
                <el-table-column prop="mobile" label="电话"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
                <el-table-column inline-template :context="_self" fixed="right" label="操作" width="100">
                    <span>
                        <el-button type="text" @click="showEdit($index,'1')" size="small">编辑</el-button>
                    </span>
                </el-table-column>
            </el-table>
        </div>
        <edit-account :show="show" @editAccount="editAccount" @resetpasswd="resetpasswd" @delUser="delUser" :title="title" :new-account="newAccount"
        />
    </div>
</template>
<script>
    import { mapActions, mapGetters } from 'vuex';
    import { updateToken } from '../utils';
    import EditAccount from './lib/EditAccount';
    export default {
        name: 'ACCOUNT',
        data() {
            return {
                accountList: [],
                show: false,
                title: '添加账户',
                newAccount: {
                    username: '',
                    address: '',
                    mobile: '',
                    name: '',
                    uuid: '',
                    password: '',
                    type: 'error',
                    actionType: '0',
                    isNotice: false,
                    msg: '',
                    editloading: false,
                    resetloading: false,
                    delloading: false,
                }
            }
        },
        watch: {
            'newAccount.isNotice'(n, o) {
                if (n) {
                    setTimeout(() => {
                        this.newAccount.isNotice = false;
                    }, 2000)
                    this.newAccount.editloading = this.newAccount.delloading = this.newAccount.resetloading = false;
                }
            }
        },
        components: {
            EditAccount
        },
        computed: {
            ...mapGetters(['getToken','getRefreshToken'])
        },
        created() {
            this.getUser()
        },
        methods: {
            ...mapActions(['setToken', 'getUserList', 'editUser', 'resetPassword']),
            getUser() {
                this.getUserList({ token: this.getToken }).then(res => {
                    this.accountList = res.data
                }).catch(err => {
                    updateToken(this, err ,this.getUser)
                })
            },
            showEdit(index, type) {
                if (type === '1') {
                    this.newAccount.username = this.accountList[index].username;
                    this.newAccount.address = this.accountList[index].address;
                    this.newAccount.mobile = this.accountList[index].mobile;
                    this.newAccount.name = this.accountList[index].name;
                    this.newAccount.uuid = this.accountList[index].uuid;
                    this.title = '编辑账号';
                } else {
                    this.newAccount.username = '';
                    this.newAccount.address = '';
                    this.newAccount.mobile = '';
                    this.newAccount.name = '';
                    this.newAccount.password = '';
                    this.title = '添加账户'
                }
                this.newAccount.actionType = type;
                this.show = true;
            },
            editAccount() {
                this.editUser({
                    token: this.getToken,
                    username: this.newAccount.username,
                    name: this.newAccount.name,
                    address: this.newAccount.address,
                    mobile: this.newAccount.mobile,
                    password: this.newAccount.password,
                    uuid: this.newAccount.uuid,
                    type: this.newAccount.actionType
                }).then(result => {
                    this.getUser();
                    this.newAccount.type = 'success';
                    this.newAccount.msg = (this.newAccount.actionType == '0') ? '添加账户成功' : '修改账户成功';
                    this.newAccount.isNotice = true;
                }).catch(err => {
                    updateToken(this, err ,this.editAccount).catch(err =>{
                        this.newAccount.type = 'error';
                        this.newAccount.msg = err.msg;
                        this.newAccount.isNotice = true;
                    })
                    
                })
            },
            cancel() {
                this.show = false;
            },
            resetpasswd() {
                this.resetPassword({
                    token: this.getToken,
                    uuid: this.newAccount.uuid,
                    type: '2',
                }).then(result => {
                    this.newAccount.type = 'success';
                    this.newAccount.msg = '密码重置成功';
                    this.newAccount.isNotice = true;
                }).catch(err => {
                    updateToken(this, err ,this.editAccount).catch(err =>{
                        this.newAccount.type = 'error';
                        this.newAccount.msg = err.msg;
                        this.newAccount.isNotice = true;
                    })
                })
            },
            delUser() {
                this.editUser({
                    token: this.getToken,
                    uuid: this.newAccount.uuid,
                    type: '2'
                }).then(result => {
                    this.newAccount.type = 'success';
                    this.newAccount.msg = '删除账户成功';
                    this.newAccount.isNotice = true;
                    this.getUserList({ token: this.getToken }).then(res => {
                        this.accountList = res.data
                    })
                }).catch(err => {
                    updateToken(this, err ,this.editAccount).catch(err =>{
                        this.newAccount.type = 'error';
                        this.newAccount.msg = err.msg;
                        this.newAccount.isNotice = true;
                    })
                })
            }
        }
    }

</script>
<style lang="css">
    .account {
        padding: 20px;
        overflow: hidden;
        zoom: 1;
    }
    
    .el-textarea__inner {
        resize: none;
    }
    
    .add {
        margin-bottom: 20px;
    }
    
    .mark_ly {
        position: fixed;
        width: 100%;
        height: 100%;
        background: #000;
        z-index: 999998;
        opacity: 0.4;
        left: 0;
        top: 0;
    }
    
    .adderror {
        line-height: normal;
        opacity: 1;
    }
</style>