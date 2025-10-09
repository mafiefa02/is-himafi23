import React from "react";

import Navbar from "@/components/layout/navbar";

export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar background="bg-skyBackgroundDim" />
      <main className="bg-skyBackgroundDim min-h-screen relative z-0">
        {children}
      </main>
    </>
  );
}
