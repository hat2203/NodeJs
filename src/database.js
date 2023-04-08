const serve = "mongodb://127.0.0.1:27017";
const database = "T2203E";
let mongoose = require("mongoose");//require("mongoose") la mot dang singerparten

class Database{
    constructor() {
        this.__connect();
    }
    __connect(){
        mongoose.connect(`${serve}/${database}`)
            .then(()=>{
                console.log("Connected database!");
            })
            .catch((err)=>{
                console.log(err);
            })
    }
}

module.exports = new Database();