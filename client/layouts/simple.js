export default function SimpleLayout({ children }) {
  return (
    <>
      <main className="px-5">
        <div>{children}</div>
      </main>
    </>
  );
}
