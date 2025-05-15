import Sidebar from "./_components/Sidebar";
import Navbar from "./_components/Navbar";

export default async function Student({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="ml-10 mt-10">{children}</div>
      </div>
    </div>
  );
}
