import Header from "@/components/header";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-7xl mx-auto py-6 w-full flex flex-col">
        {children}
      </main>
    </>
  );
}

export default layout;
