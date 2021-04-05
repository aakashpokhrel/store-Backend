const express= require('express');
const router=express.Router();
const customer=require('../model/customer');
const bcrypt=require('bcryptjs');
const jwt =require ('jsonwebtoken');

const validators=require('../utils/validators');

//for register
router.post('/register',(req,res,next)=>{  
   let {errors,isValid} =validators.RegisterInput(req.body);
   if(!isValid){
       return res.status(400).json({
           status:'error',
           message:errors
        });
   }
    let {username,password,fname,lname,email, role}=req.body;
        customer.findOne({username})
        .then(user=>{
            if(user){
                let err = new Error('Username already exists!');
                err.status = 400;
                return next(err);
            }
            bcrypt.hash(password,10)
                .then((hash)=>{
                    customer.create ({username,password:hash,fname,lname,email,role})
                    .then(user=>{
                    res.status(201).json({"status":"Register Success"});
                })
            })
        }).catch(next);
    
    });
//for login
router.post('/login',(req,res,next)=>{
   
    customer.findOne({ username: req.body.username })
    .then((user) => {
        if (user === null) {
            let err = new Error('User not found!'); 
            err.status = 401;
            return next(err);
        }
        bcrypt.compare(req.body.password, user.password, function (err, status) {
            if (!status) {
                let err = new Error('Password does not match!');
                err.status = 401;
                return next(err);
            }
            let token = jwt.sign({ userId: user._id,role:user.role },'SecretKey');
            res.json({ status: 'Login Successful!',success:true, token: token });
        });
    }).catch(next);

});

module.exports=router;