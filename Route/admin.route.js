const Router=require('express').Router();
const AdminController=require('../Controller/admin.controller')
const adminAuth=require('./../Middlewares/authenticateAdminToken.middleware')

Router
.route('/:adminUserName')
.get(AdminController.admin_get)
.put(adminAuth,AdminController.admin_put)
.delete(adminAuth,AdminController.admin_delete)

module.exports=Router;