<template>
	<div class="car">
		<div class="car_header">
            <router-link to="/"><input type="button" value="<" class="btn_car"></router-link>
			<p>购物车</p>
		</div>
		<div class="car_body" v-for="(value,idx) in data">
			<img :src="value.img">
			<div class="car_body_r">
                <div id="del"><i @click="del" :id="value._id">X</i></div> 
				<div class="car_body_r_t">
					<p class="car_body_r_t1">{{value.title}}</p>
					<div class="car_body_r_t2">
						<div class="color">颜色：白色 </div>
						<div class="size">-尺码：S</div>
					</div>
				</div>
				<div class="car_body_r_b">
					<div>￥{{value.price}}</div>
					<span class="btn">
						<input type="text" class="center fl" value=1>
					</span>
				</div>
			</div>
		</div>
		<div class="car_bottom">
			<div class="car_bottom2">
			<div class="total">总计：￥<span>{{total}}</span></div>
			</div>
			<div class="car_bottom3" @click="pay">去结算</div>
		</div>
	</div>
</template>
<script>
    import router from '../../router/router'
	import './shopCart.css'
    import http from '../../utils/httpclient.js'
	export default {
		data:function(){
            return {
                data:null,
                total:0,
            }
        },
        methods:{
            pay:function(){
            	window.alert("无需密码,您已经支付成功!!!")
            },
            del:function(e){
                http.get('delgenerateorder',{id:e.target.id}).then((res) => {
                    if(res.data.status){
                        http.get('selgenerateorder').then((res) => {
                            if(res.data.status){
                                this.data =res.data.data;
                                for(var i=0;i<this.data.length;i++){
                                   this.total+=this.data[i].price*1
                                };
                            }else{
                                router.push('login')
                            }
                        });
                    }
                })

            }
        },
        mounted(){
        	http.get('selgenerateorder').then((res) => {
                if(res.data.status){
                    this.data =res.data.data;
                    for(var i=0;i<this.data.length;i++){
                       this.total+=this.data[i].price*1
                    };
                }else{
                    router.push('login')
                }
            });
            
        }
	}
</script>
