import type { File as FileType } from '../../types/file';
import React from 'react';
import { File as FileIcon, MoreVertical } from 'lucide-react';

interface FileCardProps {
  file: FileType;
  onRename: (file: FileType) => void;
  onDelete: (file: FileType) => void;
  draggable?: boolean;
  onDragStart?: () => void;
  isDropTarget?: boolean;
}

const FileCard: React.FC<FileCardProps> = ({
  file,
  onRename,
  onDelete,
  draggable = false,
  onDragStart,
  isDropTarget = false,
}) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors
        ${isDropTarget ? 'bg-gray-200 border-2 border-dashed border-gray-400' : 'bg-gray-50 hover:bg-gray-100'}`}
    >
      <div className="flex items-center space-x-3">
        <FileIcon className="w-5 h-5 text-blue-400" />
        <span className="text-gray-800 font-medium">{file.name}</span>
      </div>

      <div className="relative">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <MoreVertical className="w-5 h-5 text-gray-400" />
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-gray-50 border border-gray-300 rounded shadow-lg z-10">
            <button
              className="block w-full text-left px-3 py-2 hover:bg-gray-200"
              onClick={() => { onRename(file); setMenuOpen(false); }}
            >
              Rename
            </button>
            <button
              className="block w-full text-left px-3 py-2 hover:bg-gray-200 text-red-500"
              onClick={() => { onDelete(file); setMenuOpen(false); }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileCard;
