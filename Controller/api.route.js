const Router=require('express').Router()
const ClientRouter=require('./client.route')
const FreelancerRouter=require('./freelancer.route')
const AuthRouter=require('./auth.route')


Router.use('/auth',AuthRouter)
Router.use('/client',ClientRouter)
Router.use('/freelancer',FreelancerRouter)

module.exports=Router;