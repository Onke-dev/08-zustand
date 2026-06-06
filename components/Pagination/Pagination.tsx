"use client";

import ReactPaginate from "react-paginate"; // Импортируем напрямую без костылей
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  forcePage: number;
  onPageChange: (nextPage: number) => void;
}

export default function Pagination({
  pageCount,
  forcePage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      // В библиотеке индексация с 0, а у тебя с 1, тут всё правильно пересчитываешь
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={forcePage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
