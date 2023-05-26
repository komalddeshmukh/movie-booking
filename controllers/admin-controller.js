const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");

const addAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && email.trim() === "" &&
   !password && password.trim() === "") {
    return res.status(422).json({ massage: "Invalid Inputs" });
  };
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email});
  } catch (err) {
    return console.log(err);
  }

  if (existingAdmin) {
    return res.status(400).json({ massage: "Already exist" });
  }
  
  let admin;
  const hashedPassword = bcrypt.hashSync(password);
  try {
    admin = new Admin({ email, password:hashedPassword });
    admin = await admin.save();
  } catch (err) {
    return console.log(err);
  }
  if (!admin) {
    return res.status(500).json({ massage: "Unable to store Admin" });
  }
  return res.status(201).json({ admin: admin });
};

const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ massage: "Invalid Inputs" });
  }

  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    return console.log(err);
  }

  if (!existingAdmin) {
    return res.status(400).json({ massage: "admin not found" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingAdmin.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ massage: "Invalid Password" });
  }
  const token =jwt.sign({id:existingAdmin._id},process.env.SECRET_KEY,{expiresIn:"7d",
});

  return res.status(200).json({ massage: "Authentication complete", token, id:existingAdmin._id});
};

const getAdmins = async (req, res, next)=>{
  let admins;
  try{
    admins = await Admin.find();
  }catch(err){
    console.log(err)
  }
  if(!admins){
    return res.status(500).json({message:"internal error"});
  }
  return res. status(200).json({admins})

}
module.exports = { addAdmin, adminLogin, getAdmins};
