<template>
    <div id="box">
        <div class="container">
            <router-view></router-view>
        </div>
        <div class="nav">
            <ul>
                <li class="li1 iconfont icon-shouye"><router-link to="/">首页</router-link></li>
                <li class="icon-shangdian iconfont"><router-link to="/store">商店</router-link></li>
                <li class="icon-gouwucheman iconfont"><router-link to="/cart">购物车</router-link></li>
                <li class="icon-wodexuanzhong iconfont"><router-link to="/my">我的</router-link></li>
            </ul>
        </div>
    </div>
</template>
<script>
    import './home.css'

    export default {
        data:function(){
            return {
                dataset:[{a:1}]
            }
        }
    }
 </script>