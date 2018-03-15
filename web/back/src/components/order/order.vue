<template>
	<div>
		<table class="table table-striped">
			<thead>
				<tr>
					<th v-for="(val,key) in goods[0]" v-if="config.indexOf(key) > -1">{{$store.state.header.dictionary[$store.state.header.lanType][key] || key}}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(obj,idx) in goods" >
					<td v-for="(val,key) in obj" v-if="config.indexOf(key) > -1">{{val}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>


<script>

	import http from '../../utils/httpclient.js'
	import router from '../../router/router.js'

	export default {
		data(){
			return {
				goods:[],
				config: ['title','price','Oprice']
			}
		},
		mounted(){
			http.get('order').then((res)=>{
				console.log(res.data);
				if(res.data.status){
					this.goods = res.data.data
				}else{
					router.push({name:'index'})
				}
			})
		}
	}
</script>