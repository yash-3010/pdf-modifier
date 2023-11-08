import mongoose from 'mongoose';

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL!);
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.on('open', () => {
            console.log('Database connected');
        });
    } catch (error) {
        console.log('Something went wrong!');
        console.log(error);
    }
}
