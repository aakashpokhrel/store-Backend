const express=require('express');
const router=express.Router();
const booking= require('../model/booking');
const customer=require('../model/customer');
const Product = require('../model/product');

router.route('/')
.get((req,res,next)=>
{
    booking.find()  //model Product and products is  is different
    .then((reserve)=>{
        res.json(reserve);
    }).catch(next);
})

.post((req,res,next)=>{
    console.log("eafaf",req.body)
    booking.create(req.body)
    .then(reserve =>{
        res.status(201).json(reserve)
    }).catch(next);
})

.delete((req,res,next)=>{
    booking.deleteMany()
    .then(reply=>{
        res.json(reply);
    }).catch(next);
})

router.route('/:booking_id')
.get((req,res,next)=>{
    booking.findById(req.params.booking_id)
    .then(reserve=>{
        res.json(reserve);
    }).catch(next);
        
})

.put((req,res,next)=>{
   booking.findByIdAndUpdate(req.params.booking_id,{$set:req.body},{new:true})
.then(updatedbooking=>{
    res.json(updatedbooking)
}).catch(next);
})

.delete((req,res,next)=>{
    booking.deleteOne({_id:req.params.booking_id})
    .then(reply=>{
        res.json(reply);
    }).catch(next);
})

//for foreign key one to many
router.route('/:booking_id/customer')
.get((req,res,next)=>{
    booking.findById(req.params.booking_id)
    .then(reserve=>{
        res.json(reserve.customer);
    }).catch(err => next(err));
})

.post((req ,res, next)=>{
    booking.findById(req.params.booking_id)
    .then(reserve=>{
        customer.create(req.body)
        .then(customer=>{
            reserve.customer.push(customer._id);
            reserve.save()
            .then(updatedbooking=>{
                res.status(201).json(updatedbooking.customer);
            }).catch(next);
        }).catch(next);
    }).catch(next);
})

.delete((req,res,next)=>{
    booking.findById(req.params.booking_id)
    .then(reserve=>{
        customer.deleteMany({_id:{$in:reserve.customer}})
        .then(reply=>{
            reserve.customer=[];
            reserve.save()
            .then(updatedbooking=>{
                res.json({reply,updatedbooking})
            }).catch(next);
        }).catch(next);
    }).catch(next);
})


router.route('/"booking_id/customer/:customer_id')
.get((req,res,next)=>{
    booking.findById(req.params.booking_id)
    .then(reserve=>{
        if(reserve.customer.includes(req.params.customer_id))
        {
            customer.findById(req.params.customer_id)
            .then(customer=>{
                res.json(customer);
            }).catch(next);
        }
        else{
            let err =new Error('customer not found');
            err.status(404);
            next(err);
        }
    }).catch(next);
})
.put((req,res,next)=>{
    booking.findById(req.params.booking_id)
    .then(reserve=>{
        if (reserve.customer.includes(req.params.customer_id))
        {
            customer.findByIdAndUpdate(req.params.customer_id,{$set:req.body},{new:true})
            .then(customer=>{
                res.json(customer);
            }).catch(next);
        }
        else{
            throw new Error('Not found!');
        }
    }).catch(next);
})

.delete((req,res,next)=>{
    booking.findById(req.params.booking_id)
    .then(reserve=>{
        if (reserve.customer.includes(req.params.customer_id))
        {
            customer.deleteOne({_id:req.params.customer_id})
            .then(reply=>{
                reserve.customer=reserve.customer.filter((value)=>{
                    return value != req.params.customer_id;
                })
                reserve.save()
                .then(updatedbooking=>{
                    res.json({reply,updatedbooking});
                }).catch(next);
            }).catch(next);
        }
        else{
            throw new Error ('Not found!');
        }
    })
})

//for product

router.route('/:booking_id/products')
.get((req,res,next)=>{
    booking.findById(req.params.booking_id)
    .then(reserve=>{
        res.json(reserve.products);
    }).catch(err => next(err));
})

.post((req,res,next)=>{
    booking.findById(req.params.booking_id)
    .then(reserve=>{
        Product.create(req.body)
        .then(Product=>{
            reserve.products.push(Product._id);
            reserve.save()
            .then(updatedbooking=>{
                res.status(201).json(updatedbooking.products);
            }).catch(next);
        }).catch(next);
    }).catch(next);
})

.delete((req,res,next)=>{
    booking.findById(req.params.booking_id)
    .then(reserve=>{
        Product.deleteMany({_id:{$in:reserve.products}})
        .then(reply=>{
            reserve.products=[];
            reserve.save()
            .then(updatedbooking=>{
                res.json({reply,updatedbooking})
            }).catch(next);
        }).catch(next);
    }).catch(next);
})

router.route('/"booking_id/products/:product_id')
.get((res,req,next)=>{
    booking.findById(req.params.booking_id)
    .then(reserve=>{
        if(reserve.products.includes(req.params.product_id))
        {
            Product.findById(req.params.product_id)
            .then(products=>{
                res.json(products);
            }).catch(next);
        }
        else{
            let err =new Error('product not found');
            err.status(404);
            next(err);
        }
    }).catch(next);
})
.put((req,res,next)=>{
    booking.findById(req.params.booking_id)
    .then(reserve=>{
        if (reserve.products.includes(req.params.product_id))
        {
            Product.findByIdAndUpdate(req.params.product_id,{$set:req.body},{new:true})
            .then(Product=>{
                res.json(Product);
            }).catch(next);
        }
        else{
            throw new Error('Not found!');
        }
    }).catch(next);
})

.delete((req,res,next)=>{
    booking.findById(req.params.booking_id)
    .then(reserve=>{
        if (reserve.products.includes(req.params.product_id))
        {
            Product.deleteOne({_id:req.params.product_id})
            .then(reply=>{
                reserve.products=reserve.products.filter((value)=>{
                    return value != req.params.product_id;
                })
                reserve.save()
                .then(updatedbooking=>{
                    res.json({reply,updatedbooking});
                }).catch(next);
            }).catch(next);
        }
        else{
            throw new Error ('Not found!');
        }
    })
})

module.exports=router;

