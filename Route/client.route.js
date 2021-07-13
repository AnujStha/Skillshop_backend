const Router=require('express').Router();
const ClientController=require('../Controller/client.controller')

Router
.route('/:clientUserName')
.get(ClientController.client_get)
.put(ClientController.client_put)
.delete(ClientController.client_delete)

module.exports=Router;