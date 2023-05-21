const User =require ("../models/User");
const bcrypt=require ("bcryptjs");

const getAllUsers = async(req,res,next)=>{
    let users;
    try{
users=await User.find();
    }catch(err){
 console.log("err");
    }

if(!users){
    return res.status(500).json({massage:"Unexpected Error Occured"});
    
}
return res.status(200).json({users});
};



const signup=async(req,res,next)=>{
    const{name,email,password}=req.body;
    if(
        !name&& name.trim()===""&&
        !email&& email.trim()===""&&
        !password&& password.trim()===""
    ){
        return res.status(422).json({massage:"Invalid Inputes"});
    }
    const hashedPassword =bcrypt.hashSync(password);
let user;
try{
    user=new User({name,email,password:hashedPassword})
    user=await user.save();
}catch(err){
    return console.log("err");
}
if(!user){
    return res.status(500).json({massage:"unexpected error occured"});
}return res.status(201).json({user});

}

const updateUser =async(req,res,next)=>{
    const id= req.params.id;
    const{name,email,password}=req.body;
    if(
        !name&& name.trim()===""&&
        !email&& email.trim()===""&&
        !password&& password.trim()===""
    ){
        return res.status(422).json({massage:"Invalid Inputes"});
    }

    const hashedPassword =bcrypt.hashSync(password);

    let user;
    try{
        user=await User.findByIdAndUpdate(id,{
            name,
            email,
            password:hashedPassword,
        });
    }catch(errr){
        return console.log(errr);
    }
    if(!user){
        return res.status(500).json({massage:"Something Went Wrong"});
    }
    res.status(200).json({massage:"updated Successfully"})
};


const deleteUser=async(req, res, next)=>{
    const id=req.params.id;
    let user;
    try{
        user=await User.findByIdAndRemove(id);
    }catch(err){
        return console.log(err);
    }
    if(!user){
        return res.status(500).json({massage:"Something went wrong"})
    }
    return res.status(200).json({massage:"Deleted Successfully"});
};

const login=async(req,res,next)=>{
    const{email,password}=req.body;
    if(!email&& email.trim()===""&&
      !password&& password.trim()===""
    )
    {
        return res.status(422).json({massage:"Invalid Inputs"});
    }
    let existingUser;
    try{
        existingUser=await User.findOne({email});
    }catch(err){
        return console.log(err);
    }
    if(!existingUser){
     return res
    .status(404)
    .json({massage:"Unable to find user from this ID"});
    }
    const isPasswordCorrect=bcrypt.compareSync(password, existingUser.password);

    if(!isPasswordCorrect){
        return res.status(400).json({massage:"Incorrect Password"})
    }
    return res.status(200).json({massage:"login Successfully"});
};
module.exports = { getAllUsers, signup,updateUser, deleteUser, login}