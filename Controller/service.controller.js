const Manpower =require("./../Model/Users/manpower.model")
const Service=require("./../Model/JobsAndServices/serviceHistory.model")

async function service_get(req,res,next){
    let services=await(Manpower.find({"availableServices":req.query}))
    res.status(200).json(services)
}

async function service_manpower_get(req,res,next){
    try {
        let manpower=req.loggedInManpower;
        let serviceId=req.params.serviceId;
        let service=null;

        if(serviceId){
            service=await(Service.findOne({_id:serviceId,manpower:manpower._id}).populate('manpower').populate('client').populate('job'))
        }else{
            service=await(Service.find({manpower:manpower._id}).populate('manpower').populate('client').populate('job'))
        }

        if(!service){
            return next({
                msg:"service not found"
            })
        }
        res.status(200).json(service)
    } catch (e) {
        return next(e)
    }
}

async function service_manpower_put(req,res,next){
    try {
        let manpower=req.loggedInManpower;
        let service=await(Service.findOne({_id:req.body.serviceId,manpower:manpower._id}))
        let data=req.body;
        if(data.status){
            service.status=data.status;
        }
    
        service=await(service.save())
        if(!service){
            return next({
                msg:"failed to update data"
            })
        }
        res.status(200).json(service)
    } catch (e) {
        return next(e)
    }
}

async function service_client_get(req,res,next){
    try {
        let client=req.loggedInClient;
        let serviceId=req.params.serviceId;
        let service=null;
        
        if(serviceId){
            service=await(Service.findOne({_id:serviceId,client:client._id}).populate('client').populate('manpower').populate('job'))
        }else{
            service=await(Service.find({client:client._id}).populate('client').populate('job').populate('manpower'))
        }
        if(!service){
            return next({
                msg:"service not found"
            })
    }
    res.status(200).json(service)
    } catch (e) {
        return next (e)
    }
}

async function service_client_put(req,res,next){
    try {
        let client=req.loggedInClient;
    let service=await(Service.findOne({_id:req.body.serviceId,client:client._id}))
    let data=req.body;
    if(!service){
        return next({
            msg:"service not found"
        })
    }
    if(data.status){
        service.status=data.status;
    }
    if(data.review){
        service.review=data.review
    }
    if(data.rating){
        service.rating=data.rating
    }

    service=await(service.save())
    if(!service){
        return next({
            msg:"failed to update data"
        })
    }
    res.status(200).json(service)  
    } catch (e) {
        return next(e)
    }
}

async function service_manpowerId_get(req,res,next){
    if(!req.params.id){
        return next({
            msg:"user if required"
        })
    }
    
    let services=await(Service.find({manpower:req.params.id}).populate('manpower').populate('client').populate('job'))

    res.status(200).json(services)
}

async function service_clientId_get(req,res,next){
    if(!req.params.id){
        return next({
            msg:"user if required"
        })
    }
    
    let services=await(Service.find({client:req.params.id}).populate('manpower').populate('client').populate('job'))

    res.status(200).json(services)
}

module.exports={
    service_client_get,
    service_client_put,
    service_manpower_get,
    service_manpower_put,
    service_manpowerId_get,
    service_clientId_get
}