const Router=require('express').Router();
const ClientController=require('../../Controller/client.controller')

Router.post('/login',ClientController.client_login)

Router.post('/register',ClientController.client_post)

module.exports=Router;