import mongoose from "mongoose";

export async function connect() {

    mongoose.connect(process.env.MONGODB_URL!);
    const connection =  mongoose.connection 

    connection.on('connected', () =>{
        console.log('db successfully connected');
    })

    connection.on('error', (err) =>{
        console.log(`MongoDB connection error, make sure it is connected ${err}`)
        process.exit();
    });
    
    try{

    }catch(err){
        console.log(err)
    }
}