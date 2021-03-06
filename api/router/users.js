const db = require("../db");
const jwt = require("jsonwebtoken");
const filter = require("../utils/filter.js");

module.exports = {

    register:(app) => {
        // 用户登录验证
        app.get("/login", (req, res) => {
            let username = req.query.username;
            let password = req.query.password;
            db.mongodb.select("users", {username, password}).then((result) => {
                let token="";
                var user = {username, password};
                if(result.length>0){
                    token = jwt.sign(user, 'secret', {
                     'expiresIn': 1440 // 设置过期时间
                    });
                }
                res.send({status:result && result.length > 0, data:token});
            })
        });


        // 用户注册
        app.get("/register", (req, res) => {
            let username = req.query.username;
            let password = req.query.password;
            db.mongodb.insert("users", {username, password}).then((result) => {
                res.send({status:true, data:result});
            })
        });


        //管理员登录查询
        app.get("/admin", (req, res) => {
            let username = req.query.username;
            let password = req.query.password;
            db.mongodb.select("admin", {username, password}).then((result) => {
                let token="";
                var user = {username, password};
                if(result.length>0){
                    token = jwt.sign(user, 'secret', {
                     'expiresIn': 1440 // 设置过期时间
                    });
                }
                res.send({status:result && result.length > 0, data:token});
            })
        });

    }
}