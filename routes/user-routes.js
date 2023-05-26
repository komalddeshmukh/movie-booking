const express = require("express");
const { getAllUsers, signup, updateUser,deleteUser, login, getBookingsOfUser } = require("../controllers/user-controller");

const userRouter=express.Router();
userRouter.get("/",getAllUsers);
userRouter.post("/signup",signup);
userRouter.put("/:id",updateUser);
userRouter.delete("/:id",deleteUser);
userRouter.post("/login",login);
userRouter.get("/bookings/:id",getBookingsOfUser);

module.exports = userRouter;