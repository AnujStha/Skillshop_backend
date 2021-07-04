const Router=require('express').Router();
const Manpower=require('../Controller/manpower.controller')

Router.route('/:userId')
.get(Manpower.manpower_get)
.put(Manpower.manpower_put)
.delete(Manpower.manpower_delete)

module.exports=Router;