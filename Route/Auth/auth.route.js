const Router=require('express').Router();
const clientAuth=require('./clientAuth.route')
const manpowerAuth=require('./manpowerAuth.route')
const adminAuth=require('./adminAuth.route')

Router.use('/client',clientAuth)
Router.use('/manpower',manpowerAuth)
Router.use('/admin',adminAuth)


module.exports=Router;