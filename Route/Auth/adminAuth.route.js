const Router=require('express').Router();
const AdminController=require('../../Controller/admin.controller')

Router.post('/login',AdminController.admin_login)
Router.post('/register',AdminController.admin_post)

module.exports=Router;