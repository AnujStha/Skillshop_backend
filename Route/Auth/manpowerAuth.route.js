const Router=require('express').Router();
const ManpowerController=require('../../Controller/manpower.controller')
const upload = require('../../Middlewares/uploader');


Router.post('/login',ManpowerController.manpower_login)

Router.post('/register',upload.single("img"),ManpowerController.manpower_post)

module.exports=Router;