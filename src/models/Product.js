const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
        minlength: 1,
        trim : true
    },
    price:{
        type:mongoose.Types.Decimal128,
        required:true
    },
    img:{
        type:String,
        default:'localhost:3000/public/images/grocery-15.svg'
    }
})