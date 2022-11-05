//jshint esversion:6

import dotenv from 'dotenv'
dotenv.config();
import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
const app=express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
//var encrypt = require('mongoose-encryption');
import encrypt from "mongoose-encryption";

/////////////////
app.get("/",function(req,res){
res.render("home");   ///rendering page to home 
})


app.get("/login",function(req,res){
    res.render("login");
    })

 app.get("/register",function(req,res){
        res.render("register");
  })
  app.post("/register",function(req,res){
  const newuser=new User({
  email:req.body.username,
  password:req.body.password
  });
  newuser.save(function(err){
    if(err){
        console.log(err);
    }
    else{
        res.render("secrets")
    }
  });
  });
  app.post("/login",function(req,res){

    const username=req.body.username;
    const password=req.body.password;
   User.findOne({email:username},function(err,founduser){
  if (err){
    console.log(err)
  }else{
if(founduser){
if(founduser.password===password){
    res.render("secrets");
}

}
  }

   });




  })
////////////

async function main() {

    mongoose.connect('mongodb://localhost:27017/userDB');

  }
  main().catch(err => console.log(err));


  const userschema=new mongoose.Schema({
  email:String,
  password:String

  });
  
  userschema.plugin(encrypt, { secret: process.env.SECRET ,encryptedFields : ["password"] });
  
  
  const User= mongoose.model("User",userschema);



 

                        







////server// 
app.listen(3000,function(){
    console.log("server started")
})
