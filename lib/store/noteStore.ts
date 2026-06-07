import { NewNoteBody } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DraftNoteHub {
  draft: NewNoteBody;
  setDraft: (note: NewNoteBody) => void;
  clearDraft: () => void;
}

const initialDraft: NewNoteBody = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useDraftNoteHub = create<DraftNoteHub>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note: NewNoteBody) => set({ draft: note }),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: `note-draft`,
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
