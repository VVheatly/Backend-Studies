const request = require ('request')

const Geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoid2hlYXRseSIsImEiOiJjanphMDd5djEwNWtxM25wcXI1NmR4MXFhIn0.JkIReltO-y5MUAxO1K2qeA&limit=1'
  
    request ({url, json: true}, (error, {body}) => {
  
      if(error) {
        callback('Unable to connect to Web Services!', undefined)
      } else if (body.features.length === 0) {
        callback('Unable to find loacation!', undefined)
      } else{
        callback(undefined, {
          longitude: body.features[0].center[0],
          latitude: body.features[0].center[1],
          location: body.features[0].place_name
        }) 
      }
    })
  }

  module.exports = Geocode