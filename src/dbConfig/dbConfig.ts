import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log('MongoDb connected Successfully');
        })
        connection.on('error', (err)=>{
            console.log('MongoDb Connection error'+err);
            process.exit();
        })
        
    } catch (error) {
        console.log("Something Goes Wrong");
        console.log(error);
    }
}