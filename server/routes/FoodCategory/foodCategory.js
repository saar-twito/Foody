const express = require('express');
const { chefAuth } = require('../../middleware/auth');
const FoodCategory = require('../../models/FoodCategory');
const { isFileValid } = require('../../utils/utils');
const router = express.Router();


// Get a list of food categories
router.get('/', async (req, res) => {
    try {
        const recipes = await FoodCategory.find().select("-__v").sort({ name: 1 })
        res.status(200).send(recipes);
    } catch (error) {
        res.status(500).send("Couldn't complete the getting food category process")
    }
})

// Create a new food category
router.post('/create', async (req, res) => {
    try {
        // Check if category name exists
        let category = await FoodCategory.findOne({ name: req.body.name });
        if (category) return res.status(400).send("Category already exists");

        // Validate request
        const { error } = FoodCategory.validateAddingFoodCategory(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // Check if the file is valid
        const file = isFileValid(req)
        if (!file) return res.status(400).send('Please make sure to upload the recipe\'s image in the file formats (webp, png, jpg, jpeg, tiff) and the size image is equal or smaller than 1.5 MB')

        // Path to the folder in react
        const path = process.env.ROOT_OF_FOOD_CATEGORIES_MENU_IMAGES

        // Move the file to the full path
        file.mv(`${path}/${file.name}`, async err => {
            if (err) return res.status(500).send(err.message);
            category = new FoodCategory({
                name: req.body.name,
                description: req.body.description,
                filePath: `/uploads/foodCategoriesImages/${file.name}`,
                fileName: file.name,
            });
        });

        res.status(201).send(await category.save());
    } catch (error) {
        res.status(500).send("Couldn't complete the getting profile process " + error.message)
    }
})

module.exports = router;