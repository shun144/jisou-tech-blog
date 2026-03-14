import Header from "@/components/header";
import Loading from "@/components/loading";

export default function loading() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-7xl mx-auto py-6 w-full flex  items-center">
        <Loading />
      </main>
    </>
  );
}
