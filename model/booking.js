const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const BookingSchema=new Schema({
    customername: {
        type: String, 
    },
    location: {
        type: String,
    },
    seats: {
        type: String,
        required:true
    },
    customer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'customer'
    }],
    shows: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Show'
    }]
})

const Booking=mongoose.model('booking',BookingSchema);

module.exports= Booking;