import Head from "next/head";
import NavbarTeacher from "./_components/navbar";

export default async function Teacher({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-white h-screen">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <NavbarTeacher />
      <div className="flex-grow sm:ml-[180px] ml-3 mr-[10px] mt-4 w-full mb-10">
        <main>{children}</main>
      </div>
    </div>
  );
}
