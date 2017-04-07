<template>
    <button type="button" @click="submitAction($event)" class="sub_login">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name:'LOGIN_BUTTON',
        methods:{
            submitAction(e){
                if(this.disabled){
                    return false
                }else{
                    this.$emit('click',e)
                }
            }
        },
        props:{
            disabled:{
                required:true,
                type:Boolean,
                default(){
                    return false
                }
            }
        }
    }
</script>
<style lang="css">
    .sub_login {
            color: #fff;
            width: 300px;
            height: 50px;
            border-radius: 30px;
            font-size: 16px;
            background: none;
            border: 1px solid #fff;
            cursor: pointer;
        }
        .sub_login:focus{
            outline: none;
        }
</style>