"use client";
import type { ChangeEvent } from "react";
import css from "./SearchBox.module.css";
// import type { DebouncedState } from "use-debounce";

interface SearchBoxProps {
  value: string;
  onChangeSearch: (value: string) => void;
}

function SearchBox({ onChangeSearch, value }: SearchBoxProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeSearch(e.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      value={value}
      placeholder="Search notes"
      onChange={handleChange}
    />
  );
}

export default SearchBox;
