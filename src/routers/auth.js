const Router = require('express').Router;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = Router();

router.post('/signup',async (req,res)=>{
  try{
      const user = new User(req.body);
      WelcomeEmail(user.email,user.name)
      const token = await user.getAuthToken()
      res.status(201).send({user,token});
  }catch(e){
      res.status(400).send(e);
  }
})
router.post('/login',async (req,res)=>{
  try{
      const user = await User.findByCredentials(req.body.email,req.body.password)
      const token = await user.getAuthToken()
      res.send({user,token});
  }catch(e){
      res.status(400).send(e);
  }
})
router.post('/logout',auth,async (req,res)=>{
  try{
  const user = req.user;
  user.tokens = user.tokens.filter((obj)=> obj.token !== req.token)
  await user.save();
  res.send('Logout Successful!')
  }catch(e){
  res.status(500).send(e);
  }
})


module.exports = router;