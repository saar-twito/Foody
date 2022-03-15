const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const foodCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 100,
    },
    filePath: {
        type: String,
    },
    fileName: {
        type: String,
    }
})

foodCategorySchema.statics.validateAddingFoodCategory = (add) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().max(100).required(),
    })
    return schema.validate(add);
}


module.exports = FoodCategory = mongoose.model('FoodCategory', foodCategorySchema)

