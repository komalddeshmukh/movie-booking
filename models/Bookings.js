const mongoose= require ("mongoose");

const bookingSchema= new mongoose.Schema({
    movie:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    seatNumber:{
        type:Number,
        required:true,
    },
    user:{
        type:String,
        required:true,
    },
});

module.exports = mongoose.model("Booking", bookingSchema);