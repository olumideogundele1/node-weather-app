const request = require('request')

const geoCode = (address,callBack) => {
    const url =  'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoib2x1bWlkZTE4OSIsImEiOiJja3hxY3A1a3kxZm1uMnZwN3Y0cnkwbGc1In0.rj2jLTXFKskttqBrzq0x1g'
    request({url : url, json: true}, (error,response) => {
        // console.log(error)
        // console.log(response.body)
        if(error){
            callBack("unable to connect to location serrvices ", undefined)
        }else if(response.body.features.length === 0 ){
            callBack("Unable to find location, Try another search ",undefined)
        }else{
            callBack(undefined, {
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })

}

module.exports = geoCode