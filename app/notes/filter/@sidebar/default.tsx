import Link from "next/link";
import css from "./SidebarNotes.module.css";

const CATEGORY = [
  {
    id: "work",
    label: "Work",
    path: "/notes/filter/Work",
  },
  {
    id: "personal",
    label: "Personal",
    path: "/notes/filter/Personal",
  },
  {
    id: "meeting",
    label: "Meeting",
    path: "/notes/filter/Meeting",
  },
  {
    id: "shopping",
    label: "Shopping",
    path: "/notes/filter/Shopping",
  },
  {
    id: "todo",
    label: "Todo",
    path: "/notes/filter/Todo",
  },
];

const SidebarNotes = () => {
  return (
    <ul className={css.menuList}>
      {/* список тегів */}
      <li className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </Link>
      </li>
      {CATEGORY.map(({ id, label, path }) => (
        <li key={id} className={css.menuItem}>
          <Link href={path} className={css.menuLink}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default SidebarNotes;
