const express = require("express");
const mongoose =require("mongoose");
const dotenv =require ("dotenv");
const userRouter  = require("./routes/user-routes");
const adminRouter = require("./routes/admin-routes");
const movieRouter = require("./routes/movie-routes");
const bookingsRouter = require("./routes/booking-routes");
dotenv.config();
const app=express();
app.use(express.json()) ;

//middlewares
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingsRouter);

mongoose.connect(`mongodb+srv://komal7840:${process.env.MONGODB_PASSWORD}@cluster0.ttpms5s.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>
app.listen(5000,()=>
    console.log("Connect to database and server is running")
)).catch((e)=>console.log(e));


//3VvMRpFTPVT5GW5q