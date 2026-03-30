import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const TaskListPagination = ({
  handleNext,
  handlePrev,
  handlePageChange,
  page,
  totalPages,
}) => {
  const generatePages = () => {
    const pages = [];
    const siblingCount = 1;

    // Nếu bạn muốn 5 trang đã phải ẩn bớt, hãy đổi số 5 thành 4
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      const leftSiblingIndex = Math.max(page - siblingCount, 2);
      const rightSiblingIndex = Math.min(page + siblingCount, totalPages - 1);

      const showLeftDots = leftSiblingIndex > 2;
      const showRightDots = rightSiblingIndex < totalPages - 1;

      if (showLeftDots) {
        pages.push("...");
      }

      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        pages.push(i);
      }

      if (showRightDots) {
        pages.push("...");
      }

      pages.push(totalPages);
    }
    return pages;
  };
  const pagesToShow = generatePages();
  return (
    <Pagination>
      <PaginationContent>
        {/* Trước */}
        <PaginationItem>
          <PaginationPrevious
            onClick={page === 1 ? undefined : handlePrev}
            className={cn(
              "cursor-pointer",
              page === 1 && "pointer-events-none opacity-50",
            )}
          />
        </PaginationItem>

        {pagesToShow.map((p, index) => (
          <PaginationItem key={index}>
            {p === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={p === page}
                onClick={() => {
                  if (p !== page) handlePageChange(p);
                }}
                className="cursor-pointer"
              >
                {p}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Sau */}
        <PaginationItem>
          <PaginationNext
            onClick={page === totalPages ? undefined : handleNext}
            className={cn(
              "cursor-pointer",
              page === totalPages && "pointer-events-none opacity-50",
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TaskListPagination;
