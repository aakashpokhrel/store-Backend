const express=require('express');
const router=express.Router();
const Product= require('../model/product');
const booking= require('../model/booking');
const auth=require('./auth');
router.route('/')
.get((req,res,next)=>
{
    Product.find()  //model Product and products is  the written object
    .then((good)=>{
        res.json(good);
    }).catch(next);
})

.post((req,res,next)=>{
    Product.create(req.body)
    .then(good =>{
        res.status(201).json(good)
    }).catch(next);
})

.delete((req,res,next)=>{
    Product.deleteMany()
    .then(reply=>{
        res.json(reply);
    }).catch(next);
})

router.route('/:product_id')
.get((req,res,next)=>{
    Product.findById(req.params.product_id)
    .then(good=>{
        res.json(good);
    }).catch(next);
        
})

.put((req,res,next)=>{
    Product.findByIdAndUpdate(req.params.product_id, {$set:req.body}, {new:true})
.then(updatedProduct=>{
    res.json(updatedProduct)
}).catch(next);
})

.delete((req,res,next)=>{
    Product.deleteOne({_id:req.params.product_id})
    .then(reply=>{
        res.json(reply);
    }).catch(next);
})


// //foreign key one to many
router.route('/:product_id/bookings')
.get((req, res, next)=>{
    Product.findById(req.params.product_id)
    .then(good=>{
        res.json(good.bookings);
    }).catch(err => next(err));
})

.post((req ,res, next)=>{
    Product.findById(req.params.product_id)
    .then(good=>{
        booking.create(req.body)
        .then(booking=>{
            good.bookings.push(booking._id);
            good.save()
            .then(updatedProduct=>{
                res.status(201).json(updatedProduct.bookings);
            }).catch(next);
        }).catch(next);
    }).catch(next);
})
.delete((req,res,next)=>{
    Product.findById(req.params.product_id)
    .then(good=>{
        booking.deleteMany({_id:{$in:good.bookings}})
        .then(reply=>{
            good.bookings=[];
            good.save()
            .then(updatedProduct=>{
                res.json({reply,updatedProduct})
            }).catch(next);
        }).catch(next);
    }).catch(next);
})

router.route('/:product_id/bookings/:booking_id')
.get((req,res,next)=>{
    Product.findById(req.params.product_id)
    .then(good=>{
        if(good.bookings.includes(req.params.booking_id))
        {
            booking.findById(req.params.booking_id)
            .then(bookings=>{
                res.json(bookings);
            }).catch(next);
        }
        else{
            let err =new Error('bookings not found');
            err.status(404);
            next(err);
        }
    }).catch(next);
})
.put((req,res,next)=>{
    Product.findById(req.params.product_id)
    .then(good=>{
        if (good.bookings.includes(req.params.booking_id))
        {
            booking.findByIdAndUpdate(req.params.booking_id,{$set:req.body},{new:true})
            .then(booking=>{
                res.json(booking);
            }).catch(next);
        }
        else{
            throw new Error('Not found!');
        }
    }).catch(next);
})

.delete((req,res,next)=>{
    Product.findById(req.params.product_id)
    .then(good=>{
        if (good.bookings.includes(req.params.booking_id))
        {
            booking.deleteOne({_id:req.params.booking_id})
            .then(reply=>{
                good.bookings=good.bookings.filter((value)=>{
                    return value != req.params.booking_id;
                })
                good.save()
                .then(updatedProduct=>{
                    res.json({reply,updatedProduct});
                }).catch(next);
            }).catch(next);
        }
        else{
            throw new Error ('Not found!');
        }
    })
})
module.exports=router; 

