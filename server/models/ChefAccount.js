const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const chefSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Executive Chef', 'Head Chef', 'Deputy Chef', 'Station Chef', 'Home Chef'],
        required: true
    },
    about: {
        type: String,
        maxlength: 500,
        required: true
    },
    joined: {
        type: String,
    },
    filePath: {
        type: String,
    }
})

chefSchema.methods.generateChefToken = function () {
    const token = jwt.sign({
        id: this.id,
        fullName: this.fullName,
        email: this.email,
        status: this.status,

    }, process.env.JWT_Chef, { expiresIn: "7 days" });
    return token
}

chefSchema.statics.validateRegistration = (registrationData) => {
    const schema = Joi.object({
        fullName: Joi.string().required(),
        email: Joi.string().required().email(),
        status: Joi.string().required().valid('Executive Chef', 'Head Chef', 'Deputy Chef', 'Station Chef', 'Home Chef'),
        about: Joi.string().required().max(500),
        password: Joi.string().required(),
    })
    return schema.validate(registrationData);
}


chefSchema.statics.validateLogin = (loginData) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
    return schema.validate(loginData);
}


chefSchema.statics.validateUpdates = (updates) => {
    const schema = Joi.object({
        fullName: Joi.string(),
        status: Joi.string().valid('Executive Chef', 'Head Chef', 'Deputy Chef', 'Station Chef', 'Home Chef'),
        about: Joi.string().max(500),
        email: Joi.string().email(),
        password: Joi.string(),
    })
    return schema.validate(updates);
}

module.exports = Chef = mongoose.model("Chef", chefSchema);



