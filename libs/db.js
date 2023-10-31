import mongoose from 'mongoose';

const dbConnect = async () => {
    try {
        await mongoose.connect(
            process.env.MONGODB_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                strict: false, // This disables strict mode, allowing dynamic schema
            }
        );
        console.log('Connected to database');
    } catch (error) {
        console.log(error);
    }
}

export default dbConnect;