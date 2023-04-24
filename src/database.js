const serve = process.env.DATABASE_SERVER ;
const database = process.env.DATABASE_NAME;
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