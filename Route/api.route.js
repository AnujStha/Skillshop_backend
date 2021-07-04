const Router=require('express').Router()
const ClientRouter=require('./client.route')
const ManpowerRouter=require('./manpower.route')
const AuthRouter=require('./Auth/auth.route')
const Service=require('./service.route')
const Job=require('./job.route')


Router.use('/auth',AuthRouter)
Router.use('/client',ClientRouter)
Router.use('/manpower',ManpowerRouter)
Router.use('/service',Service)
Router.use('/job',Job)

module.exports=Router;