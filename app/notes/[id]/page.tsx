import { fetchNoteById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id } = await params;

  const note = await fetchNoteById(id);

  const noteTitle = note?.title || `Note ${id}`;
  const noteDesc = note?.content || `Note ${id}`;
  return {
    title: `${noteTitle}`,
    description: `${noteDesc}`,
    openGraph: {
      title: `${noteTitle}`,
      description: `${noteDesc}`,
      url: `http://localhost:3000/notes/filter/${id}`,
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

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient />
      </HydrationBoundary>
    </>
  );
};

export default NoteDetails;
