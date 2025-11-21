import type { Folder } from '../../types/folder';
import React from 'react';

interface BreadcrumbsProps {
  breadcrumbs: Folder[];
  onSelect: (folderId: number | null) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs, onSelect }) => {
  return (
    <div className="mb-4 text-gray-700">
      <span
        className="cursor-pointer text-white hover:underline"
        onClick={() => onSelect(null)}
      >
        Home
      </span>
      {breadcrumbs.map((folder) => (
        <span key={folder.id}>
          {' / '}
          <span
            className="cursor-pointer text-white hover:underline"
            onClick={() => onSelect(folder.id)}
          >
            {folder.name}
          </span>
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
