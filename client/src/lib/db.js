import mongoose from "mongoose"

const dbConnecetion = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Mongo Connection Established")

  } catch (error) {
    throw new Error(error)
  }
}

export default dbConnecetion;