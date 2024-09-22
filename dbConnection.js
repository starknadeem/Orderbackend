const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

async function connectDB()
{
    try {
        const isConnected = await mongoose.connect(`${process.env.DBURL}/${process.env.DBNAME}`);
        return true;
        
    } catch (error) {
        console.error("Error in connection to DB ", error);
        return false;
    }
}

module.exports = connectDB;