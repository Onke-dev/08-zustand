interface Props {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

const NotesFilterLayout = ({ children, sidebar }: Props) => {
  return (
    <section>
      <aside>{sidebar}</aside>
      <div>{children}</div>
    </section>
  );
};

export default NotesFilterLayout;
