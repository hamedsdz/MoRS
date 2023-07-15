import dynamic from "next/dynamic";
// components
const CustomHeader = dynamic(() => import("components/header"));

export default function MainLayout({ children }) {
  return (
    <>
      <CustomHeader />
      <main className=" flex items-center justify-center px-5">
        <div>{children}</div>
      </main>
    </>
  );
}
