const Router=require('express').Router();
const Job=require('../Controller/job.controller')

Router.route('/:job')
.get(Job.job_get)
.put(Job.job_put)
.post(Job.job_post)
.delete(Job.job_delete)

Router.route('/')

module.exports=Router