const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify : false,
    validateOptions: true
})
mongoose.connection('on',(err)=>{
    if(err)
        console.log("Problem connecting to Database!! "+ err);
    else
        console.log("Database Connected!");
})
    