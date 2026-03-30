import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  Circle,
  Calendar,
  SquarePen,
  Trash2,
} from "lucide-react";
import api from "@/lib/axios";
import { toast } from "sonner";
const TaskCard = ({ task, index, handleTaskChanged }) => {
  // Trạng thái isEditing để chuyển đổi giữa hiển thị tiêu đề và ô nhập dữ liệu
  const [isEditting, setIsEditting] = useState(false);
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");
  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success("Nhiệm vụ đã xóa. ");
      handleTaskChanged();
    } catch (error) {
      console.error("Lỗi xảy ta khi xóa task", error);
      toast.error("Lỗi xảy ra khi xóa nhiệm vụ mới.");
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      updateTask();
    }
  };
  const updateTask = async () => {
    try {
      setIsEditting(false);
      await api.put(`/tasks/${task._id}`, {
        title: updateTaskTitle,
      });
      toast.success(`Nhiệm vụ đổi thàn ${updateTaskTitle} `);
      handleTaskChanged();
    } catch (error) {
      console.error("Lỗi xảy ta khi update task", error);
      toast.error("Lỗi xảy ra khi cập nhập nhiệm vụ mới.");
    }
  };
  const toggleTaskCompleteButton = async () => {
    try {
      if (task.status === "active") {
        await api.put(`/tasks/${task._id}`, {
          status: "complete",
          completeAt: new Date().toISOString(),
        });
        toast.success(`${task.title} đã hoàn thành`);
      } else {
        await api.put(`/tasks/${task._id}`, {
          status: "active",
          completeAt: null,
        });
        toast.success(`${task.title} đã đổi sang chưa hoàn thành`);
      }
      handleTaskChanged();
    } catch (error) {
      console.error("Lỗi xảy ta khi update task", error);
      toast.error("Lỗi xảy ra khi cập nhập nhiệm vụ mới.");
    }
  };
  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === "complete" && "opacity-75",
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        {/* 1. Nút Tròn (Check/Uncheck) */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "flex-shrink-0 size-8 rounded-full transition-all duration-200",
            task.status === "complete"
              ? "text-success hover:text-success/80"
              : "text-muted-foreground hover:text-primary",
          )}
          onClick={toggleTaskCompleteButton}
        >
          {task.status === "complete" ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>

        {/* 2. Hiển thị hoặc Chỉnh sửa Tiêu đề */}
        <div className="flex-1 min-w-0">
          {isEditting ? (
            <Input
              placeholder="Cần phải làm gì?"
              className="flex-1 h-10 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
              type="text"
              value={updateTaskTitle}
              onChange={(e) => setUpdateTaskTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={() => {
                setIsEditting(false);
                setUpdateTaskTitle(task.title || "");
              }}
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200 truncate",
                task.status === "complete"
                  ? "line-through text-muted-foreground"
                  : "text-foreground",
              )}
            >
              {task.title}
            </p>
          )}

          {/* 3. Ngày tạo & Ngày hoàn thành */}
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleString()}
            </span>

            {task.completedAt && (
              <>
                <span className="text-xs text-muted-foreground"> - </span>
                <Calendar className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {new Date(task.completedAt).toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>

        {/* 4. Nút Chỉnh sửa và Xóa (Chỉ hiện khi Hover) */}
        <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
          {/* Nút Edit */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
            onClick={() => {
              setIsEditting(true);
              setUpdateTaskTitle(task.title || "");
            }}
          >
            <SquarePen className="size-4" />
          </Button>

          {/* Nút Xóa */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
            onClick={() => deleteTask(task._id)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
