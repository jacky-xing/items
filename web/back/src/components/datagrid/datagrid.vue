<template>
	<div class="datagrid">
		<div class="conHeader">
			<div class="conHeader_l fl top input-group">
				<input type="text" :placeholder="$store.state.header.dictionary[$store.state.header.lanType].search" class="form-control" ref="h-search-val" @keyup.enter="search"/>
				<input type="button" :value="$store.state.header.dictionary[$store.state.header.lanType].search" class="btn btn-primary" @click="search" />
			</div>
			<div class="conHeader_r fr top">
				<input type="button" :value="$store.state.header.dictionary[$store.state.header.lanType].add" @click="add" class="btn btn-primary" />
			</div>
			
		</div>
		<table class="table table-striped">
			<thead>
				<tr>
					<th v-for="(val,key) in $store.state.common.dataset[0]" v-if="arr.indexOf(key)> -1">
					{{$store.state.header.dictionary[$store.state.header.lanType][key] || key}}
					</th>
					<th>{{$store.state.header.dictionary[$store.state.header.lanType].opera}}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(obj,idx) in $store.state.common.dataset">
					<td v-for="(val,key) in obj" v-if="arr.indexOf(key) > -1">
						{{val}}
					</td>
					<td>
                        <input type="button" @click="compile(idx)" :value="$store.state.header.dictionary[$store.state.header.lanType].compile" class="btn btn-secondary"/>
                        <input type="button" @click="delTr(idx)" :value="$store.state.header.dictionary[$store.state.header.lanType].del" class="btn btn-danger" />
                    </td>
				</tr>
			</tbody>
		</table>
		<div class="pageBox">
			<ul class="pagination">
				<li class="page-item prev" @click="prev">
			      	<a class="page-link" href="#" aria-label="Previous">
				        <span aria-hidden="true">&laquo;上一页</span>
				        <span class="sr-only">Previous</span>
			      	</a>
			    </li>
				<li v-for="(val) in $store.state.common.pageAll" :class="objPage" @click="changePage(val)" ref="arrPage">
					<span class="page-link">{{val}}</span>
				</li>
			    <li class="page-item next" @click="next">
			      <a class="page-link" href="#" aria-label="Next">
			        <span aria-hidden="true">下一页&raquo;</span>
			        <span class="sr-only">Next</span>
			      </a>
			    </li>
			    <li class="page-item">
			    	<span>共有{{$store.state.common.proCount}}条记录</span>
			    </li>
			    <!-- <li class="page-item">...</li> -->
			</ul>
		</div>

		<compileBox v-if="$store.state.common.shade" :currentDate="this.$store.state.common.dataset[dataNum]" v-on:box="changeBox" v-on:appliys="appliys" :pro="$store.state.common.pro"></compileBox>
		<spinner v-if="show"></spinner>
	</div>
</template>

