const Router=require('express').Router();
const Manpower=require('../Controller/manpower.controller')
const ManpowerAuth=require('./../Middlewares/authenticateManpowerToken.middleware')

Router.route('/:manpowerUserName')
.get(Manpower.manpower_get)
.put(ManpowerAuth,Manpower.manpower_put)
.delete(ManpowerAuth,Manpower.manpower_delete)

module.exports=Router;