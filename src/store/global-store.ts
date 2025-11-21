import { create } from "zustand";
import * as folderService from "../services/service-api";
import type { Folder } from "../types/folder";
import type { File } from "../types/file";

interface FolderStore {
  folders: Folder[];
  loading: boolean;
  selectedFolderId: number | null;
  selectFolder: (folderId: number | null) => void;

  fetchFolders: () => Promise<void>;
  addFolder: (name: string, parentId?: number) => Promise<void>;
  updateFolder: (folderId: number, name: string) => Promise<void>;
  deleteFolder: (folderId: number) => Promise<void>;
  moveFile: (fileId: number, folderId: number) => Promise<void>;

  addFile: (folderId: number, file: File | File) => Promise<void>;
  updateFile: (fileId: number, name: string) => Promise<void>;
  deleteFile: (fileId: number) => Promise<void>;

  moveFolder: (folder: Folder, targetFolderId: number) => Promise<void>;
}

export const useFolderStore = create<FolderStore>((set) => ({
  folders: [],
  loading: false,
  selectedFolderId: null,
  selectFolder: (folderId) => set({ selectedFolderId: folderId }),

  fetchFolders: async () => {
    set({ loading: true });
    try {
      const folders = await folderService.fetchFolders();
      set({ folders });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  addFolder: async (name, parentId) => {
    set({ loading: true });
    try {
      await folderService.createFolder(name, parentId);
      const folders = await folderService.fetchFolders();
      set({ folders });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  updateFolder: async (folderId, name) => {
    set({ loading: true });
    try {
      await folderService.updateFolder(folderId, { name });
      const folders = await folderService.fetchFolders();
      set({ folders });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  deleteFolder: async (folderId) => {
    set({ loading: true });
    try {
      await folderService.removeFolder(folderId);
      const folders = await folderService.fetchFolders();
      set({ folders });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  addFile: async (folderId, file) => {
    set({ loading: true });
    try {
      await folderService.uploadFile(folderId, file);
      const folders = await folderService.fetchFolders();
      set({ folders });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  updateFile: async (fileId, name) => {
    set({ loading: true });
    try {
      await folderService.updateFile(fileId, { name });
      const folders = await folderService.fetchFolders();
      set({ folders });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  moveFile: async (fileId, folder_id) => {
    set({ loading: true });
    try {
      await folderService.moveFile(fileId, { folder_id });
      const folders = await folderService.fetchFolders();
      set({ folders });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  deleteFile: async (fileId) => {
    set({ loading: true });
    try {
      await folderService.removeFile(fileId);
      const folders = await folderService.fetchFolders();
      set({ folders });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  moveFolder: async (folder: Folder, targetFolderId: number) => {
    set({ loading: true });
    try {
      await folderService.moveFolder(folder.id, { name: folder.name, parent_id: targetFolderId });
      const folders = await folderService.fetchFolders();
      set({ folders });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },
}));
