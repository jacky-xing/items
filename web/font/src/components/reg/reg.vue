<template>
    <div class="reg">
    	<div class="black"></div>
    	<div class="shang">
	        <h2>用户注册</h2>
	        <div class="regbox">
	            <label for="username">用户名</label><input type="text" id="username" class="put form-control" @change="name" v-model="username" ref="username" placeholder="字母开头,长度6-20">
	        </div>	
	        <div class="regbox">
	            <label for="password">密码</label><input type="password" id="password" class="put form-control" @change="word" ref="pass" v-model="password" placeholder="长度6-20">
	        </div>
	        <div class="regbox">
	            <label for="password1">确认密码</label><input type="password" class="put form-control" v-model="password1" ref="pass1" @change="word1" id="password1" placeholder="请再次输入密码"> 
	        </div>
	        <div class="regbox">
	            <label for="email">邮箱</label><input type="email" class="put form-control" ref="eml" id="email" @change="mail" v-model="email" placeholder="请输入正确邮箱">
	        </div>
	        <div class="regbox codebox">
	        <label for="codec">验证码</label><div class="fr">{{code}}</div><input type="text" class="put code form-control" id="codec" v-model="code1" ref="codef" @change="codeb">
	        </div>
	        <div class="loginbtn">
	            <input type="button" value="注册" class="btn-secondary btn-lg" id="tologin" @click="btn_reg"> 
	        </div>
	        <div class="toreg">
	            已有帐号?立即<router-link to="/login">登录</router-link>
	        </div>
    	</div>
    </div>
</template>
<script>
    import './reg.css'
    import http from '../../utils/httpclient.js'
    import router from '../../router/router'
    export default {
        data:function(){
            return {
                username:null,
                password:null,
                password1:null,
                email:null,
                code1:null,
                code:null
            }
        },
        methods:{
            name:function(){
               if(!/^[a-z][a-z0-9\-]{5,19}$/.test(this.username)){
                   // 验证账号 ：  
                   //     * 不能为空，
                   //     * 不能使用特殊字符（数字、字母、横杠），
                   //     * 必须以字母开头，
                   //     * 长度6-20
                    alert('用户名不合法');
                    this.username=null;
                    this.$refs.username.focus();
                }
            },
            word:function(){
                //密码  
                //    长度6-20 
                //    不能包含空格
                if(!/^[^\s]{6,20}$/.test(this.password)){
                    alert('密码不合法');
                    this.password=null;
                    this.$refs.pass.focus();
                }
            },
            word1:function(){
                if(this.password!=this.password1){
                    alert('密码不一致');
                    this.password1=null;
                    this.$refs.pass1.focus();
                }
            },
            mail:function(){
                if(!/^[a-z0-9_\-\.]{2,}@[a-z\d\-]{1,63}(\.[a-z\u2E80-\u9FFF]{2,6})+$/.test(this.email)){
                    //电子邮件
                        //@qq.com
                        //@163.com
                        //@a-r.com.cn
                    alert('邮箱不合法');
                    this.email=null;
                    this.$refs.eml.focus();
                }
            },
            codeb:function(){
                if(this.code!=this.code1){
                    alert('验证码错误');
                    this.code1=null;
                    this.$refs.codef.focus();
                }
            },
            btn_reg:function(){
                http.get('register',{username: this.username, password: this.password}).then((res) => {
                    if(res.data.status){
                        router.push('login')
                    }
                })
            }
        },
        mounted(){
            var res = '';
            for(var i=0;i<4;i++){
                 res += parseInt(Math.random()*10);
            }
            this.code=res;
            //随机验证码
        }
    }
</script>  