const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const OnlineServicesSchema=new Schema({
    venue: {
        type: String
    },
    ticketrate:{
        type:Number
    },
    date:{
        type:Date,
        default:Date.now
    },
     description:{
         type:String
     }
})

const OnlineServices=mongoose.model('OnlineServices',OnlineServicesSchema);

module.exports= OnlineServices;