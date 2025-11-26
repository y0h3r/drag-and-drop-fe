import Layout from './Layout';
import { useEffect, useState, useRef, type DragEvent } from 'react';
import Breadcrumbs from './components/Breadcrumbs';
import FolderCard from './components/FolderCard';
import FileCard from './components/FileCard';
import { findFolderById, getBreadcrumbs } from './utils/helpers';
import type { Folder } from './types/folder';
import type { File as FileType } from './types/file';
import { useFolderStore } from './store/global-store';
import { Plus } from 'lucide-react';

function App() {
  const {
    folders,
    fetchFolders,
    loading,
    selectedFolderId,
    selectFolder,
    addFolder,
    addFile,
    updateFolder,
    deleteFolder,
    updateFile,
    deleteFile,
    moveFolder,
    moveFile,
  } = useFolderStore();

  const [fabOpen, setFabOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [draggedFolder, setDraggedFolder] = useState<Folder | null>(null);
  const [draggedFileId, setDraggedFileId] = useState<number | null>(null);
  const [dropTargetFolderId, setDropTargetFolderId] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fetchFolders();
  }, [fetchFolders]);

  const currentFolder = findFolderById(folders, selectedFolderId);
  const breadcrumbs = getBreadcrumbs(folders, selectedFolderId);
  const childrenFolders = currentFolder?.subfolders || folders.filter(f => !f.parent_id);
  const childrenFiles = currentFolder?.files || [];

  // ------------------ Drag-and-drop handlers ------------------

  // Drag-and-drop para la zona general (subida de archivos)
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault();
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (!selectedFolderId) return alert("Select a folder first");

    const files = Array.from(e.dataTransfer.files);
    files.forEach((file: File) => {
      if (file.type === "application/pdf") addFile(selectedFolderId, file);
      else alert("Only PDF files are allowed");
    });
  };

  // Drag-and-drop para folders y files
  const handleFolderDragStart = (folder: Folder) => setDraggedFolder(folder);

  const handleFolderDragEnter = (folderId: number) => {
    if ((draggedFolder && folderId !== draggedFolder.id) || draggedFileId) {
      setDropTargetFolderId(folderId);
    }
  };

  const handleFolderDragLeave = (folderId: number) => {
    if (dropTargetFolderId === folderId) setDropTargetFolderId(null);
  };

  const handleFolderDrop = async (targetFolderId: number) => {
    if (draggedFolder && draggedFolder.id !== targetFolderId) {
      await moveFolder(draggedFolder, targetFolderId);
    }
    if (draggedFileId) {
      await moveFile(draggedFileId, `${targetFolderId}`);
    }
    setDraggedFolder(null);
    setDraggedFileId(null);
    setDropTargetFolderId(null);
  };

  // ------------------ Folder actions ------------------
  const handleRenameFolder = (folder: Folder) => {
    const newName = prompt("Enter new folder name", folder.name);
    if (newName && newName !== folder.name) updateFolder(folder.id, newName);
  };
  const handleDeleteFolder = (folder: Folder) => {
    if (confirm(`Are you sure you want to delete folder "${folder.name}"?`)) deleteFolder(folder.id);
  };

  // ------------------ File actions ------------------
  const handleRenameFile = (file: FileType) => {
    const newName = prompt("Enter new file name", file.name);
    if (newName && newName !== file.name) updateFile(file.id, newName);
  };
  const handleDeleteFile = (file: FileType) => {
    if (confirm(`Are you sure you want to delete file "${file.name}"?`)) deleteFile(file.id);
  };

  // ------------------ Selector de archivos ------------------
  const handleSelectFile = () => {
    if (!selectedFolderId) return alert("Select a folder first");
    fileInputRef.current?.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedFolderId) return;
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file: File) => {
      if (file.type === "application/pdf") addFile(selectedFolderId, file);
      else alert("Only PDF files are allowed");
    });

    e.target.value = '';
  };

  return (
    <Layout>
      <div
        className={`p-6 min-h-screen transition-colors ${isDragging ? 'bg-gray-100 border-4 border-dashed border-gray-400' : ''}`}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {loading && <div className="text-center text-gray-500 font-semibold">Loading...</div>}

        <Breadcrumbs breadcrumbs={breadcrumbs} onSelect={selectFolder} />

        <div className="flex flex-col space-y-2 mt-4">
          {/* Carpeta padre ".." */}
          {currentFolder?.parent_id && (
            <div
              key={currentFolder.parent_id + '-'}
              onDragEnter={() => handleFolderDragEnter(currentFolder.parent_id!)}
              onDragLeave={() => handleFolderDragLeave(currentFolder.parent_id!)}
              onDrop={() => handleFolderDrop(currentFolder.parent_id!)}
              className={`rounded ${dropTargetFolderId === currentFolder.parent_id ? 'bg-gray-200 border-2 border-dashed border-gray-400' : ''}`}
            >
              <FolderCard
                folder={{id: currentFolder.parent_id, name: '..', files: [], subfolders: [], parent_id: null, created_at: '', updated_at: ''}}
                onClick={selectFolder}
                onRename={() => {}}
                onDelete={() => {}}
                isDropTarget={dropTargetFolderId === currentFolder.parent_id}
                isBackFolder
              />
            </div>
          )}

          {/* Carpeta hijas */}
          {childrenFolders.map(folder => (
            <div
              key={folder.id}
              draggable
              onDragStart={() => handleFolderDragStart(folder)}
              onDragEnter={() => handleFolderDragEnter(folder.id)}
              onDragLeave={() => handleFolderDragLeave(folder.id)}
              onDrop={() => handleFolderDrop(folder.id)}
              className={`rounded ${dropTargetFolderId === folder.id ? 'bg-gray-200 border-2 border-dashed border-gray-400' : ''}`}
            >
              <FolderCard
                folder={folder}
                onClick={selectFolder}
                onRename={handleRenameFolder}
                onDelete={handleDeleteFolder}
                isDropTarget={dropTargetFolderId === folder.id}
              />
            </div>
          ))}

          {/* Archivos */}
          {childrenFiles.map(file => (
            <FileCard
              key={file.id}
              file={file}
              onRename={handleRenameFile}
              onDelete={handleDeleteFile}
              draggable
              onDragStart={() => setDraggedFileId(file.id)}
            />
          ))}
        </div>

        {/* Input oculto para selector de archivos */}
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        {/* FAB */}
        <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-2">
          {fabOpen && (
            <div className="flex flex-col space-y-2 mb-2">
              <button
                onClick={() => {
                  const name = prompt("Enter folder name");
                  if (name) addFolder(name, selectedFolderId || undefined);
                  setFabOpen(false);
                }}
                className="bg-gray-700 hover:bg-gray-500 text-white px-4 py-2 rounded shadow"
              >
                Add Folder
              </button>
              <button
                onClick={() => {
                  handleSelectFile();
                  setFabOpen(false);
                }}
                className="bg-gray-700 hover:bg-gray-500 text-white px-4 py-2 rounded shadow"
              >
                Add File
              </button>
            </div>
          )}
          <button
            onClick={() => setFabOpen(!fabOpen)}
            className="bg-gray-800 hover:bg-gray-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
          >
            <Plus size={24} />
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default App;
