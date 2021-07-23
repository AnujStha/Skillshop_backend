const Job=require("./../Model/JobsAndServices/job.model")
const Service=require('./../Model/JobsAndServices/serviceHistory.model')

async function job_get(req,res,next){
    try {
        let body=req.body;
        let searchCondition={};
        if(body.jobName!=null){
            searchCondition.jobName=body.jobName
        }

        if (req.body.minPrice) {
            searchCondition.price = {
                $gte: req.body.minPrice
            }
        }
        if (req.body.maxPrice) {
            searchCondition.price = {
                $lte: req.body.maxPrice
            }
        }
        if (req.body.minPrice && req.body.maxPrice) {
            searchCondition.price = {
                $lte: req.body.maxPrice,
                $gte: req.body.minPrice
            }
        }
        console.log(searchCondition);

        if (req.body.tags) {
            searchCondition.tags = {
                $in: req.body.tags.split(',')
            }
        }


        let job=await(Job.find(searchCondition,req.query))

        if(job==null){
            return next({
                msg:"job not found",
                status:400
            })
        }
    
        res.status(200).json(job)
    } catch (e) {
        return next(e)
    }
}

async function job_put(req,res,next){
    try {
        let data=req.body;
        let manpower=req.loggedInManpower

        if(manpower==null){
            return next({
                msg:"manpower not found"
            })
        }
        if(data.id==null){
            data.id=req.params.id
        }
        //check if job name is valid
        if(data.id==null||""){
            return next({
                msg:"job name required",
                status:400
            })
        }

        //check if job already exists
        let job=await(
            Job.findOne({_id:data.id,
            manpower:manpower._id}))
        if(job==null){
            return next({
                msg:"job not found",
                status:400
            })
        }
        
        if(data.jobCategory!=null){
            job.category=data.jobCategory;
        }

        if(data.tags!=null){
            if(Array.isArray(data.tags)){
                for (const tag of data.tags) {
                    job.tags.push(tag)
                }
            }
        }

        if(data.jobName!=null){
            job.jobName=data.jobName
        }

        if(data.price!=null){
            job.price=data.price
        }

        if(data.priceType!=null){
            job.priceType=data.priceType
        }

console.log('here')

        job=await(job.save())

        res.status(200).json(job)

    } catch (e) {
        return next(e)
    }
}

async function job_post(req,res,next){
    try {
        let data=req.body;
        let manpower=req.loggedInManpower

        if(manpower==null){
            return next({
                msg:"manpower not found"
            })
        }

        //check if job name is valid
        if(data.jobName==null||""){
            return next({
                msg:"job name required",
                status:400
            })
        }

        if(data.price==null){
            return next({
                msg:"price not found"
            })
        }

        if(data.priceType==null){
            return next({
                msg:"price type not found"
            })
        }

        // //check if job already exists
        // let existingJob=await(Job.findOne({jobName:data.jobName}))
        // if(existingJob!=null){
        //     return next({
        //         msg:"job already exists",
        //         status:400
        //     })
        // }

        let job=new Job({});

        job.jobName=data.jobName;
        job.price=data.price;
        job.priceType=data.priceType;
        job.manpower=manpower._id;
        
        if(data.jobCategory!=null){
            job.category=data.jobCategory;
        }


        if(data.tags!=null){
            if(Array.isArray(data.tags)){
                for (const tag of data.tags) {
                    job.tags.push(tag)
                }
            }
        }

        job=await(job.save())

        res.status(200).json(job)

    } catch (e) {
        return next(e)
    }
}

async function job_delete(req,res,next){
    try {
        let id=req.params.id;
        let job=await(Job.findOneAndDelete({
            _id:id,
            manpower:req.loggedInManpower._id}))
    
        if(job==null){
            return next({
                msg:"job not found",
                status:400
            })
        }else{
            res.status(200).json(job)
        }           
    } catch (e) {
        return next(e)
    }
}

async function job_request(req,res,next){
    try {
        let data=req.body;
        if(!data.jobId){
            return next({
                msg:"job id not found"
            })
        }
        let job=await(Job.findOne({_id:data.jobId}))
        if(!job){
            return next({
                msg:"job not found"
            })
        }

        let service=new Service();
        service.client=req.loggedInClient._id;
        service.manpower=job.manpower;
        service.status='waitingAccept'
        service=await(service.save())

        if(!service){
            return next({
                msg:"serviceBookFailed"
            })
        }
        res.status(200).json(service)
    } catch (error) {
        return next (error)
    }
}

module.exports={
    job_get,
    job_put,
    job_post,
    job_delete,
    job_request
}