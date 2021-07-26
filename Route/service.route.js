const Router=require('express').Router();
const Service=require('../Controller/service.controller')
const AuthenticateAdminToken=require('../Middlewares/authenticateAdminToken.middleware');
const authenticateClientTokenMiddleware = require('../Middlewares/authenticateClientToken.middleware');
const authenticateManpowerTokenMiddleware = require('../Middlewares/authenticateManpowerToken.middleware');

Router.route('/manpowerId')
.get()

Router.route('/client')
.get(authenticateClientTokenMiddleware,Service.service_client_get)
.put(authenticateClientTokenMiddleware,Service.service_client_put)

Router.route('/client/:serviceId')
.get(authenticateClientTokenMiddleware,Service.service_client_get)

Router.route('/manpower')
.get(authenticateManpowerTokenMiddleware,Service.service_manpower_get)
.put(authenticateManpowerTokenMiddleware,Service.service_manpower_put)

Router.route('/manpower/:serviceId')
.get(authenticateManpowerTokenMiddleware,Service.service_manpower_get)

Router.route('/manpowerId/:id')
.get(Service.service_manpowerId_get)

Router.route('/clientId/:id')
.get(Service.service_clientId_get)

module.exports=Router