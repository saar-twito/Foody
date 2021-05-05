const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
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
    joined: {
        type: String,
    }
})

userSchema.methods.generateUserToken = function () {
    return jwt.sign({
        id: this.id,
        name: this.name,
        email: this.email,

    }, process.env.JWT_User, { expiresIn: "7 days" });
}


userSchema.statics.validateRegistration = (registrationInfo) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
    return schema.validate(registrationInfo);
}


userSchema.statics.validateLogin = (loginInfo) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
    return schema.validate(loginInfo);
}


userSchema.statics.validateUpdates = (updates) => {
    const schema = Joi.object({
        name: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string(),
    })
    return schema.validate(updates);
}

module.exports = User = mongoose.model("User", userSchema);



