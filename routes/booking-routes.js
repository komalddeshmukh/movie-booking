const express= require ("express");
const { newBooking, getBooking, deleteBooking, } = require("../controllers/booking-controller");

const bookingsRouter = express.Router();


bookingsRouter.post("/",newBooking);
bookingsRouter.get("/:id",getBooking);
bookingsRouter.delete("/:id",deleteBooking);


module.exports = bookingsRouter;