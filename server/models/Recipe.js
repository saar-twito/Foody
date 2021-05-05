const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)


const recipeSchema = new mongoose.Schema({
    chef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chef',
        required: true
    },
    foodCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodCategory',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    PreparationTime: {
        type: String,
        required: true
    },
    forHowMany: {
        type: Number,
        required: true
    },
    preparation: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    filePath: {
        type: String,
    }
})

recipeSchema.statics.validateUpdates = (updates) => {
    const schema = Joi.object({
        foodCategory: Joi.objectId(),
        name: Joi.string(),
        ingredients: Joi.string(),
        PreparationTime: Joi.string(),
        forHowMany: Joi.number(),
        preparation: Joi.string(),
    })
    return schema.validate(updates);
}

recipeSchema.statics.validateRecipe = (recipe) => {
    const schema = Joi.object({
        chef: Joi.objectId().required(),
        foodCategory: Joi.objectId().required(),
        name: Joi.string().required(),
        ingredients: Joi.string().required(),
        PreparationTime: Joi.string().required(),
        forHowMany: Joi.number().required(),
        preparation: Joi.string().required(),
    })
    return schema.validate(recipe);
}

module.exports = Recipe = mongoose.model("Recipe", recipeSchema);




