const request=require('request')

const weather=(data,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=a8b0ebe460df6510e1084c00ee89a284&query='+data+'&units=f'
   
    //Data restructuring {body}=response ->Here only body attribute of response will be taken
    request({url:url,json:true},(error,{body})=>{
    if(error)
    {
        callback('Unable to connect to weather Service!',undefined)
    }
    else if(body.error)
    {
        callback('Unable to find location',undefined)
    }
    else{
        callback(undefined,{temperature:body.current.temperature,
                            rain:body.current.precip})
    }
})
}

module.exports=weather