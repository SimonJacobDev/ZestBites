const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/FOOD"; 

module.exports = function (callback) {
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, async (err) => {
        if (err) {
            console.log("Error connecting to MongoDB:", err);
        } else {
            console.log("Connected to local MongoDB");

            const foodCollection = await mongoose.connection.db.collection("food_items");
            foodCollection.find({}).toArray(async function (err, data) {
                if (err) {
                    console.log("Error fetching food items:", err);
                } else {
                    const categoryCollection = await mongoose.connection.db.collection("foodCategory");
                    categoryCollection.find({}).toArray(async function (err, Catdata) {
                        if (err) {
                            console.log("Error fetching categories:", err);
                        } else {
                            callback(null, data, Catdata);
                        }
                    });
                }
            });
        }
    });
};
