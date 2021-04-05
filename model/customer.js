const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const customerSchema=new Schema({
        fname:{
            type:String,
            required:true

        }, lname:{
            type:String,
            required:true
        },email:{
            type:String,
            required:true
        }, username:{
            type:String,
            required:true,
            minlength:6        
        },password:{
            type:String,
            required:true
        },role:{
            type:String,
            default:'user',
            enum:['user','performer','admin'] 
        },bookings:[{
            type:mongoose.Schema.Types.ObjectId,
           ref:'booking',
        }],show:[{
            type:mongoose.Schema.Types.ObjectId,
           ref:'Show'
     }]
}

,{timestamps:true})
module.exports=mongoose.model('customer',customerSchema);