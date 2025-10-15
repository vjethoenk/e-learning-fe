interface PaginationProps {
  meta: {
    current: number;
    pageSize: number;
    total: number;
    pages: number;
  };
  onPageChange: (page: number) => void;
}

export default function PaginationPage({
  meta,
  onPageChange,
}: PaginationProps) {
  const { current, pages } = meta;

  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    if (pages <= 5) {
      for (let i = 1; i <= pages; i++) pageNumbers.push(i);
    } else {
      if (current > 3) pageNumbers.push(1, "...");
      for (
        let i = Math.max(1, current - 1);
        i <= Math.min(pages, current + 1);
        i++
      ) {
        pageNumbers.push(i);
      }
      if (current < pages - 2) pageNumbers.push("...", pages);
    }
    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-6">
      {/* Prev */}
      <button
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
        className="px-3 py-1 text-sm rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      {/* Page numbers */}
      {getPageNumbers().map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="px-3 py-1 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => onPageChange(page as number)}
            className={`px-3 py-1 text-sm rounded-md border ${
              current === page
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 hover:bg-gray-100 border-gray-300"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(current + 1)}
        disabled={current === pages}
        className="px-3 py-1 text-sm rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}
