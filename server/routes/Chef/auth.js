const express = require('express');
const Chef = require('../../models/ChefAccount');
const User = require('../../models/UserAccount');
const Recipe = require('../../models/Recipe');
const { chefAuth } = require('../../middleware/auth');
const { timeOfAnAction, isFileValid } = require('../../utils/utils');
const bcrypt = require('bcrypt');
const router = express.Router();


// Profile
router.get('/me', [chefAuth], async (req, res) => {
    try {
        const chef = await Chef.findById(req.chef.id).select("-__v -_id -password")
        res.status(200).send(chef)
    } catch (error) {
        res.status(500).send("Couldn't complete the getting profile process " + error.message)
    }
})

// Login
router.post('/login', async (req, res) => {
    try {
        // Validate chef request
        const { error } = Chef.validateLogin(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // Check if chef is already registered
        let chef = await Chef.findOne({ email: req.body.email });
        if (!chef) return res.status(400).send("Invalid credentials");

        // Check chef's password
        const isPasswordCorrect = await bcrypt.compare(req.body.password, chef.password);
        if (!isPasswordCorrect) return res.status(400).send("Invalid credentials");

        // Send the token
        res.status(200).send(chef.generateChefToken());

    } catch (error) {
        res.status(500).send("Couldn't complete the login process " + error.message);
    }
})

// Register
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate chef request
        const { error } = Chef.validateRegistration(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // Check if chef is already registered
        let chef = await Chef.findOne({ email });
        if (chef) return res.status(400).send("Chef already registered :)");

        // Check if chef already registered as a user
        let isExists = await User.exists({ email });
        if (isExists) return res.status(400).send("You are already registered as a user :)");

        // Check if the file is valid
        const file = isFileValid(req)
        if (!file) return res.status(400).send('Please make sure to upload the your profile\'s image in the file formats (png, jpg, jpeg, tiff) and the size image is equal or smaller than 1.5 MB');

        // Hash chef's password
        chef = new Chef(req.body);
        chef.password = await bcrypt.hash(password, await bcrypt.genSalt());

        // Get time of registration
        chef.joined = timeOfAnAction(new Date())

        const path = process.env.ROOT_OF_FOOD_CHEF_PROFILE_IMAGES

        // Move the file to the full path
        file.mv(`${path}/${file.name}`, async err => {
            if (err) return res.status(500).send(err);
            chef.filePath = `/uploads/chefsProfileImages/${file.name}`;
            await chef.save();
        });

        // Response
        res
            .header("x-auth-token", chef.generateChefToken()) // Issue a new header for a new chef
            .header("access-control-expose-headers", "x-auth-token").status(201) // let the browser access this "x-auth-token" header
            .send(chef); // Sent just this details to the frontend

    } catch (error) {
        res.status(500).send("Couldn't complete the register process" + error.message)
    }


})

// Update profile
router.patch('/editMe', [chefAuth], async (req, res) => {
    try {
        // Valid updates
        const { error } = Chef.validateUpdates(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // Get the updates and update the user profile
        const updates = Object.keys(req.body);
        updates.forEach(update => req.chef[update] = req.body[update]);

        // Save 
        await req.chef.save();

        // Output
        res.status(200).send("Chef was successfully update");
    } catch (error) {
        res.status(500).send(error.message);
    }
})

// Update profile
router.delete('/', [chefAuth], async (req, res) => {
    try {
        await Recipe.deleteMany({ chef: req.chef.id })
        await Chef.deleteOne({ _id: req.chef.id })

        res.status(200).send("Chef was successfully deleted");
    } catch (error) {
        res.status(500).send("Couldn't complete the deletion process" + error.message)
    }
})

module.exports = router
