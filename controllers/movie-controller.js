const jwt= require ("jsonwebtoken");
const Movie = require ("../models/Movie");
const Admin= require ("../models/Admin")

const addMovie= async (req, res, next)=>{

    const extractedToken= req.headers.authorization.split(" ")[1];
    if(!extractedToken && extractedToken.trim()===" "){
        return res.status(404).json({message:"Token Not Found"});
    }

    //console.log(extractedToken) to get token inside the terminal we used this console.
    let adminId;

    //verify token
jwt.verify(extractedToken,process.env.SECRET_KEY,(err,decrypted)=>{
    if(err){
        return res.status(400).json({message:`${err.message}`});
    }else{
        adminId=decrypted.id;
        return;
    }
});
    //new movie creation
    const{title,description,releaseDate,posterUrl,featured, actors,admin}=req.body;

    if(!title && title.trim()==="" &&
    !description && description.trim()=="" &&
    !posterUrl && posterUrl.trim()=== ""){
        return res. status(422).json ({massage:"Invalide Inputs"});
    }

    let movie;
    try{
        movie= new Movie({
            title,
            description,
            posterUrl,
            releaseDate: new Date(`${releaseDate}`),
            featured,
            actors,
            admin:adminId,
        });
  movie= await movie.save();
    }catch(err){
        return console.log(err);
    }
    if(!movie){
        return res.status(500).json({massage:"Request Failed"});
    }
    return res.status(201).json({ movie});

};

const getAllMovies =async (req,res,next)=>{
    let movies;

    try{
        movies= await Movie.find();
    } catch(err){
    return console.log(err);
    }

if(!movies){
    return res.status(500).json({message:"Request Fail"})
}return res. status(200).json({movies});
};

const getMovieById = async (req,res,next)=>{
    const id=req.params.id;
    let movie;
    try{
        movie=await Movie.findById(id);
    }catch(err){
        return console.log(err);
    }
    if(!movie){
        return res.status(404).json({message:"Invalid Movie Id"})
    }
    return res. status(200).json({movie});

};

    module.exports={addMovie, getAllMovies, getMovieById};