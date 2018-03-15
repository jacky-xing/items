<template>
    <div id="box">
        <div class="container">
            <router-view></router-view>
        </div>
        <div class="nav">
            <ul>
                <router-link to="/"><li class="li1 iconfont icon-shouye">首页</li></router-link>
                <router-link to="/store"><li class="icon-shangdian iconfont">商店</li></router-link>
               <router-link to="/cart"> <li class="icon-gouwucheman iconfont">购物车</li></router-link>
                <router-link to="/my"><li class="icon-wodexuanzhong iconfont">我的</li></router-link>
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