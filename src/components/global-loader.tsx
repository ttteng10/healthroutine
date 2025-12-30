export default function GlobalLoader() {
  return (
    <div className="bg-muted flex h-screen w-screen flex-col items-center justify-center">
      <div className="mb-15 flex animate-bounce flex-col items-center justify-center gap-4">
        <div className="text-2xl font-bold">루틴Zip</div>
        <div className="text-xl">Loading</div>
      </div>
    </div>
  );
}
