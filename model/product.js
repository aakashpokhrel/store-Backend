const mongoose= require('mongoose');
const Schema= mongoose.Schema;
const commentSchema=new Schema({
    text:{
        type:String,
        required:true
    },author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'customer'
    }
},{timestamps:true});
const ProductSchema=new Schema({
    sn: {
        type: Number
    },
    productname:{
        type:String
    },
    productprice:
    {
        type:Number
    },
    date:{
        type:Date,
        default:Date.now
    },
    bookings:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'booking'
    }]
})
const Product=mongoose.model('Product',ProductSchema);
module.exports= Product;