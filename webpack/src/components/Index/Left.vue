<template>
    <el-col :span="4" class="left_cnt">
        <el-menu :default-active="currentIndex" class="el-menu-vertical-demo" theme="dark" @select="handleSelect">
            <el-menu-item  v-for="(item,index) in thisMenu" :key="item.id" :index="index.toString()"><i :class="item.icon"></i>{{item.name}}</el-menu-item>
        </el-menu>
    </el-col>
</template>
<script>
  import {mapGetters,mapActions} from 'vuex';

  function getIndex(){
      let index = sessionStorage.getItem('currentIndex') || 0;
      return (/^[0-9]+$/.test(index))? parseInt(index).toString(): 0
  }

  export default {
    data(){
        return {
            currentIndex: getIndex(),
        }
    },
    computed:{
        ...mapGetters(['getToken','getMenuList']),
        thisMenu(){
            return this.getMenuList
        }
    },
    methods: {
      ...mapActions(['loginOut']),
      handleSelect(index) {
        this.currentIndex = index;
        sessionStorage.setItem('currentIndex',index);
        this.$router.replace({path:'/'+ this.thisMenu[index].mark})
      }
    },
    updated(){
        if(this.$route.path == '/'){
            this.$router.replace({path:'/'+ this.thisMenu[this.currentIndex].mark})
        }
    }
  }
</script>

<style>
    .left_cnt{
        width:100%;
        min-height:550px;
        
    }
    .el-menu-vertical-demo{
        border-radius:0;
    }
</style>