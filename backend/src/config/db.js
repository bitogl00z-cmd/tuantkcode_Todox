import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
    console.log("Liên kết csdl thành công!");
  } catch (error) {
    console.error("lỗi khi kết nối CSDL :", error);
    process.exit(1); //exit with error
  }
};
