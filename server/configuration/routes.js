
const chefAuth = require('../routes/Chef/auth');
const chefRecipe = require('../routes/Chef/recipe');
const cors = require("cors");
const user = require('../routes/User/auth');
const fileUpload = require('express-fileupload');
const foodCategory = require('../routes/FoodCategory/foodCategory');
const recipe = require('../routes/Recipe/recipe');

module.exports = (app, express) => {
    app.use(fileUpload());
    app.use(express.json());
    app.use(cors());

    // Chef
    app.use('/chefAuth', chefAuth);
    app.use('/chefRecipe', chefRecipe);

    // User
    app.use('/user', user);

    // Food Category
    app.use('/foodCategory', foodCategory);

    // Recipe
    app.use('/recipe', recipe);
}
