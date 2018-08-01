const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')
const nodemailer = require('nodemailer')

var app = express()
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))

app.get('/', function(req,res){
    res.send('<h1>hello world</h1>')
})

app.listen(3000)
console.log('server running on port 3000');

