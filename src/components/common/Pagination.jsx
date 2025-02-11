export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pages.push(i);
      } else if (
        (i === currentPage - 2 && i > 2) ||
        (i === currentPage + 2 && i < totalPages - 1)
      ) {
        pages.push("...");
      }
    }
    return [...new Set(pages)];
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        className={`w-8 h-8 flex items-center justify-center rounded ${
          currentPage === 1
            ? "bg-lightGray text-darkGray"
            : "bg-darkGray text-white hover:bg-darkerGray"
        }`}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>

      {getPagination().map((page, index) => (
        <button
          key={index}
          className={`w-8 h-8 flex items-center justify-center rounded border ${
            page === currentPage
              ? "bg-lightViolet text-darkGray-active border-lightViolet"
              : typeof page === "number"
              ? "bg-white text-darkGray hover:bg-lightGray"
              : "bg-white text-darkGray cursor-default"
          }`}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
        >
          {page}
        </button>
      ))}

      <button
        className={`w-8 h-8 flex items-center justify-center rounded ${
          currentPage === totalPages
            ? "bg-lightGray text-darkGray"
            : "bg-lightViolet text-white hover:bg-darkGray"
        }`}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
}
