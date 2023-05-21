const express= require ("express");
const { newBooking } = require("../controllers/booking-controller");

const bookingsRouter = express.Router();

bookingsRouter.post("/",newBooking);

module.exports = bookingsRouter;