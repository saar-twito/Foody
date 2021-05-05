const mongoose = require('mongoose');

module.exports = connectToDataBase = () => {
    const db = process.env.DB
    try {
        mongoose.connect(db,
            {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            })
        console.log('Connect to the WeAreHungry database');
    } catch (error) {
        console.log("Could not connect to the WeAreHungry database");
    }
}

