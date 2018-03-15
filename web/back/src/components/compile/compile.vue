<template>
	<div class="t_box">
		<div class="shade">	
		</div>
		<div class="showBox" ref="showBox" style="transform:translate(-50%,-50%)">
			<h2>{{$store.state.header.dictionary[$store.state.header.lanType]["add product"]}}</h2>
			<div v-for="(val,key) in currentDate" v-if="arr.indexOf(key) > -1" class="ipt">
				<label :for="key">{{key}}:</label>
				<input type="text" :placeholder="val" ref="showPar">
			</div>
			<p class="showBox_b">
				<input type="button" :value="$store.state.header.dictionary[$store.state.header.lanType].sure" @click="sure" class="btn btn-success"/>
				<input type="button" :value="$store.state.header.dictionary[$store.state.header.lanType].cancel" @click="cancel" class="btn btn-danger"/>
			</p>
			<span class="cancel" @click="cancel">&times;</span>
		</div>
		<spinner v-if="show"></spinner>
	</div>
</template>

<script>
	import './compile.scss'
	import common from '../../common/common.js'
	import http from '../../utils/httpclient.js'

	import spinner from '../spinner/spinner.vue'


	export default {
		data(){
			return {
				objGood:{},
				arr: ['title','price','Oprice','hot'],
				show: false
			}
		},
		props: ['currentDate','pro'],
		components:{
			spinner,
		},
		methods:{
			sure(){
				// key值
				// var arr = Object.keys(this.currentDate);
				// var _idx = arr.indexOf('_id');
				// arr.splice(_idx,1);
				// console.log(arr)

				// console.log(this.pro);
				for(var i=0;i<this.$refs.showPar.length;i++){
					this.objGood[this.arr[i]] = this.$refs.showPar[i].value || this.$refs.showPar[i].placeholder;
				}
				var obj = Object.assign({},this.currentDate,this.objGood);
			
				if(this.pro){
					
					// 编辑更改数据
					http.get('updproduct',obj).then((res)=>{
						if(res.data.status){
							// console.log(111);
							// 调用父组件的方法
							// var Store = this.$store;
							// this.$emit('appliys',Store);
						}
					})
				}else{
					// 添加数据
					let addObj = {};
					// 去掉属性_id
					for(var key in obj){
						if(key !== '_id'){
							addObj[key] = obj[key]
						}
					}
					

					http.get('addproduct',addObj).then((res)=>{
						if(res.data.status){
							//调用父组件的方法
							// console.log(222);
							// var Store = this.$store;
							// this.$emit('appliys',Store);
							this.$store.state.common.pro = !this.$store.state.common.pro;
							// console.log(this.$store.state.common.pro);
						}
					})
				}

				var Store = this.$store;
				this.$emit('appliys',Store);

				
				
				// 关闭编辑窗口
				this.$store.commit('getShade');
				
			},
			cancel(){
				this.$store.commit('getShade');
				if(!this.pro){
					// 切换编辑与添加的状态
					this.$store.state.common.pro = !this.$store.state.common.pro;
				}
				
			}
		},
		mounted(){
			// 样式
			
			
		}
	}
</script>