import { FilterType } from "@/lib/data";
import { Filter } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const StatsAndFilters = ({
  completedTaskCount = 0,
  activeTaskCount = 0,
  filter = "all",
  setFilter,
}) => {
  return (
    <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center py-4">
      {/* 1. Phần thống kê: Tăng gap-4 để giãn cách 2 Badge */}
      <div className="flex gap-4 items-center">
        <Badge
          variant="secondary"
          className="bg-blue-50 text-blue-600 border-blue-100 px-3 py-1 rounded-full flex gap-1 items-center"
        >
          {/* Làm nổi bật con số và giãn cách */}
          <span className="font-semibold">{activeTaskCount}</span>
          <span>{FilterType.active}</span>
        </Badge>

        <Badge
          variant="secondary"
          className="bg-green-50 text-green-600 border-green-100 px-3 py-1 rounded-full flex gap-1 items-center"
        >
          <span className="font-semibold">{completedTaskCount}</span>
          <span>{FilterType.completed}</span>
        </Badge>
      </div>

      {/* 2. Phần filter: Thêm rounded-full vào Button để nút tròn xoe */}
      <div className="flex flex-wrap gap-2">
        {Object.keys(FilterType).map((type) => (
          <Button
            key={type}
            variant={filter === type ? "gradient" : "ghost"}
            size="sm"
            // THAY ĐỔI TẠI ĐÂY: Thêm rounded-full và tăng px-4, h-9
            className="capitalize rounded-full px-4 h-9 flex gap-2 items-center text-sm font-medium"
            onClick={() => setFilter(type)}
          >
            <Filter className="size-4" />
            {FilterType[type]}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default StatsAndFilters;
