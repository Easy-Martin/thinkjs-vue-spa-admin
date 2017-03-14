<template>
    <button type="button" @click="submitAction($event)" class="sub_login"><slot></slot></button>
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
    .sub_login {
            color: #fff;
            width: 300px;
            height: 50px;
            border-radius: 30px;
            font-size: 16px;
            background: #5fa1d5;
            border: 1px solid #fff;
            transition: all 0.2s;
            animation: bag 8s infinite;
            cursor: pointer;
        }
        .sub_login:focus{
            outline: none;
        }
</style>