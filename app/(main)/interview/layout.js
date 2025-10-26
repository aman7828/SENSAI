import { Suspense } from "react";
import { BarLoader } from "react-spinners";

export default function Layout({ children }) {
  return (
    <div className="px-5">
      <Suspense
        fallback={
          <div className="flex justify-center mt-4">
            <BarLoader width={"100%"} color="#4B7A42" /> {/* Olive green loader */}
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}
