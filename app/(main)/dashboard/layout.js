import { BarLoader } from "react-spinners";
import { Suspense } from "react";

export default function Layout({ children }) {
  return (
    <div className="px-5 min-h-screen bg-gradient-to-b from-lime-50 via-olive-50 to-emerald-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1
          className="text-6xl font-extrabold bg-clip-text text-transparent
                     bg-gradient-to-r from-lime-600 via-olive-600 to-emerald-700
                     drop-shadow-[2px_2px_4px_rgba(0,0,0,0.6)]"
        >
          Industry Insights
        </h1>
      </div>

      {/* Suspense with Loader */}
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-40">
            <BarLoader width="100%" color="#22c55e" />
          </div>
        }
      >
        <div className="text-lg font-medium bg-white text-gray-900 rounded-xl p-8 shadow-xl">
          {children}
        </div>
      </Suspense>
    </div>
  );
}
