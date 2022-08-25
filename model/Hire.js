const mongoose = require('mongoose')

const hireADeveloperSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        phone:{
            type: String,
            required: true
        },
        company:{
            type: String,
            required: true
        },
        message: {
            type: String
        }
    },
    {
        timestamps: true,
        // toJSON: { virtuals: true },
        // toObject: { virtuals: true },
    }
)

const Hire = mongoose.model("Hire-a-developer", hireADeveloperSchema);
    
module.exports = Hire;