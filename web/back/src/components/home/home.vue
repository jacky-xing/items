<template>
	<div>
		<div class="header bg-primary">
			<jxheader></jxheader>
		</div>
		<div class="body" v-if="show">

			<div class="nav">
				<jxnav></jxnav>
			</div>
			<div class="container">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>



<script>
	import './home.css'
	import './header/header.scss'

	import http from '../../utils/httpclient.js'
	import jxheader from './header/header.vue'
	import jxnav from './nav/nav.vue'
	import Container from '../container/container.vue'
	import common from '../../common/common.js'
	import router from '../../router/router.js'

	export default {
		data(){
			return {
				shades: '',
				show: false,
			}
		},
		components: {
			jxheader,
			jxnav,
		},
		mounted(){
			http.get('products').then((res)=>{
				
				if(res.data.status){
					// 获取字典
					http.get('http://10.3.136.19:8182/src/dictionary/common.txt').then((res)=>{
						// 把字典添加到公共属性中
						this.$store.commit('getDictionary',res.data);
						this.show = !this.show;
					})
				}else{
					router.push({name:'login'})
				}
			})
			

		}
	}
</script>