<template>
    <div id="wayslStore">
        <div class="store_h">
                    <div class="store_h1">
                    <router-link to="/"><input type="button" value="<" class="btnBack"></router-link>
                        <h2>商店</h2>
                        <div class="box-fangdajing">
                            <router-link to="/search">
                            <input type="text" class="store_search" placeholder="search">
                            </router-link>
                            <i class="icon-sousuo iconfont fangdajing"></i>
                        </div>
                    </div>

                    <div class="store_img">
                        <img src="../../img/2.jpg"/>
                    </div>

                    <div class="store_nav">
                        <ul>
                            <li><i><img src="../../img/14.jpg"/></i>酷玩趣味</li>
                            <li><i><img src="../../img/15.jpg"/></i>潮流服饰</li>
                            <li><i><img src="../../img/17.jpg"/></i>鞋履</li>
                            <li><i><img src="../../img/7.jpg"/></i>POP酒食</li>
                        </ul>
                    </div>

                    <div class="store_hot" id="wangu">
                        <div class="store_hot1">
                            <h3>本周热销</h3>
                            <router-link to="/hot">查看更多</router-link>
                        </div>
                        <div class="store_hot2">
                            <ul>
                                <li  v-for="(value,idx) in hotdata">
                                    <div>
                                        <img :src="src+value.img"/>
                                    </div>
                                    <div>
                                        <div class="store_hot2_content" id="yy">
                                            {{value.title}}
                                        </div>
                                        <div class="store_hot2_price">
                                            <div id="Oprice">原价:￥{{value.Oprice}}</div>
                                            <div id="wangu2">￥<span>{{value.price}}</span></div>
                                            <input type="button" value="购买" @click="tocart">
                                        </div>
                                    </div>                              
                                </li>
                                
                            </ul>
                        </div>
                    </div>

                    <div class="store_new">
                        <h3>最新商品</h3>
                        <span class="store_smallest">每天新品准时奉上</span>
                        <div class="store_new_div">
                            <ul>
                                <li v-for="(value,idx) in data" class="fl">
                                    <router-link to="/details"><img :src="src+value.img" @click="toDetails"></router-link>
                                    <p class="til">{{value.title}}</p>
                                    <div>￥<span>{{value.price}}</span></div>
                                    <i class="Oprice">原价:￥{{value.Oprice}}</i> 
                                </li>
                            </ul>
                        </div>
                    </div>
        </div>
    </div>
</template>
<script>
        import http from '../../utils/httpclient.js'
        import './store.css'

        export default {
            data:function(){
            return {
                    data:null,
                    src:'../../src/img/',
                    hotdata:[{id:1,title:'冬季男士卫衣,面料采用350g纯棉牛仔面料，衣服为宽松版型工艺上加上酵洗工艺处理，使用了两种款式扣子装饰。',price:388,img:'1.jpg',hot:'hot',Oprice:989},{id:2,title:'冬季男毛衣,PSO Brand 18SS工装牛仔夹克男徽章白色外套男潮牌港风情侣夹克',price:356,img:'2.jpg',hot:'hot',Oprice:779}],
                    src:'../../src/img/',
                }
            },
            mounted(){
                http.get('frontproducts').then((res) => {
                    if(res.data.status){
                        this.data =res.data.data;
                    }else(window.alert(res.data.error))
                })
            },
            methods:{
                toDetails:function(e){
                    sessionStorage.setItem("img",e.target.src);
                    sessionStorage.setItem("title",e.target.parentNode.nextElementSibling.innerText);
                    sessionStorage.setItem("price",e.target.parentNode.nextElementSibling.nextElementSibling.children[0].innerText);
                    sessionStorage.setItem("Oprice",e.target.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.innerText);
                },
                tocart:function(e){
                    sessionStorage.setItem("price",e.target.previousElementSibling.children[0].innerText);
                    sessionStorage.setItem("Oprice",e.target.previousElementSibling.previousElementSibling.innerText);
                    sessionStorage.setItem("title",e.target.parentNode.previousElementSibling.innerText);
                    sessionStorage.setItem("img",e.target.parentNode.parentNode.previousElementSibling.children[0].src);
                    location.href='#/details'
                }
            }
        }
</script>