<script>

	import http from '../../utils/httpclient.js'
	import common from '../../common/common.js'
	import './datagrid.scss'

	import compileBox from '../compile/compile.vue'
	import spinner from '../spinner/spinner.vue'
	// import pageBox from '../page/page.vue'


	export default {
		data(){
			return {
				dataset:[],
				arr:['title','price','Oprice','hot'],
				show: true,
				showBox:common.state.shade,
				dataNum:0,
				objPage: {
					"page-item": true,
				},
				// upd: true

			}
		},
		methods:{
			compile(n){
				// this.showBox = !this.showBox;
				this.$store.commit('getShade');
				this.dataNum = n;

			},
			changeBox(){
				this.showBox = !this.showBox;
			},
			delTr(n){
				// this.$store.state.common.dataset.splice(n,1);
				// 获取当前商品
				var cur = this.$store.state.common.dataset[n];
				console.log(cur);
				http.get('delproduct',{id: cur._id}).then((res)=>{
					
					if(res.data.status){
						let Store = this.$store;
						// this.$options.methods.appliys(Store);
						// console.log(this.$refs.arrPage);

						// if(filp){
							// console.log(11)
							// 获取当前页码
							let currentPage;
							for(let i=0;i<this.$refs.arrPage.length;i++){
								if(this.$refs.arrPage[i].classList.contains('active')){
									currentPage = i+1;
								}
							}
							Store.state.common.pageNo = currentPage;
						// }
						
						// 请求当前页码的数据
						http.get('products',{page: Store.state.common.pageNo,limit:Store.state.common.limit}).then((res)=>{
							// 把(显示)商品数据赋值到common上成公共属性
							Store.commit('getData',res.data.data);
							// 把商品总数量赋值到common上成公共属性
							Store.commit('putProCount',res.data.count);

							// 把生成商品总页数赋值到common上成公共属性
							var num = Math.ceil(res.data.count/Store.state.common.limit);
							Store.commit('putPageAll',num);
							

							
							this.show = false;
							console.log(' appliys end ');
						});



					}
				})
				
			},
			add(){
				// 显示编辑框和遮罩层
				this.$store.commit('getShade');
				this.$store.state.common.pro = !this.$store.state.common.pro;
				// console.log(this.$store.state.common.pro);
				// http.get('addproduct')
				// var Store = this.$store;
				// // 调用组件的appliys方法
				// this.$options.methods.appliys(Store);
				
			},
			search(){
				let searVal = this.$refs["h-search-val"].value || '';

				http.get('dimproducts',{title:searVal}).then((res)=>{
					console.log(res);
					this.$store.commit('getData',res.data.data);
					this.$store.commit('putProCount',res.data.count);
					var num = Math.ceil(res.data.count/this.$store.state.common.limit);
					this.$store.commit('putPageAll',num);

					this.show = false;
				})
			},
			changePage(n){

				var currentPage = this.$refs.arrPage[n-1];
				for(var i=0;i<this.$refs.arrPage.length;i++){
					if(currentPage == this.$refs.arrPage[i]){
						this.$refs.arrPage[i].classList.add('active')
					}else{
						this.$refs.arrPage[i].classList.remove('active');
					}
				}
				
				this.show = true;
				http.get('products',{page: n,limit: this.$store.state.common.limit}).then((res)=>{
					this.$store.commit('putProCount',res.data.count);
					

					this.$store.commit('getData',res.data.data);
					this.show = false;
				})
				// var cut = this.$refs.arrPage[1].classList.contains('active');
				// console.log(cut)
				
			},

			prev(){
				
				for(var i=1;i<this.$refs.arrPage.length;i++){

					if(this.$refs.arrPage[i].classList.contains('active')){
						
						this.show = true;
						http.get('products',{page: i,limit: this.$store.state.common.limit}).then((res)=>{
							this.$store.commit('putProCount',res.data.count);
							this.$store.commit('getData',res.data.data);
							this.show = false;

							

						})
						// 页码高亮切换
						this.$refs.arrPage[i-1].classList.add('active');
						for(var j=0;j<this.$refs.arrPage.length;j++){
							if(j === i-1){
								this.$refs.arrPage[j].classList.add('active');
							}else{
								this.$refs.arrPage[j].classList.remove('active');
							}
						}
					}
				}
			},
			next(){
				
				for(var i=this.$refs.arrPage.length-2;i>=0;i--){

					if(this.$refs.arrPage[i].classList.contains('active')){
						// console.log(i);
						this.show = true;
						http.get('products',{page: i+2,limit: this.$store.state.common.limit}).then((res)=>{
							this.$store.commit('putProCount',res.data.count);
							this.$store.commit('getData',res.data.data);
							this.show = false;

							

						})
						// 页码高亮切换
						this.$refs.arrPage[i+1].classList.add('active');
						for(var j=0;j<this.$refs.arrPage.length;j++){
							if(j === i+1){
								this.$refs.arrPage[j].classList.add('active');
							}else{
								this.$refs.arrPage[j].classList.remove('active');
							}
						}
					}
				}
			},

			// 请求数据(刷新页面)
			appliys(Store,filp=true){
				// if(filp){
					// console.log(11)
					// 获取当前页码
					let currentPage;
					for(let i=0;i<this.$refs.arrPage.length;i++){
						if(this.$refs.arrPage[i].classList.contains('active')){
							currentPage = i+1;
						}
					}
					Store.state.common.pageNo = currentPage;
				// }
				
				// 请求当前页码的数据
				http.get('products',{page: Store.state.common.pageNo,limit:Store.state.common.limit}).then((res)=>{
					// 把(显示)商品数据赋值到common上成公共属性
					Store.commit('getData',res.data.data);
					// 把商品总数量赋值到common上成公共属性
					Store.commit('putProCount',res.data.count);

					// 把生成商品总页数赋值到common上成公共属性
					var num = Math.ceil(res.data.count/Store.state.common.limit);
					Store.commit('putPageAll',num);
					

					
					this.show = false;
					console.log(' appliys end ');
				});
				

			}
		},
		components: {
			compileBox,
			spinner,
			// pageBox,
		},
		mounted(){
			// console.log(this.$options.methods);
			var States = this.$store.state;
			http.get('products',{page: States.common.pageNo,limit:States.common.limit}).then((res)=>{
				// 把商品数据赋值到common上成公共属性
				this.$store.commit('getData',res.data.data);
				// 把商品总数量赋值到common上成公共属性
				this.$store.commit('putProCount',res.data.count);

				// 把生成商品总页数赋值到common上成公共属性
				var num = Math.ceil(res.data.count/States.common.limit);
				this.$store.commit('putPageAll',num);

				// 使用演示器先让页面生成dom节点
				setTimeout(()=>{
					this.$refs.arrPage[0].classList.add('active');
				},10)
				
				this.show = false;
			});
	
		}
	}
</script>