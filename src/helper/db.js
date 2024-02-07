import mongoose from "mongoose"
export const connectDb = async () => {
  try {
    const {connection} = await mongoose.connect(process.env.MONGO_DB_URL, {
      dbName: "work-manager"
    })
    console.log("db connected...");
    console.log("connected with host ",connection.host);
  } catch (error) {
    console.log('Failed to connect with database');
    console.log(error);
  }
}