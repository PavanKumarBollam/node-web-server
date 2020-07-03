const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { response } = require('express')


const app = express()

//Define paths for Express config
const pathDirectory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')
//setup static directory to serve
app.use(express.static(pathDirectory))

//Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)

hbs.registerPartials(partialPath)

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Use this site for getting weather',
        name: 'Pavan'
    })
})


app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me!',
        name: 'Pavan'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'This is the help Page!',
        name: 'Pavan'
    })
})

app.get('/weather', (req, res)=>{

    if(!req.query.address){
        return res.send({
            error: 'please provide the address term for weather'
        })
    }
    else{
        const address = req.query.address

        geocode(address, (error, {latitude , longitude, location} ={})=>{
            if(error){
                return res.send('please provide the valid address error')
            }
            console.log(latitude, longitude, location)
             forecast(latitude, longitude, (error1, data) => {

                if(error1){
                return  console.log('Error', error1)
                 }
              console.log('response', location )
              const temp = data.current.temperature
              console.log('temperature is', data.current.temperature)
              res.send({location, temp, address})

            })
          
          })
    }
    

})


app.get('/products', (req, res)=>{
    if(!req.query.search){
       return res.send({
            error: 'you have to provide search term'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})






app.get('/help/*', (req, res)=>{
    res.render('404page', {
        errorMessage: 'Help Article not found!',
          })
})

app.get('*', (req, res)=>{
    res.render('404page', {
        errorMessage: 'Requested Page not found!',

    })
})
// app.get('/help', (req, res)=>{
//     app.use(express.static(pathDirectoryHelp))
//     // res.send('Home Page!')
// })

// app.get('/about', (req, res)=>{
//     app.use(express.static(pathDirectoryAbout))
//     // res.send('<h1>About Page</h1>')
// })



app.listen(4000, ()=>{
    console.log('Server is up and running on port 4000')
})

