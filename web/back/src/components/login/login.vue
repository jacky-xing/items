
<template>
	<div class="login-box">
		<div>
			<h3>登录</h3>
			<form role="form">
			    <div>
			        <label>用户名：</label>
			        <input type="text" v-model="username" class="username" name="username" placeholder="请输入用户名">
			    </div>
			    <div>
			        <label>密码：</label>
			        <input type="password" v-model="pwd" class="password" name="password" placeholder="请输入密码">
			    </div>
			    <div>
			    	<input type="button" value="登录" class="login" @click="login">
			    </div>
			</form>
		</div>
		<div class="copyright">2018 © the fifth group by www.fifth_group.com</div>
        <spinner v-if="show"></spinner>
	</div>
</template>

<script>
    import './login.scss'
    import http from '../../utils/httpclient.js'
    import router from '../../router/router.js'
    import spinner from '../spinner/spinner.vue'
    
    export default {
        data(){
            return {
                username: '',
                pwd: '',
                show: false
            }
        },
        components: {
            spinner,
        },
        methods: {
            login(){
                this.show = true;
                http.get('admin', {username: this.username, password: this.pwd}).then((res) => {
                    console.log(res);
                    this.show = false;
                    if(res.data.status){
                        window.sessionStorage.setItem('dktoken', res.data.data);
                        router.push({name: 'index'});
                    }else{
                        alert('登录信息错误')
                    }
                })
                // http.get('admin',{username:this.username,password: this.pwd}).then((res)=>{
                //     console.log(res);
                // })
                // router.push({name:'home'})
            }
        },
       
    }     
</script>