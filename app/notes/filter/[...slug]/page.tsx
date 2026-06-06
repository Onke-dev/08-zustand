import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import fetchNotes from "@/lib/api";
import NotesClient from "./Notes.client";

interface Props {
  params: Promise<{ slug: string[] }>;
}

const NoteFilterPage = async ({ params }: Props) => {
  const res = await params;
  const rawtag = res.slug[0];

  const tag = rawtag === "all" ? undefined : rawtag;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1],
    // Передаємо аргумент з queryKey у fetchNotes, щоб уникнути помилки "expected 1, got 0"
    queryFn: () => fetchNotes({ search: "", page: 1, tag }),
  });

  return (
    // HydrationBoundary передає "заморожений" кеш у клієнтську частину
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NoteFilterPage;
