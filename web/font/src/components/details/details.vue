<template>
    <div class="details">
        <router-link to="/"><input type="button" value="<" class="btnBack"></router-link>
        <div class="imgbox">
            <img :src=img>
        </div>
        <h1>{{title}}</h1>
        <p><span class="price">￥{{price}}</span><span class="Oprice">{{Oprice}}</span></p>
        <ul class="ulPS">
            <li class="fl iconfont icon-zhengpinbaozhang1">100%品牌正品</li>
            <li class="fl iconfont icon-tedianquanchangbaoyou">全场399包邮</li>
            <li class="fl iconfont icon-tuipiao">7天无忧</li>
        </ul>
        <div class="tocar">
            <router-link to="/cart"><div class="buy" @click="gotocar">立即购买</div></router-link>
            <div class="car fr" @click="addproduct">加入购物车</div>
        </div>
    </div>
</template>
<script>
    import './details.css'
    import http from '../../utils/httpclient.js'
    import router from '../../router/router'
    export default {
        data:function(){
            return {
                title:sessionStorage.getItem("title"),
                price:sessionStorage.getItem("price"),
                Oprice:sessionStorage.getItem("Oprice"),
                img:sessionStorage.getItem("img")
            }
        },
        methods:{
                addproduct:function(){
                     http.get('insgenerateorder',{title: this.title, price: this.price,Oprice:this.Oprice,img:this.img}).then((res) => {
                        if(sessionStorage.getItem("username") == undefined) {
                            router.push('login')
                        }  
                    })
                },
                gotocar:function(){
                    http.get('insgenerateorder',{title: this.title, price: this.price,Oprice:this.Oprice,img:this.img}).then((res) => {
                        if(sessionStorage.getItem("username") == undefined) {
                            router.push('login')
                        }   
                    })
                }
         }
    }
</script>