const forecast = require('../utils/forecast');
const geocode = require('../utils/geocode');
const path = require('path')
const hbs = require('hbs')
const express = require('express')
const app = express();
const port = process.env.PORT || 3000
// Defines paths for Express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialTemplates = path.join(__dirname, '../templates/partials')

// set up Handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialTemplates)

//set up static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
    let address = 'Kolkata'
    if(req.query.address){
        address = req.query.address
    }

    geocode(address, (error, {latitude, longitude, location}={})=>{
        if(error){
            res.render('error404',{ 
                error
            })
        }
        forecast(latitude, longitude, (error, { temperature, feelslike }={})=>{
            if(error){
                res.render('error404',{
                    error
                })
            }
            res.render('index', {
                location,
                temperature,
                feelslike
            })
            
        });
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About Me',
        name:'Vijay Kumar'
    })
})
app.get('/contact', (req, res) => {
    res.render('contact', {
        title:'Contact Me',
        name:'Vijay Kumar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'This is help page.'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide a address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, { temperature, feelslike, wind_speed ,wind_dir, precip, localtime, descr }={})=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                location,
                temperature,
                feelslike,
                wind_speed ,
                wind_dir, 
                precip, 
                localtime,
                descr
            })
        });
    })
})

app.get('/help/*', (req, res) => {
    res.render('error404', {
        errorMessage:'help content not found.'
    })
})

app.get('*', (req, res) => {
    res.render('error404', {
        errorMessage:'404 not found'
    })
})

app.listen(port, ()=> {
    console.log('server started at port '+ port)
})