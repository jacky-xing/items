<template>
    <div class="login">
    	<div class="touming">
    		
    	</div>
    	<div class="shangmian">
	        <h2 class="login_h">用户登录</h2>
	        <div class="user">
	            <label for="username"><img src="../../img/register_01.png"/></label><input type="text" id="username" class="put form-control" placeholder="用户名" v-model="username">
	        </div>
	        <div class="pass">
	            <label for="password"><img src="../../img/register_02.png"/></label><input type="password" id="password" class="put form-control" placeholder="密码" v-model="password">
	        </div>
	        <div class="loginbtn">
	            <input type="button" value="登录" class="btn-secondary btn-lg" id="tologin" @click="btn_login"> 
	        </div>
	        <div class="toreg">还没有账户?立即<router-link to="/reg">注册</router-link></div>   		
    	</div>
    </div>
</template>
<script>
    import http from '../../utils/httpclient.js'
    import router from '../../router/router'
    import './login.css'
    export default {
        data:function(){
            return {
                password:null,
                username:null
            }
        },
        methods:{
            btn_login:function(){
                http.get('login', {username: this.username, password: this.password}).then((res) => {
                    if(res.data.status){
                        window.sessionStorage.setItem('ytoken', res.data.data);
                        router.push('/');
                        sessionStorage.setItem("username",this.username);
                    }else(window.alert("用户名或者密码有误"))
                })
            }
        }
    }
</script>  