const User=require('../Model/Users/user.model')
const ContactNumber=require('../Model/Contacts/contactNumber.model')
const ContactEmail=require('../Model/Contacts/email.model');

async function map_client_request(client,data){
    try {
        client.user=await(map_user_request(client.user,data))
        return client
    } catch (error) {
        throw(error)
    }
}

async function map_manpower_request(manpower,data){


    try {
        // let manpowerUser=new User({});
        // let mappedManpowerUser=await(map_user_request(manpowerUser,data))
        // await(mappedManpowerUser.save())
        // manpower.user=mappedManpowerUser._id;
        manpower.user=await(map_user_request(manpower.user,data));
        return manpower
    } catch (error) {
        throw(error)
    }
}

async function map_user_request(user,data){
    try {

        //verify required data
        if(data.userName==null||data.userName==""){
            throw({
                msg:"invalid user name",
                status:400
            })
        }
        if(data.password==null){
            throw({
                msg:"password required",
                status:400
            })
        }
        if(data.primaryContactNumber==null){
            throw({
                msg:"primary contact nmber required",
                status:400
            })
        }
        if(data.permanentAddress==null){
            throw({
                msg:"permanent address required",
                status:400
            })
        }

        //required data entry
        user.userName=data.userName;
        if(data.firstName!=null){
            user.firstName=data.firstName;
        }
        if(data.middleName!=null){
            user.middleName=data.middleName;
        }
        if(data.lastName!=null){
            user.lastName=data.lastName
        }
        user.password=data.password;//should be encrypted

        let primaryContactNumber=user.primaryContactNumber
        primaryContactNumber.number=data.primaryContactNumber;
        primaryContactNumber.isPrimary=true;
        // primaryContactNumber= await(primaryContactNumber.save())
        // user.primaryContactNumber=primaryContactNumber._id

        if(data.contactNumbers!=null&&Array.isArray(data.contactNumbers)){
            for (const element of data.contactNumbers) {
                let contactNumber=user.contactNumbers.create();
                contactNumber.number=element;
                contactNumber.isPrimary=false;
                // contactNumber= await(contactNumber.save())
                user.contactNumbers.push(contactNumber)
            }
        }

        if(data.temporaryAddress!=null&&Array.isArray(data.temporaryAddress)){
            for (const element of data.temporaryAddress) {
                user.tempAddress.push(element)
            }
        }

        if(data.gender!=null){
            user.gender=data.gender
        }

        if(data.email!=null){
            // let email=new ContactEmail({})
            // email.email=data.email;
            // email=email.save()
            user.email={email:data.email}
        }

        if(data.dob!=null){
            user.dob=data.dob
        }
        return user;

    } catch (error) {
        throw(error)
    }
}

module.exports={
    map_client_request,
    map_manpower_request
}