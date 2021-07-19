const Router=require('express').Router();
const Job=require('../Controller/job.controller')
const AuthenticateAdminToken=require('../Middlewares/authenticateAdminToken.middleware')

Router.route('/:jobName')
.get(Job.job_get)
.put(AuthenticateAdminToken,Job.job_put)
.delete(AuthenticateAdminToken,Job.job_delete)

Router.route('/')
.post(AuthenticateAdminToken,Job.job_post)

module.exports=Router