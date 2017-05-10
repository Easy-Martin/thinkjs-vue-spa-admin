<template>
  <div class="index">
    <div class="index_left" ref="index_left">
      <div class="title">
        <span class="text"><i class="el-icon-star-on"></i>管理平台</span>

      </div>
      <div class="menu">
        <el-row type="flex" class="index">
          <left-layout/>
        </el-row>
      </div>
      <div class="info">
        <span class="text">欢迎您，{{getUserInfo.username}}</span>
        <span class="logout"><i title="登出" class="el-icon-delete2" @click="logout"></i></span>
      </div>
    </div>
    <div class="index_right" ref="right" :style="{'width':rightWidth + 'px'}">
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>

      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  import leftLayout from './Left';
  import {updateToken} from '../../utils';
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name: 'Index',
    data() {
      return {
        rightWidth: 0
      }
    },
    created() {
      this.getMenu();
    },
    computed: {
      ...mapGetters(['getUserInfo', 'getLoginStatus', 'getToken','getRefreshToken'])
    },
    mounted() {
      this.rightWidth = document.documentElement.clientWidth - this.$refs.right.getBoundingClientRect().left;
    },
    methods: {
      ...mapActions(['loginOut', 'setMenuList','setToken']),
      logout() {
        this.loginOut().then(() => {
          this.$router.replace('/login');
        });
      },
      getMenu(){
        return this.setMenuList({ token: this.getToken }).catch(err => {
          updateToken(this, err ,this.getMenu)
        })
      }
    },
    components: {
      leftLayout
    },
  }

</script>
<style>
  .index {
    height: 100%;
    display: flex;
  }
  
  .index_left {
    height: 100%;
    min-height: 650px;
    width: 250px;
    background: #324057;
    position: relative;
  }
  
  .info {
    border-top: 1px solid #625679;
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    color: #fff;
    padding: 20px;
    font-size: 14px;
    display: flex;
  }
  
  .logout {
    flex: 1;
    text-align: right;
    cursor: pointer;
  }
  
  .logout :hover {
    color: red;
  }
  
  .title {
    padding-top: 25px;
    height: 60px;
    width: 250px;
    border-bottom: 1px solid #625679;
    font-size: 16px;
    color: #fff;
    padding-left: 20px;
  }
  
  .title .text {
    position: relative;
    top: -5px;
  }
  
  .title i {
    font-size: 16px;
    padding-right: 10px;
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
  
  .index_right {
    flex: 1;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    min-width: 1100px;
  }
</style>