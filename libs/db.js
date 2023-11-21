import mongoose from 'mongoose';

/** 
* Establishes a connection to a MongoDB database using Mongoose.
* @function
* @name dbConnect
* @async
* @returns {Promise<void>} A promise that resolves when the database connection is successfully established.
* @throws {Error} If there is an error connecting to the database.
*/
const dbConnect = async () => {
    try {
        /**
         * Attempt to connect to the MongoDB database using Mongoose.
         * @function
         * @name mongoose.connect
         * @async
         * @param {string} process.env.MONGODB_URI - The MongoDB connection URI.    
         */
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to database');
    } catch (error) {
        console.log(error);
    }
}

export default dbConnect;