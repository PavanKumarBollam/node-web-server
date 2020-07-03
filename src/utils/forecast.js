
const request = require('request')

const forecast = (latitude, longitude, callback)=>{
const url = 'http://api.weatherstack.com/current?access_key=bd62c50daec6af68c88812cf30fbeda5&query='+ latitude +','+longitude+'&units=f'

request({url, json: true}, (error, {body})=>{
    if(error){
        console.log("Something is wrong. Please check!!!")
        callback('low level error', undefined)


    }
    else if(body.success === false) {
        callback(undefined, 'Your API request failed. Please try again or contact support and invalid coordinatees')

    }
    else{
        callback(undefined, body)
    //    console.log(body)
    }
})
}

module.exports = forecast