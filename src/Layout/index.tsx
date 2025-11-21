import type { PropsWithChildren } from "react";

export default function AppLayout({ children }: PropsWithChildren) {

  return (
    <html lang="en" className="bg-gray-950 text-gray-100">
      <body className="h-screen w-screen overflow-hidden">
        <div className="flex h-screen w-screen">
          <main className="flex-1 overflow-y-auto bg-gray-950 p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
