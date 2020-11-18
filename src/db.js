const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify : false,
    validateOptions: true
}).then(_=>{
    console.log("Database Connected Successfully !");
}).catch(err=>console.log(err.message))
    