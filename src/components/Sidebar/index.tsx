import type { FC, JSX } from "react";
import { Home, Folder, Upload, X } from "lucide-react";

type SidebarItem = {
  label: string;
  icon: JSX.Element;
  onClick?: () => void;
};

const items: SidebarItem[] = [
  { label: "Home", icon: <Home size={18} /> },
  { label: "Documents", icon: <Folder size={18} /> },
  { label: "Upload", icon: <Upload size={18} /> },
];

const Sidebar: FC<{ close?: () => void }> = ({ close }) => {
  return (
    <aside className="h-full flex flex-col p-4 bg-gray-900 text-gray-200">
      <div className="md:hidden flex justify-end mb-4">
        <button
          className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700"
          onClick={close}
        >
          <X size={18} />
        </button>
      </div>

      <div className="text-xl font-semibold mb-6 px-2 text-gray-100">
        Acme Data Room
      </div>

      <nav className="flex flex-col gap-1">
        {items.map((item) => (
          <button
            key={item.label}
            onClick={item.onClick}
            className="
              flex items-center gap-3 px-3 py-2 rounded-lg 
              text-gray-300 hover:bg-gray-800 hover:text-white
              transition-colors
            "
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
