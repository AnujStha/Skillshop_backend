const Router=require('express').Router();
const ManpowerController=require('../../Controller/manpower.controller')

Router.post('/login',ManpowerController.manpower_login)

Router.post('/register',ManpowerController.manpower_post)

module.exports=Router;