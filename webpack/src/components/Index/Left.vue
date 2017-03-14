<template>
    <el-col :span="4" class="left_cnt">
        <el-menu :default-active="currentIndex" class="el-menu-vertical-demo" theme="dark" @select="handleSelect">
            <el-menu-item  :key="item.id" v-for="(item,index) in menu" :index="index.toString()"><i :class="item.icon"></i>{{item.name}}</el-menu-item>
        </el-menu>
    </el-col>
</template>
<script>
  import {mapGetters,mapActions} from 'vuex';
  export default {
    data(){
        return {
            currentIndex:sessionStorage.getItem('currentIndex')||'0',
        }
    },
    computed:{
        ...mapGetters(['getToken','getMenuList']),
        menu(){
            return this.getMenuList
        }
    },
    methods: {
      ...mapActions(['loginOut']),
      handleSelect(index) {
        this.currentIndex = index;
        sessionStorage.setItem('currentIndex',index);
        this.$router.replace({path:'/'+ this.menu[index].mark,query:{name:this.menu[index].name}})
      }
    },
    watch:{
        ['menu'](n,o){
            if(this.$route.path == '/'){
                this.$router.replace({path:'/'+ n[this.currentIndex].mark,query:{name:n[this.currentIndex].name}})
            }
        }
    },
    props:{
        menu:{
            required:true,
            type:Array,
            default:()=>{
                return []
            }
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