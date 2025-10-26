import React from "react";

const MainLayout = async ({ children }) => {
  return (
    <div className="container mx-auto mt-24 mb-20 bg-olive-50 min-h-screen px-4">
      {children}
    </div>
  );
};

export default MainLayout;
