/* eslint-disable @next/next/no-html-link-for-pages */

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-center px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 — Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="inline-block px-6 py-2 bg-green-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go Back Home
      </a>
    </div>
  );
}
