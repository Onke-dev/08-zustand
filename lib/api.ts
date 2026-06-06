import axios from "axios";
import type { NewNoteBody, Note } from "../types/note";

interface FetchNotesRes {
  notes: Note[];
  page: number;
  totalPages: number;
}

interface FetchNotesParams {
  search: string;
  page: number;
  tag?: string;
}

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

const fetchNotes = async ({
  search: mysearchtext,
  page,
  tag,
}: FetchNotesParams): Promise<FetchNotesRes> => {
  const res = await axios.get<FetchNotesRes>("/notes", {
    params: {
      search: mysearchtext,
      page,
      tag,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export default fetchNotes;

export const createNote = async (newNote: NewNoteBody) => {
  const res = await axios.post<Note>("/notes", newNote, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const fetchNoteById = async (taskId: string) => {
  const res = await axios.get<Note>(`/notes/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteNote = async (taskId: string) => {
  const res = await axios.delete<Note>(`/notes/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
