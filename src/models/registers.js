const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    your_name:{
        type: String,
        required: true
    },
    father_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    address:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    confirmPassword:{
        type: String,
        required: true
    }
})

const Register = new mongoose.model('Register', loginSchema);

module.exports = Register