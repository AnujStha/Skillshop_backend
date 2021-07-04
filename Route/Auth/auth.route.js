const Router=require('express').Router();
const clientAuth=require('./clientAuth.route')
const manpowerAuth=require('./manpowerAuth.route')

Router.use('/client',clientAuth)

Router.use('/manpower',manpowerAuth)

module.exports=Router;