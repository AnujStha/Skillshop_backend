const Router=require('express').Router();
const ClientController=require('../Controller/client.controller')
const clientAuth=require('./../Middlewares/authenticateClientToken.middleware')

Router
.route('/:id')
.get(ClientController.client_get)
.put(clientAuth,ClientController.client_put)
.delete(clientAuth,ClientController.client_delete)

module.exports=Router;