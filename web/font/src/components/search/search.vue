<template id="wayslSearh">
	<div class="search">
		<div class="search_header">
            <router-link to="/"><input type="button" value="<" class="toback"></router-link>
			<div class="box-search">
				<input type="text" placeholder="搜索关键字或商品" v-model="title" @keyup="search" />
				<i class="icon-sousuo iconfont fan"></i>
			</div>
		</div>
		<div class="search_content">						
			<ul>
				<li v-for="(value,idx) in data">
                    <router-link to="/details"><img :src="imgsrc+value.img" @click="tocar"></router-link>
					<span>{{value.title}}</span>
					<div>￥<span>{{value.price}}</span></div>
                    <div id="rice">原价:￥{{value.Oprice}}</div>
				</li>
			</ul>
		</div>
		<spinner v-if="show"></spinner>
	</div>
</template>
<script>
	import './search.css'
	import http from '../../utils/httpclient.js'
    import spinner from '../spinner/spinner.vue'

     export default {
        components: {
            spinner
        },
        data:function(){
            return {
                data:null,
                imgsrc:'../../src/img/',
                show: false,
                title:"",
                src:'http://10.3.136.144:8080/frontdimproducts?title='
            }
        },
        methods:{
        	search:function(){
        		this.show=true;
	            http.get(this.src+this.title).then((res) => {
    	             if(res.data.status){
                        this.data =res.data.data;
                        this.show = false;
                    }else(window.alert(res.data.error))
	            })
        	},
            tocar:function(e){
                sessionStorage.setItem("img",e.target.src);
                sessionStorage.setItem("title",e.target.parentNode.nextElementSibling.innerText);
                sessionStorage.setItem("price",e.target.parentNode.nextElementSibling.nextElementSibling.children[0].innerText);
                sessionStorage.setItem("Oprice",e.target.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.innerText);
            }
        }
    }
</script>