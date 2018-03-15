<template>
    <div class="homepage">
        <div class="header">
            <p class="day">0{{month}}-{{day}}</p>
            <div class="row">
                <h1 class="now">今天</h1>
                <router-link to="/search">
                <input type="text" placeholder="search" id="search">
                <i class="icon-sousuo iconfont"></i>
                </router-link>
            </div>
        </div>
        <div class="cont">
            <ul>
                <li v-for="(value,idx) in data" :data-id="value.id">
                    
                    <div>
                        <h1>{{value.title}}</h1>
                        <p>￥<span>{{value.price}}</span></p>
                        原价:<i>￥{{value.Oprice}}</i> 
                    </div> 
                    <router-link to="/details"><img :src="src+value.img"  @click="toDetails"></router-link>
                </li>
            </ul>
        </div>
        <spinner v-if="show"></spinner>
    </div>
</template>
<script>
    import router from '../../router/router'
    import http from '../../utils/httpclient.js'
    import spinner from '../spinner/spinner.vue'
    import './homepage.css'
    
    export default {
        components: {
            spinner
        },
        data:function(){
            return {
                month:(new Date()).getMonth()+1,
                day:(new Date()).getDate(),
                data:null,
                src:'../../src/img/',
                show: false
            }
        },
        methods:{
            toDetails:function(e){
                var pff = e.target.parentNode.parentNode.firstChild.firstChild;
                sessionStorage.setItem("title",pff.innerText);
                sessionStorage.setItem("price",pff.nextElementSibling.children[0].innerText);
                sessionStorage.setItem("Oprice",pff.nextElementSibling.nextElementSibling.innerText);
                sessionStorage.setItem("img",e.target.src);
            }
        },
        mounted(){
            this.show=true;
            http.get('frontproducts').then((res) => {
                if(res.data.status){
                    this.data =res.data.data;
                    this.show = false;
                }else{
                    alert("数据请求失败")
                }
            })
        }
    }
</script>