<template>
    <div class="my">
        <div class="header">
            <h4>个人中心</h4>
        </div>
        <div class="personal">
            <div class="fl">
                <h1 ref="admin"></h1>
                <p>关注:0  粉丝:0</p>
            </div>
            <div class="fr">
            <img src="../../img/my1.jpg" class="head">
            </div>
        </div>
        <div class="center">
            <ul>
                <li class="iconfont icon-icondd1">订单中心</li>
                <li class="icon-gouwuche iconfont"><router-link to="/cart">购物车</router-link></li>
                <li class="icon-wodeyouhuijuan iconfont">优惠卷</li>
            </ul>
        </div>
        <div class="advertising">
            <img src="../../img/my2.jpg">
        </div>
        <div class="list">
            <ul>
                <li v-for="(value,idx) in list">
                    <span>{{value}}</span>
                    <span class="iconfont icon-you"></span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import router from '../../router/router'
    import './my.css'
    export default {
        data:function(){
            return {
                list:['分享赚钱','我的收藏','我的活动','帮助中心','意见反馈','推荐给朋友','设置']
            }
        },
        mounted(){
            this.$refs.admin.innerText=sessionStorage.getItem("username");
            if(sessionStorage.getItem("username")==undefined){
                router.push('login')
            }
        }
    }
</script>  