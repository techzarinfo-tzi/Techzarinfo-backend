const mongoose=require('mongoose');

const RegisterShema=new mongoose.Schema({
    name:{
     type:String,
     required:true
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
    },
    password:{
     type:String,
     unique: true,
    }
});
const Register=mongoose.model("Register",RegisterShema);

module.exports = Register;

