const express = require('express');
const User = require('../../models/UserAccount');
const { userAuth } = require('../../middleware/auth');
const bcrypt = require('bcrypt');
const Chef = require('../../models/ChefAccount');
const timeOfAnAction = require('../../utils/utils');
const router = express.Router();


// Profile
router.get('/me', [userAuth], async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-__v -_id -password");
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send("Couldn't complete the getting profile process");
    }
})

// Login
router.post('/login', async (req, res) => {
    try {

        // Validate user request
        const { error } = User.validateLogin(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // Check if user is already registered as a user
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("Invalid credentials");

        
        // Check user's password
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return res.status(400).send("Invalid credentials");

        // Send the token
        res.status(200).send(user.generateUserToken());
    } catch (error) {
        res.status(500).send("Couldn't complete the login process" + error.message)
    }
})


// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate user request
        const { error } = User.validateRegistration(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // Check if user is already registered as a user
        let user = await User.findOne({ email });
        if (user) return res.status(400).send("User already registered :)");

        // Check if user is already registered as a chef
        let isExists = await Chef.exists({ email });
        if (isExists) return res.status(400).send("You already registered as chef :)");

        // Hash user's password
        user = new User(req.body);
        user.password = await bcrypt.hash(password, await bcrypt.genSalt());

        // Time of registration
        user.joined = timeOfAnAction(new Date())

        // Save
        await user.save();

        // Output
        const output = { id: user.id, name, email }

        res.header("x-auth-token", user.generateUserToken())
            .header("access-control-expose-headers", "x-auth-token")
            .status(201).send(output); // Sent just this details to the frontend

    } catch (error) {
        res.status(500).send("Couldn't complete the login process " + error.message)
    }
})


// Update profile
router.patch('/editMe', [userAuth], async (req, res) => {
    try {

        // Valid updates
        const { error } = User.validateUpdates(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // Get the updates and update the user profile
        const updates = Object.keys(req.body);
        updates.forEach(update => req.user[update] = req.body[update]);

        // Save 
        await req.user.save();

        // Output
        res.status(200).send("User was successfully update");
    } catch (error) {
        res.status(500).send(error.message);
    }
})


module.exports = router
