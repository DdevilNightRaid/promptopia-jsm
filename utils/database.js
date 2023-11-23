import mongoose from "mongoose";
let isConnected = false; // track the connection status

export const ConnectToDb = async() => {
    mongoose.set('strict', true);
    if(isConnected){
        console.log('MongoDb is already connected');
        return;
    }
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true;
        console.log('Mongodb Connected');
    } catch(err){
        console.log(err);
    }
}
