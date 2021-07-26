const Router=require('express').Router();
const ClientController=require('../../Controller/client.controller');
const upload = require('../../Middlewares/uploader');

Router.post('/login',ClientController.client_login)

Router.post('/register',upload.single("img"),ClientController.client_post)

module.exports=Router;