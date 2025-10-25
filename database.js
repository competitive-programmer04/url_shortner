const mongoose=require("mongoose");
const urlSchema=new mongoose.Schema({
    shorturlId:{
        type:String,
        unique:true,
        required:true
    },
    originalurl:{
        type:String,
        required:true,
    },
    visitcnt:{
        type:Number
    }
});
const url_table=mongoose.model("urls",urlSchema);
module.exports=url_table;
