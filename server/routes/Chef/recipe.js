const express = require('express');
const mongoose = require('mongoose');
const Recipe = require('../../models/Recipe');
const FoodCategory = require('../../models/FoodCategory');
const { isFileValid } = require('../../utils/utils');
const { chefAuth } = require('../../middleware/auth');
const router = express.Router();

// Create a new recipe
router.post('/create', [chefAuth], async (req, res) => {
    try {
        // Check if a food category exists
        const foodCategory = await FoodCategory.findById(req.body.foodCategory);
        if (!foodCategory) return res.status(200).send("Category didn't found");

        // Validate request
        const { error } = Recipe.validateRecipe(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // Check if the file is valid
        const file = isFileValid(req)
        if (!file) return res.status(400).send('Please make sure to upload the recipe\'s image in the file formats (png, jpg, jpeg, tiff) and the size image is equal or smaller than 1.5 MB')

        // Check uniqueness
        const chefRecipe = await Recipe.find({ chef: req.chef._id });
        const recipesInCategory = chefRecipe.find(recipe => recipe.name === req.body.name)
        if (recipesInCategory) return res.status(400).send("You already have a recipe with this name")

        // Make array of ingredients
        req.body.ingredients = req.body.ingredients.split(",").map(item => item.trim());

        let recipe = new Recipe(req.body)

        // Path to the folder in react
        const path = process.env.ROOT_OF_RECIPES_IMAGES

        // Move the file to the full path
        file.mv(`${path}/${file.name}`, async err => {
            if (err) return res.status(500).send(err);
            recipe.filePath = `/uploads/recipes/${file.name}`;
            return res.status(201).send(await recipe.save());
        });

    } catch (error) {
        res.status(500).send("Couldn't complete the creation of the recipe process " + error.message)
    }

})

// Update
router.patch('/:id', [chefAuth], async (req, res) => {
    try {
        // Validate updates
        const { error } = Recipe.validateUpdates(req.body);
        if (error) return res.status(400).send(error.details[0].message)

        // Update
        await Recipe.findByIdAndUpdate(req.params.id, req.body);

        // Output
        res.status(200).send("Recipe updated successfully")

    } catch (error) {
        res.status(500).send("Couldn't complete the getting profile process " + error.message)
    }
})

// Delete
router.delete('/:id', [chefAuth], async (req, res) => {
    try {
        // Check objectId
        const isValidObjectId = mongoose.isValidObjectId(req.params.id);
        if (!isValidObjectId) return res.status(200).send("Recipe didn't found");

        // Try to find a recipe
        const isExists = await Recipe.exists({ _id: req.params.id });
        if (!isExists) return res.status(200).send("Recipe didn't found");

        // Validate that this recipe belong to this chef
        await Recipe.findByIdAndRemove(req.params.id);

        // Output
        res.status(200).send("Recipes deleted successfully");

    } catch (error) {
        res.status(500).send("Couldn't complete the delete recipe process" + error.message)
    }
})

module.exports = router