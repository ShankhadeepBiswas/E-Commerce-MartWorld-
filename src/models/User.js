const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const Task = require('../models/tasks')
const userSchema=new mongoose.Schema({
    name : {
        type : String,
        required: true,
        minlength: 1,
        trim : true
    },
    email : {
      type : String,
      unique: true,
      required : true,
      lowercase : true,
      trim : true,
      validate(value){
          if (!validator.isEmail(value)){
              throw new Error("This Email is invalid!")
          }
      }
    },
    password : {
        type : String,
        required : true,
        trim : true,
        minlength : 7,
        validate(value){
            if ( value.toLowerCase().includes("password")){
                throw new Error("INVALID PASSWORD!")
            }
        }
    },
    age : {
        type : Number,
        trim : true,
        validate(value){
            if (value < 0){
                throw new Error('Age must be positive')
            }
        },
        default : 0
    },
    tokens:[{
    token:{
            type : String,
            required : true
        } 
        }],
    avatar: {
        type: Buffer
    }
},{
    timestamps : true
})
userSchema.virtual('tasks',{
    ref : 'Task',
    localField:'_id',
    foreignField: 'owner'
})
userSchema.methods.toJSON = function (){
    const userObject = this.toObject()
    delete userObject.password;
    delete userObject.tokens
    delete userObject.avatar
    return userObject;

}
userSchema.methods.getAuthToken =async function (){
    const user = this
    const token= jwt.sign({_id : user._id.toString()},process.env.JWT_SECRET,{expiresIn : '1 day'})
    user.tokens= user.tokens.concat({token})
    await user.save()
    return token;
}

userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email})
    const Match = await bcrypt.compare(password,user.password)
    if (!user || !Match){
        throw new Error("Unable to login!");
    }
    return user;
}
userSchema.pre('save', async function (next){
    const user = this;
    //console.log("Just before saving");
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next();
})
userSchema.pre('remove', async function (next){
    const user = this;
    await Task.deleteMany({ owner : user._id})
    next();
})
const User= mongoose.model('User',userSchema)
module.exports = User