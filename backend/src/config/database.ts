import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('Connected to MongoDB');
    } catch (err: unknown) {
        mongoose.connection.on('error', (err: Error) => {
            console.log(`Connection failed. Error: ${err}`);
            process.exit(1);
        });
    }
}
