const Bookings= require ("../models/Bookings");


const newBooking=async (req,res,next)=>{
    const{movie,date,seatNumber,user}=req.body;
    let booking;
    try{
        booking=new Bookings({
            movie,
            date: new Date(`${date}`),
            seatNumber,
            user
        });
        booking=await booking.save();
    }catch(err){
        return console.log(err);
    }
    if(!booking){
        return res.status(500).json({message:"Unable to create Booking"})
    }

    return res.status(202).json({booking});
};

module.exports={newBooking};