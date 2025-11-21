import type { File as FileType } from "../types/file";
import type { Folder } from "../types/folder";
import axios from "axios";

const API_BASE = "/api/v1";

// --------------------- FOLDERS ---------------------

export const fetchFolders = async (): Promise<Folder[]> => {
  const res = await axios.get(`${API_BASE}/folders`);
  return res.data;
};

export const createFolder = async (name: string, parentId?: number): Promise<Folder> => {
  console.log(name, parentId)
  const res = await axios.post(`${API_BASE}/folders`, {
    name,
    parent_id: parentId || null,
  });
  return res.data;
};

export const updateFolder = async (folderId: number, data: { name: string }): Promise<Folder> => {
  const res = await axios.put(`${API_BASE}/folders/${folderId}`, data);
  return res.data;
};

export const moveFolder = async (folderId: number, data: { name: string, parent_id: number }): Promise<Folder> => {
  const res = await axios.put(`${API_BASE}/folders/${folderId}`, data);
  return res.data;
};

export const removeFolder = async (folderId: number): Promise<void> => {
  await axios.delete(`${API_BASE}/folders/${folderId}`);
};

// --------------------- FILES ---------------------

export const updateFile = async (fileId: number, data: { name: string }): Promise<FileType> => {
  const res = await axios.put(`${API_BASE}/files/${fileId}`, data);
  return res.data;
};

export const moveFile = async (fileId: number, data: { folder_id: string }): Promise<FileType> => {
  const res = await axios.put(`${API_BASE}/files/${fileId}`, data);
  return res.data;
};

export const removeFile = async (fileId: number): Promise<void> => {
  await axios.delete(`${API_BASE}/files/${fileId}`);
};

export const uploadFile = async (folderId: number, file: File ): Promise<FileType> => {
  const formData = new FormData();
  formData.append("uploaded_file", file);
  formData.append("folder_id", folderId.toString());

  const res = await axios.post(`${API_BASE}/files/upload/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
