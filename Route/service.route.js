const Router=require('express').Router();
const Service=require('../Controller/service.controller')
const AuthenticateAdminToken=require('../Middlewares/authenticateAdminToken.middleware');
const authenticateClientTokenMiddleware = require('../Middlewares/authenticateClientToken.middleware');
const authenticateManpowerTokenMiddleware = require('../Middlewares/authenticateManpowerToken.middleware');

Router.route('/client')
.get(authenticateClientTokenMiddleware,Service.service_client_get)
.put(authenticateClientTokenMiddleware,Service.service_client_put)

Router.route('/manpower')
.get(authenticateManpowerTokenMiddleware,Service.service_manpower_get)
.put(authenticateManpowerTokenMiddleware,Service.service_manpower_put)

module.exports=Router