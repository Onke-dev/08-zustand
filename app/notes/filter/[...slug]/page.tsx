import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import fetchNotes from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params;
  const rawtag = slug[0];

  const tag = rawtag === "all" ? undefined : rawtag;

  const category = tag
    ? tag.charAt(0).toUpperCase() + tag.slice(1)
    : "All Notes";

  return {
    title: `NoteHub ${category}`,
    description: `NoteHub is ${category}.`,
    openGraph: {
      title: `NoteHub ${category}`,
      description: `NoteHub is ${category}.`,
      url: `https://08-zustand-ebon-three.vercel.app/notes/filter/${rawtag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
      ],
    },
  };
};

const NoteFilterPage = async ({ params }: Props) => {
  const res = await params;
  const rawtag = res.slug[0];

  const tag = rawtag === "all" ? undefined : rawtag;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1],

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
