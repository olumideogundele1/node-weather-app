const request = require('request')

const foreCast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=79b17ca5710fa8e83a851fb57a5f1909&query='+latitude+','+longitude+'&units=m'

    request({url : url, json: true},(error,response) => {
        if(error){
            callback("unable to connect to weather serrvices ", undefined)
        }else if(response.body.error){
            callback('Unable to get search result ',undefined);
        }else{
            callback(undefined, 
                'The weather is'+response.body.current.weather_descriptions[0] +'. \nIt is currently '+ response.body.current.temperature+ ' degress out and It feels like ' + response.body.current.feelslike + ' degrees out'
            )
        }
    })
}


module.exports = foreCast