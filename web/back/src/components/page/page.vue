<template>
	<div>
		<div class="pageBox">
			<ul class="pagination">
				<li class="page-item">
			      	<a class="page-link" href="#" aria-label="Previous">
				        <span aria-hidden="true">&laquo;上一页</span>
				        <span class="sr-only">Previous</span>
			      	</a>
			    </li>
				<li v-for="val in $store.state.common.pageAll" :class="objPage" @click="changePage(val)" ref="arrPage">
					<span class="page-link">{{val}}</span>
				</li>
			    <li class="page-item">
			      <a class="page-link" href="#" aria-label="Next">
			        <span aria-hidden="true">下一页&raquo;</span>
			        <span class="sr-only">Next</span>
			      </a>
			    </li>
			    <li class="page-item">
			    	<span>共有{{$store.state.common.proCount}}记录</span>
			    </li>
			    <!-- <li class="page-item">...</li> -->
			</ul>
		</div>
	</div>
</template>


<script>

	import './page.scss'
	import http from 'axios'

	export default {
		data(){
			return {

			}
		},
		methods(){
			changePage(n){

				this.show = true;
				var currentPage = this.$refs.arrPage[n-1];
				for(var i=0;i<this.$refs.arrPage.length-1;i++){
					if(currentPage == this.$refs.arrPage[i+1]){
						this.$refs.arrPage[i+1].classList.add('active')
					}else{
						this.$refs.arrPage[i+1].classList.remove('active');
					}
				}
				
				http.get('products',{page: n,limit: this.$store.state.common.limit}).then((res)=>{
					this.$store.commit('putProCount',res.data.count);
					

					this.$store.commit('getData',res.data.data);
					this.show = false;
				})
				
			},
		},
		mounted(){
			console.log(1111);
		}
	}
</script>