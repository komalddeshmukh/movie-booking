const Bookings= require ("../models/Bookings");
const Movie = require("../models/Movie");
const User = require("../models/User");
const { default: mongoose } = require("mongoose");


const newBooking=async (req,res,next)=>{
    const{movie,date,seatNumber,user}=req.body;
    let existingMovie;
    let existingUser;
    try{
        existingMovie=await Movie.findById(movie);
        existingUser=await User.findById(user);
    }catch(err){
        return console.log(err);
    }
    if(!existingMovie){return res.status(404).json({message:"Movie Not found with Given Id"})};

    if(!user){
        return res.status(404).json({message:"User not found with given Id"})
    }
    let booking;
    try{
        booking=new Bookings({
            movie,
            date: new Date(`${date}`),
            seatNumber,
            user
        });

        const session =await mongoose.startSession();
        session.startTransaction();
        existingUser.bookings.push(booking);
        existingMovie.bookings.push(booking);
        await existingUser.save({session});
        await existingMovie.save({session});
        await booking.save({session});
        session.commitTransaction();
    }catch(err){
        return console.log(err);
    }
    if(!booking){
        return res.status(500).json({message:"Unable to create Booking"})
    }

    return res.status(202).json({booking});
};

const getBooking=async (req,res,next)=>{
    const id=req.params.id;
    let booking;
    try{
         booking=await Bookings.findById(id);
    }catch(err){
        return console.log(err);
    }
    if(!booking){
        return res.status(500).json({message:"unexpected error"});
    }
    return res.status(200).json({booking});
};

const deleteBooking = async (req, res, next) => {
    const id = req.params.id;
    let booking;
    try {
      booking = await Bookings.findByIdAndRemove(id).populate("user movie");
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
  
      const session = await mongoose.startSession();
      session.startTransaction();
      if (booking.movie) {
        await booking.movie.bookings.pull(booking);
        await booking.movie.save({ session });
      }
      if (booking.user) {
        await booking.user.bookings.pull(booking);
        await booking.user.save({ session });
      }
      session.commitTransaction();
    } catch (err) {
      return console.log(err);
    }
  
    return res.status(200).json({ message: "Deleted successfully" });
  };
  
  module.exports = { newBooking, getBooking, deleteBooking };
  