const Express=require("express")
const Morgan = require("morgan")
const App=Express()


App.use(morgan('dev'));

//routers
const Api=require('./Controller/api.route')
App.use('/api',Api);

App.listen(5000,function(err,done){
    if(err){
        console.log("error in listening")
    }else{
        console.log("listening at port 5000")
    }
})