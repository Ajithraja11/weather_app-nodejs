const request=require('request')

const geocode=(address,callback)=>{
    const locationURL='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWppdGhyYWphIiwiYSI6ImNrZGF0Y3ZkajM4aGIyeHF2ZXJxZDM4ZHoifQ.55pDWe1YLi73q8OAoRvlpQ&limit=1'
    request({url:locationURL,json:true},(error,response)=>{
        if(error)
    {
        callback('Unable to connect to location Service!',undefined)
    }
    else if(response.body.features.length===0)
    {
        callback('Unable to find location, Try with different location!',undefined)
    }
    else{
        callback(undefined,{
            latitude:response.body.features[0].center[1],
            longitude:response.body.features[0].center[0],
            location:response.body.features[0].place_name
        })
    
    }
    })
}

module.exports=geocode 