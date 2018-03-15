const mongo = require("mongodb");
const client = mongo.MongoClient;
const ObjectID = mongo.ObjectID;

let db;

client.connect("mongodb://127.0.0.1:27017/project", function(_error, _db){
    if(_error){
        console.error(_error);
        return false;
    }
    db = _db;
});

module.exports = {

    // 查询
    select:(_collection, _condition) => {
        return new Promise((resolve, reject) => {console.log(_condition);
            db.db("project").collection(_collection).find(_condition).toArray((_error, _data) => {
                if(_error){
                    reject(_error);
                }else{
                    resolve(_data);
                }
            })
        })
    },

    // 更新
    update:(_collection, id, _condition) => {console.log(_condition, id);
        return new Promise((resolve, reject) => {
            db.db("project").collection(_collection).update({_id:id}, _condition).then((result, error) => {
                resolve(result);
            })
        })
    },

    // 插入
    insert:(_colletion, _condition) => {
        return new Promise((resolve, reject) => {
            db.db("project").collection(_colletion).insert(_condition).then((result,error) => {
                resolve(result);
                // console.log(result);
            })
        })
    },

    // 删除
    delete:(_collection, _condition) => {  console.log(_condition);
        return new Promise((resolve, reject) => {
            db.db("project").collection(_collection).remove(_condition).then((result, error) => {
                resolve(result);
            })
        })
    },

    // 对objectid进行转换
    objectid:(_id) => {
        return _id ? new ObjectID(_id) : new objectid();
    }
}