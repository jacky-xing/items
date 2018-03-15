<template>
    <div id="wayslHot">
        <div class="hot">
            <div class="hot_header">
            <router-link to="/store"><input type="button" value="<" class="Back"></router-link>
                <h1>本周最热</h1>
            </div>
            <div class="hot_top">
                <img src="../../img/1.jpg"/>
            </div>
            <div class="hot_body">
                <div class="store_hot">
                    <div class="store_hot2">
                        <ul>
                            <li v-for="(value,idx) in data">
                                <div>
                                    <img :src="srcimg+value.img">
                                </div>
                                <div>
                                    <div class="store_hot2_content">
                                        {{value.title}}
                                    </div>
                                    <div class="store_hot2_price">
                                        <div id="Oprice">原价:￥{{value.Oprice}}</div>
                                        <div>￥<span>{{value.price}}</span></div>
                                        <input type="button" value="购买" @click="todetails">
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <spinner v-if="show"></spinner>
    </div>
</template>
<script>
    import http from '../../utils/httpclient.js'
    import spinner from '../spinner/spinner.vue'
    import './hotProduct.css'

    export default {
        components: {
            spinner
        },
        data:function(){
            return {
                data:[],
                srcimg:'../../src/img/',
                show: false,
                imgsrc:'http://10.3.136.148:8080/frontassproducts?hot=',
                hot:'hot'
            }
        },
        mounted(){
            this.show=true;
            http.get(this.imgsrc+this.hot).then((res) => {
                if(res.data.status){
                    this.data =res.data.data;
                    this.show = false;
                }else(window.alert(res.data.error))
            })
        },
        methods:{
            todetails:function(e){
                sessionStorage.setItem("price",e.target.previousElementSibling.children[0].innerText);
                sessionStorage.setItem("title",e.target.parentNode.previousElementSibling.innerText);
                sessionStorage.setItem("img",e.target.parentNode.parentNode.previousElementSibling.children[0].src);
                sessionStorage.setItem("Oprice",e.target.previousElementSibling.previousElementSibling.innerText);
                location.href='#/details'
            }
        }
    }
</script>