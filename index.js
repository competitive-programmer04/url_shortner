try{
const express=require("express");
const path=require("path");
const shortId=require("shortid");
const url_table=require("./database.js");
const connectTomongodb=require("./connecttodb.js");
const app=express();
const PORT=8080;
connectTomongodb.connectwithdb("mongodb://localhost:27017/url_shortner")
app.use(express.json());
const module_path=path.join(__dirname,"public");
app.get("/",function(req,res){
    res.sendFile(path.join(module_path,"home.html"));
})
app.post("/getshorturl",async function(req,res){
    const shorturlid=shortId.generate();
    const shorturl=`http://localhost:8080/${shorturlid}`;
    await url_table.create({
      shorturlId:shorturlid,
      originalurl:req.body.URL,
      visitcnt:0   
    })
    console.log(shorturl);
    return res.status(200).json({
        message:shorturl
    });
})
app.get("/:id",async function(req,res){
    const shorturlid=req.params.id;
    const obj=await url_table.findOne({shorturlId:shorturlid});
    const redirecturl=obj.originalurl;
    obj.visitcnt=obj.visitcnt+1;
    await fetch(redirecturl,{
        method:"GET"
    })
    res.redirect(redirecturl);
})
app.listen(PORT,()=>{
    console.log(`Server is listening on PORT ${PORT}`);
})
}catch(err){
    console.log(err.message);
}
