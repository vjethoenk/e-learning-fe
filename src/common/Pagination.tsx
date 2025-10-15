interface PaginationProps {
  meta: {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  onPageChange: (page: number) => void;
}

const Pagination = ({ meta, onPageChange }: PaginationProps) => {
  const { current, pages } = meta;
  // console.log("Current: ", current);
  // Hàm tạo dãy số phân trang với ...
  const getPageNumbers = (
    current: number,
    pages: number
  ): (number | string)[] => {
    const pageNumbers: (number | string)[] = [];

    if (pages <= 5) {
      for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (current <= 3) {
        pageNumbers.push(1, 2, 3, 4, 5, "...", pages);
      } else if (current >= pages - 2) {
        pageNumbers.push(
          1,
          "...",
          pages - 4,
          pages - 3,
          pages - 2,
          pages - 1,
          pages
        );
      } else {
        pageNumbers.push(
          1,
          "...",
          current - 1,
          current,
          current + 1,
          "...",
          pages
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className="bg-white sticky sm:flex items-center w-full sm:justify-between bottom-0 right-0 border-t border-gray-200 p-4">
      {/* Dãy số trang */}
      <div className="flex items-center mb-4 sm:mb-0 space-x-1">
        {getPageNumbers(current, pages).map((page, idx) =>
          typeof page === "number" ? (
            <button
              key={idx}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded-lg text-sm 
                ${
                  current === page
                    ? "bg-cyan-600 text-white"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
            >
              {page}
            </button>
          ) : (
            <span key={idx} className="px-2 text-gray-400">
              ...
            </span>
          )
        )}
      </div>

      {/* Prev / Next */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onPageChange(current - 1)}
          disabled={current === 1}
          className={`px-3 py-2 rounded-lg text-sm
            ${
              current === 1
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "text-white bg-cyan-600 hover:bg-cyan-700"
            }`}
        >
          Previous
        </button>

        <button
          onClick={() => onPageChange(current + 1)}
          disabled={current === pages}
          className={`px-3 py-2 rounded-lg text-sm
            ${
              current === pages
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "text-white bg-cyan-600 hover:bg-cyan-700"
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
