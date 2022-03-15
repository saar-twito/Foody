const express = require('express');
const mongoose = require('mongoose');
const Recipe = require('../../models/Recipe');
const FoodCategory = require('../../models/FoodCategory');
const router = express.Router();


// Get recipes by food category id
router.get('/foodCategory/:categoryId', async (req, res) => {
    try {
        // Check objectId
        const isValidObjectId = mongoose.isValidObjectId(req.params.categoryId);
        if (!isValidObjectId) return res.status(200).send("Category didn't found");

        // Try to find a food category
        const isExists = await FoodCategory.exists({ _id: req.params.categoryId });
        if (!isExists) return res.status(200).send("Category didn't found");

        // Find recipes by food category id
        const recipes = await Recipe
            .find({ foodCategory: req.params.categoryId })
            .select("-__v")
            .sort({ name: 1 })
            .populate('chef', '-__v');

        // Output
        res.status(200).send(recipes);
    } catch (error) {
        res.status(500).send("Couldn't complete the getting recipe by id process" + error.message)
    }
})

// Get recipes by chef's name
router.get('/chefId/:chefId', async (req, res) => {
    try {
        // Try to find a chef
        const isExists = await Chef.exists({ _id: req.params.chefId });
        if (!isExists) return res.status(200).send("Chef didn't found");

        // Find recipes by chef's id
        const recipes = await Recipe.find({ chef: req.params.chefId })
            .select("-__v -chef")
            .sort({ recipeName: 1 })

        // Output
        res.status(200).send(recipes);

    } catch (error) {
        res.status(500).send("Couldn't complete the getting recipe by id process")
    }
})


router.post('/like/:id', async (req, res) => {
    try {
        // Check objectId
        const isValidObjectId = mongoose.isValidObjectId(req.params.id);
        if (!isValidObjectId) return res.status(200).send("Recipe didn't found");

        // Try to find a recipe
        const isExists = await Recipe.exists({ _id: req.params.id });
        if (!isExists) return res.status(200).send("Recipe didn't found");

        // Validate that this recipe belong to this chef
        const recipe = await Recipe.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true });

        // Output
        res.status(200).send(recipe);

    } catch (error) {
        res.status(500).send("Couldn't complete the delete recipe process" + error.message)
    }
})

module.exports = router
