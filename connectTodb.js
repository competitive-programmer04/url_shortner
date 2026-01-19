const mongoose=require("mongoose");
async function connectTomongodb(connection_url){
    await mongoose.connect(connection_url);
    console.log("connected with db");
}
module.exports={
    "connectwithdb":connectTomongodb
}
