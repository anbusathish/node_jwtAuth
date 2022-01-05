const express = require('express');
const route = express.Router();
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const { router } = require('../app');
const auth = require('../middleware/auth');



route.get('/', (req, res)=>{

    res.send('hi');

});

route.post('/register', async  (req, res)=>{

  try {

    const { first_name, last_name, email, password } = req.body;

    if(!(first_name && last_name && email && password))
    {
      return res.status(400).send('All fields required');
    }
    //Check user already exists
    const OldUser = await User.findOne({email});  

    if(OldUser)
    {
       res.status(409).send('User Already exists. Please login');
    }

      //Password Encrypter
      encryptPassword = await bcrypt.hash(password, 10);

      //Create User
      const user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(),
        password: encryptPassword

      });

      //Create Token
      const token = jwt.sign({user_id: user._id, email },process.env.TOKEN_KEY,{expiresIn: '2h'});
      //save user token
      user.token = token;

     //return user Details 
     res.status(201).send(user);
    //  return res.send(user);

  } catch(error)
  {
    console.log(error);
  }
   
})

route.post('/login', async (req, res) =>{

  try{

    const {email, password} = req.body;

    if(!(email && password)){
       res.status(400).send('All fields required');
    }

    //check Already exists
    const user = await User.findOne({email: email});

    if(user && (bcrypt.compare(password, user.password)))
    {
      //Create TokenKey
      const token = jwt.sign({user_id:user._id,email},process.env.TOKEN_KEY, { expiresIn: '2h'});
      //save Token
      user.token = token;
      res.status(200).send(user);
    }

    res.status(400).send('Invalid credentials');

  } catch(error){
    console.log(err);
  }

})

route.post('/welcome', auth, (req, res)=>{
  console.log(req.user);
  res.status(200).send('welcome');
})


module.exports = route;