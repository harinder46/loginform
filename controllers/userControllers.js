const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("user already exits");
    }

    const user = await User.create({
        name,email,password,
    })

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token: generateToken(user._id),

        })
    }
    else {
        res.status(404);
        throw new Error("error occured");
    }
    // res.json({
    //     name,
    //     email,
    // });
}

const authUser = async (req, res) =>{
  const { email, password} = req.body;

  const user = await User.findOne({ email });

  if ( user && (await user.matchPassword(password))){
      res.json({
        _id:user._id,
        name:user.name,
        email:user.email,
        token: generateToken(user._id),


      })
  }else {
    res.status(404);
    throw new Error("error occured");
}
}

module.exports = {registerUser, authUser}