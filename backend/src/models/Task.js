import mongoose from "mongoose";
//định nghĩa cấu trúc dữ liẹu cho 1 task
const taskSchema = new mongoose.Schema(
  {
    //giá trị bắt buộc
    title: {
      type: String, //kiểu dữ liệu chuỗi
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "complete"], //1 mảng có 2 giá trị nghĩa là status chỉ chấp nhận 2 trạng thái một là active hai là complete
      default: "active",
    },
    //ngày giờ hoàn thành
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, //createAt và updateAt tự động thêm vào
  },
);
const Task = mongoose.model("Task", taskSchema);
export default Task;
