"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./NotesPage.module.css";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import fetchNotes from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import { useRouter } from "next/navigation";

function NotesClient({ tag }: { tag?: string }) {
  const router = useRouter();
  const handleOpen = () => {
    router.push(`/notes/action/create`);
  };
  const [topic, setTopic] = useState("");
  const [page, setPage] = useState(1);

  const { data } = useQuery({
    queryKey: ["notes", topic, page, tag],
    queryFn: () => fetchNotes({ search: topic, page, tag }),
    placeholderData: keepPreviousData,
  });

  const onChangeSearch = useDebouncedCallback((newValueSearch: string) => {
    setTopic(newValueSearch);
    setPage(1);
  }, 300);

  const totalpage = data?.totalPages ?? 0;
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChangeSearch={onChangeSearch} value={topic} />
        {totalpage > 1 && (
          <Pagination
            pageCount={totalpage}
            forcePage={page}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={handleOpen}>
          Create note +
        </button>
      </header>
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}

export default NotesClient;
