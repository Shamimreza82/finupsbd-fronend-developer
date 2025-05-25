// app/error.tsx
"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Unhandled exception:", error);
  }, [error]);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>Something went wrong 😢</h1>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
