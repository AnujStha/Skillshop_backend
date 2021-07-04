const Router=require('express').Router();
const Service=require('../Controller/service.controller')

Router.route('/:service')
.get(Service.service_get)
.put(Service.service_put)
.post(Service.service_post)
.delete(Service.service_delete)

Router.route('/')
.get(function(req,res,next){
    //handle
})

module.exports=Router;