import mongoose from "mongoose";

const config = {
    isConnected: 0
}

export const connectDb = async () => {
    if (config.isConnected) {
        return;
    }
    try {
        const { connection } = await mongoose.connect(`${process.env.MONGODB_URI}/work_manager`)
        console.log("db connected...")
        console.log("connected with host ", connection.host)
        connection.isConnected = connection.readyState;
    } catch (error) {
        console.log("failed to connect with database !")
        console.log(error)
    }
}