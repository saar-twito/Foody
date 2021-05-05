const jwt = require("jsonwebtoken");
const Chef = require('../models/ChefAccount');
const User = require('../models/UserAccount');

// Chef JWT
const chefAuth = async (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.status(401).send("Chef Access denied.");

        const decoded = jwt.verify(token, process.env.JWT_Chef);
        req.chef = await Chef.findById(decoded.id)

        if (!req.chef) return res.status(401).send("Please login aging");
        next()

    } catch (ex) {
        res.status(401).send("Invalid token.");
    }
}

// User JWT
const userAuth = async (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.status(401).send("User Access denied.");

        const decoded = jwt.verify(token, process.env.JWT_User);
        req.user = await User.findById(decoded.id);

        if (!req.user) return res.status(401).send("Please login aging");
        next();

    } catch (ex) {
        res.status(401).send("Invalid token.");
    }
}

module.exports = {
    chefAuth,
    userAuth
}
