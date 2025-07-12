import mongoose from 'mongoose';

const URI = process.env.MONGO_DB;

const connectDb = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/aluminport");
        console.log("Database Connection successful");
    } catch (error) {
        console.log("Database Connection failed", error);
        process.exit(1);
    }
}

export default connectDb;