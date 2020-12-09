require('dotenv').config()
require('./src/db')
const port = process.env.PORT 
const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')

//Middleware
app.use('/public',express.static('public'))                               //Static files
app.set('view engine','ejs')                                              //View Engine
app.use('/user',require('./src/routers/user'))                            //routers
app.use('/products',require('./src/routers/product'))


app
.get('/',(req,res)=>{
    res.render('home')
})
.get('/main',(req,res)=>{
    res.render('main')
}) 

.get('*',(req,res)=>{
    res.status(404).render('error')
})

.listen(port,()=>{
    console.log('Server is up on port',port);
})