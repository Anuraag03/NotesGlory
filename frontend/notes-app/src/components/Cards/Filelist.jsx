import React from 'react';

const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL || '';

const Filelist = ({ files, onDelete }) => {
  if (!files || files.length === 0) {
    return (
      <div className="mt-4 text-gray-400 text-center text-sm">
        No files uploaded yet.
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-white mb-2">Uploaded Files</h3>
      <ul className="space-y-2">
        {files.map(file => (
          <li key={file.id} className="flex items-center gap-3 bg-gray-800 rounded px-3 py-2">
            <span className="text-blue-400 break-all flex-1">{file.filename}</span>
            <span className="text-xs text-gray-400">{file.contentType}</span>
            <a
              href={`${API_URL}/files/${file.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
              download={file.filename}
            >
              Download
            </a>
            <button
              className="ml-2 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
              onClick={() => onDelete && onDelete(file.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filelist;