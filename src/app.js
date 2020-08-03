const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const weather=require('./utils/weather')

const app=express()

app.set('view engine','hbs')
//by default it will search in views directory
app.set('views',path.join(__dirname,'../template/views'))
hbs.registerPartials(path.join(__dirname,'../template/partials'))

app.use(express.static(path.join(__dirname,'../public')))


app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather app'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'Weather app'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title:'Weather app'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            
            error:'you must provide a search term'
        })
     }
     geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
            return res.send({
            
                error:'you must provide a search term'
            })
        }
        weather(latitude+','+longitude,(error,forecast)=>{
            if(error)
            return res.send({
                
                error:'you must provide a search term'
            })
            if(forecast)
             res.send({
                title:'Weather app',
                forecast:forecast,
               location,
                
            })
        //    res.send({
        //        forecast:forecast,
        //        location,
        //        address:req.query.address
        //    })
        })
     })


    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.render('error',{
            error:'you must provide a search term'
        })
    }
    
    console.log(req.query)
    res.send({products:[]

    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        errorInfo:'Page not found'
    })
})

app.listen(3000,()=>{
    console.log("Server started...")
})