import type { PropsWithChildren } from "react";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

export default function AppLayout({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);

  return (
    <html lang="en" className="bg-gray-950 text-gray-100">
      <body className="h-screen w-screen overflow-hidden">
        <div className="flex h-screen w-screen">
          <aside
            className={`
              fixed md:static
              top-0 left-0
              h-screen w-64
              bg-gray-900 border-r border-gray-800
              p-4
              transform transition-transform duration-300
              z-40
              ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            `}
          >
            <Sidebar close={() => setOpen(false)} />
          </aside>

          {open && (
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-30"
              onClick={() => setOpen(false)}
            />
          )}

          <main className="flex-1 overflow-y-auto bg-gray-950 p-6">
            <button
              className="md:hidden mb-4 px-4 py-2 bg-gray-800 rounded-lg"
              onClick={() => setOpen(true)}
            >
              Open Menu
            </button>

            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
