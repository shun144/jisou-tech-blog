export default function Loading() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-white z-50 gap-4">
      <span className="loading loading-spinner loading-md text-neutral-600" />
      <p className="text-neutral-400 text-sm tracking-widest font-mono">
        Loading...
      </p>
    </div>
  );
}
