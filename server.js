const port = process.env.PORT || 3000
const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')

//Middleware
app.use('/public',express.static('public'))              //Static files

app.set('view engine','ejs')

app
.get('/home',(req,res)=>{
    res.render('home')
})



.get('*',(req,res)=>{
    res.status(404).render('error')
})

.listen(port,()=>{
    console.log('Server is up on port',port);
})
partials