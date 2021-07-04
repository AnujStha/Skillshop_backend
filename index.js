const Express=require("express")
const Morgan = require("morgan")
const App=Express()
const cors=require('cors')
const config=require('./Config/config')


App.use(Morgan('dev'));
App.use(cors())
// App.use('/',(req,res,next)=>res.send("test"))

App.use(Express.urlencoded({
    extended:true
}))

App.use(Express.json())


//routers
const Api=require('./Route/api.route')
App.use('/api',Api);

//handle 404 error
App.use(function(req,res,next){
    next({
        msg:'Not Found',
        status:404
    })
})

//handle errors
App.use(function(error,req,res,next){
    res.status(error.status||400)
    .json({
        msg:error.msg||error,
        status:error.status||400
    })
})

App.listen(config.port,function(err,done){
    if(err){
        console.log("error in listening")
    }else{
        console.log("listening at port "+config.port)
    }
})