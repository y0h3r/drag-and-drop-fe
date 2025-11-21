import type { Folder } from "../types/folder";

export const findFolderById = (folders: Folder[], id: number | null): Folder | null => {
  if (!id) return null;
  for (const folder of folders) {
    if (folder.id === id) return folder;
    const found = findFolderById(folder.subfolders, id);
    if (found) return found;
  }
  return null;
};

export const getBreadcrumbs = (folders: Folder[], id: number | null): Folder[] => {
  const path: Folder[] = [];
  const helper = (folderList: Folder[], targetId: number | null): boolean => {
    if (!targetId) return false;
    for (const folder of folderList) {
      if (folder.id === targetId) {
        path.unshift(folder);
        return true;
      }
      if (helper(folder.subfolders, targetId)) {
        path.unshift(folder);
        return true;
      }
    }
    return false;
  };
  helper(folders, id);
  return path;
};
