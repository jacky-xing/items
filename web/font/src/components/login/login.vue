<template>
    <div class="login">
        <h2>用户登录</h2>
        <div class="user">
            <label for="username">用户名</label><input type="text" id="username" class="put" placeholder="请输入用户名" v-model="username">
        </div>
        <div class="pass">
            <label for="password">密码</label><input type="password" id="password" class="put" placeholder="请输入密码" v-model="password">
        </div>
        <div class="loginbtn">
            <input type="button" value="登录" id="tologin" @click="btn_login"> 
        </div>
        <div class="toreg">
            还没有账户?立即<router-link to="/reg">注册</router-link>
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
                    console.log(res.data)
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