const Router=require('express').Router();
const Job=require('../Controller/job.controller');
const authenticateClientTokenMiddleware = require('../Middlewares/authenticateClientToken.middleware');
const authenticateManpowerTokenMiddleware = require('../Middlewares/authenticateManpowerToken.middleware');

Router.route('/request')
.post(authenticateClientTokenMiddleware,Job.job_request)

Router.route('/my/')
.get(authenticateManpowerTokenMiddleware,Job.job_my_get)

Router.route('/search/')
.get(Job.job_get)

Router.route('/search/:jobName')
.get(Job.job_get)

Router.route('/manpower/:id')
.get(Job.job_manpower_get)

Router.route('/:id')
.get(Job.job_get)
.put(authenticateManpowerTokenMiddleware,Job.job_put)
.delete(authenticateManpowerTokenMiddleware,Job.job_delete)

Router.route('/')
.post(authenticateManpowerTokenMiddleware,Job.job_post)

module.exports=Router