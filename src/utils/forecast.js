
const request = require('request')

const forecast = (longitude, latitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=270028c4f8e3dd5fa63ff090d8b8f7f0&query='+ longitude + ',' + latitude

    request({ url, json: true }, (error, {body}) => {

        if(error){
            callback('Unable to connect to weather service!', undefined)
        }else if(body.error){

            callback('Unable to find location!', undefined)
            
        }else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
            
        }

    })


}

module.exports = forecast