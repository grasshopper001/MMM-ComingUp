var NodeHelper=require("node_helper");
var express=require("express");
var request=require("request");
var path=require("path");

module.exports=NodeHelper.create({
    defaults:{
        postURL:"http://47.96.26.134:3001/posts"
    },
    getPosts:function(callback){
        request({
            url:"http://47.96.26.134:3001/posts",
            json:true
        },(err,res,body)=>{
            //console.log(body);
            if(err){
                callback("connection to posts failed");
            }else{
                callback(undefined,body[body.length-1]);
            }
        })
    },
    socketNotificationReceived:function(notification,payload){
        switch(notification){
            case "update comingUp":
                this.getPosts((err,body)=>{
                    if(err){
                        console.log(err);
                    }else{
                        //console.log(body);
                        this.sendSocketNotification("comingUp",body);
                    }
                })
                break;
            default:
                break;
        }
    }
})