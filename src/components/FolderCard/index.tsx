import type { Folder } from '../../types/folder';
import React, { useState } from 'react';
import { Folder as FolderIcon, MoreVertical } from 'lucide-react';

interface FolderCardProps {
  folder: Folder;
  onClick: (folderId: number) => void;
  onRename: (folder: Folder) => void;
  onDelete: (folder: Folder) => void;
  isBackFolder?: boolean;
  isDropTarget?: boolean;
}

const FolderCard: React.FC<FolderCardProps> = ({
  folder,
  onClick,
  onRename,
  onDelete,
  isBackFolder = false,
  isDropTarget = false,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors
        ${isDropTarget ? 'bg-gray-200 border-2 border-dashed border-gray-400' : 'bg-gray-800 hover:bg-gray-700'}`}
    >
      <div className="flex items-center space-x-3" onClick={() => onClick(folder.id)}>
        <FolderIcon className="w-5 h-5 text-yellow-400" />
        <span className="text-gray-100 font-medium">{folder.name}</span>
      </div>

      {!isBackFolder && (
        <div className="relative">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-gray-900 border border-gray-700 rounded shadow-lg z-10">
              <button
                className="block w-full text-left px-3 py-2 hover:bg-gray-700 text-gray-100"
                onClick={() => { onRename(folder); setMenuOpen(false); }}
              >
                Rename
              </button>
              <button
                className="block w-full text-left px-3 py-2 hover:bg-gray-700 text-red-500"
                onClick={() => { onDelete(folder); setMenuOpen(false); }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FolderCard;
