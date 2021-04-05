const express=require('express');
const router=express.Router();
const OnlineServices= require('../model/OnlineServices');


router.route('/')
.get((req,res,next)=>
{
    OnlineServices.find()  //model Show and concert is  the written object
    .then((services)=>{
        res.json(services);
    }).catch(next);
})

.post((req,res,next)=>{
    OnlineServices.create(req.body)
    .then(service =>{
        res.status(201).json(service)
    }).catch(next);
})

.delete((req,res,next)=>{
    OnlineServices.deleteMany()
    .then(reply=>{
        res.json(reply);
    }).catch(next);
})

router.route('/:services_id')
.get((req,res,next)=>{
    OnlineServices.findById(req.params.services_id)
    .then(service=>{
        res.json(service);
    }).catch(next);
        
})

.put((req,res,next)=>{
   OnlineServices.findByIdAndUpdate(req.params.services_id, {$set:req.body}, {new:true})
.then(updatedOnlineServices=>{
    res.json(updatedOnlineServices)
}).catch(next);
})

.delete((req,res,next)=>{
    OnlineServices.deleteOne({_id:req.params.services_id})
    .then(reply=>{
        res.json(reply);
    }).catch(next);
})
module.exports=router;