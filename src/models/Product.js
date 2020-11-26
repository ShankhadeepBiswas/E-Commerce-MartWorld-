const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
        minlength: 1,
        trim : true
    },
    details:{
        type:String,
        required:true,
        minlength:[10, 'Be more informative']
    },
    price:{
        type:mongoose.Schema.Types.Decimal128,
        required:true
    },
    img:{
        type:String,
        default:'localhost:3000/public/images/grocery-15.svg'
    },
    buyer:{
        type: mongoose.Schema.Types.ObjectId
    }
},{
    timestamps:true
})
const Product = mongoose.model('Product',productSchema)
module.exports = Product