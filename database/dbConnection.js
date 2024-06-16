import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URL, {
        dbName: "kj"
    }).then(() => {
        console.log("Connected to database");
    }).catch(err => {
        console.log(`Something went wrong: ${err}`);
    });
}
