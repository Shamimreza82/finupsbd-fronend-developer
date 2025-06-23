export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
      </div>
      <p className="text-xl font-semibold animate-pulse tracking-wide">Loading, please wait...</p>
    </div>
  );
}
