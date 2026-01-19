import express from "express";
import cors from "cors";
import shortId from "shortid";
import {supabase} from "./supabaseClient.js";

const app=express();
app.use(cors());
app.use(express.json());
const port=process.env.PORT;

app.post("/shorten",async (req,res)=>{
    const OriginalUrl=req.body.originalUrl;
    console.log(OriginalUrl);
    console.log("original url is received")
    const {data,error}=await supabase.from("urls").select("short_id").eq("original_url",OriginalUrl);
    try{
        if(error){
            console.log(error.message);
        throw new Error(error.message);
    }
    else{
        if(data[0]&&data.length>0){
            return res.status(200).json({
                shortUrl:`http://localhost:3000/${data[0].short_id}`
            })
        }
        else{
            const short_id=shortId.generate();
            console.log(short_id)
            const {error}=await supabase.from('urls').insert({original_url:OriginalUrl,short_id:short_id,visit_cnt:0});
            try{
            if(error){
                throw new Error(error.message);
            }
            else{
                return res.status(201).json({
                   shortUrl:`http://localhost:3000/${short_id}`
                })
            }
            }catch(errorMessage){
                console.log("error1")
                console.log(errorMessage);
                return res.status(500).json({
                    "message":"Something wrong happen please try again later"
                })
            }
        }
     }
    }catch(errorMessage){
      console.log("error2");
        console.log(errorMessage);
                return res.status(500).json({
                    "message":"Something wrong happen please try again later"
                })
    }
});

app.get("/:id",async (req,res)=>{
    const short_Id=req.params.id;
    const {data,error}=await supabase.from("urls").select("original_url,visit_cnt").eq("short_id",short_Id);
    try{
        if(error||!data[0].original_url){
            throw new Error(error);
        }
        else{
            const RedirectUrl=data[0].original_url;
            const VisitCnt=data[0].visit_cnt;
            supabase .from('urls').update({visit_cnt:VisitCnt+1}).eq("short_id",short_Id).then(({error})=>{
                if(error) console.log("Error updating count:",error.message);
            })
            // if(error){
            //     //throw new Error(error);
            //     console.log(error);
            // }
            // await fetch(RedirectUrl,{
            //     method:"GET",
            //     headers:{
            //         "content-type":"application/json"
            //     }
            // })
            try{
                res.redirect(RedirectUrl);
            }catch(err){
                console.log("error on redirecting the client to original_url");
                return res.status(500).json({
                    "message":"Internal Server Error"
                })
            }
        }
    }catch(error){
        console.log(error);
        return res.status(404).json({
            "message":"URL not found"
        })
    }
});
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})