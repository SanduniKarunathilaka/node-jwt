const express = require("express");

const jwt = require('jsonwebtoken');

const app = express();

app.get("/",(req,res)=>{
    res.json( {msg:"hello world"})
})

app.post("/login",(req,res)=>{
    //req-->db-->true
    //generate token
    //sign userdata

    var userdata = { id:1,username:"Mary 2",age:23};

    jwt.sign ( {user:userdata},"secretkey",(err,token)=>{
        if(err){
            res.json({error:err})
        }
        else{
            res.json({token:token})
        }
    })
})

app.post("/save", verifyToken, (req,res)=>{

    jwt.verify(req.token,"secretkey",(err,data)=>{
        if(err){
            res.json({msg:"Access denied"})
        }
        else{
            res.json({msg:"data saved",data:data})
        }
    })
})

function verifyToken(req,res,next){

    if(typeof(req.headers['authorization']) != 'undefined' && req.headers['authorization'] != 'undefined'){

    var headerToken = req.headers["authorization"].split("")[1]

    if(headerToken !== 'undefined'){
        req.token = headerToken;
        next();
    }
    else{
        res.json({msg:"unauthorized request"})
    }
}
else{
    res.json({msg:"unauthorized request"})
}
}

app.listen(4000,()=>{
    console.log("app is listening for port 4000")
})