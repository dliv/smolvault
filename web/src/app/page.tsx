"use client";

import useSWR from "swr";
import { fetchHealth, HealthResponse } from "@/lib/api";

export default function Home() {
  const { data: health, error, isLoading } = useSWR<HealthResponse>("/api/health", fetchHealth);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900">
      <main className="flex flex-col items-center gap-8 p-8">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">smolvault</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Personal vault for bookmarks, notes, and more.
        </p>

        <div className="mt-8 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            API Status
          </h2>
          {isLoading && <p className="text-zinc-500">Checking API...</p>}
          {error && (
            <div className="text-red-600 dark:text-red-400">
              <p className="font-medium">Connection failed</p>
              <p className="text-sm">{error.message}</p>
              <p className="mt-2 text-xs text-zinc-500">
                Make sure the API is running: cargo run -p api
              </p>
            </div>
          )}
          {health && (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Status:</span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  {health.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Service:</span>
                <span className="text-zinc-900 dark:text-zinc-100">{health.service}</span>
              </div>
              {health.version && (
                <div className="flex justify-between">
                  <span className="text-zinc-500">Version:</span>
                  <span className="text-zinc-900 dark:text-zinc-100">{health.version}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
