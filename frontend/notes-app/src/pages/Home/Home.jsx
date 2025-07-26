import React,{useState} from 'react'
import NavBar from '../../components/NavBar/NavBar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd, MdNoteAdd, MdAttachFile, MdClose } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import { uploadFile, deleteFile } from '../../api';
import Filelist from '../../components/Cards/Filelist'; // Make sure this matches the filename and export
Modal.setAppElement('#root');
const Home = () => {
  const token = localStorage.getItem('token');
  const [notes, setNotes] = useState([]);
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type:"add",
    data:null,
  });
  const [searchInput, setSearchInput] = useState("");
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  // Add a state to store uploaded files metadata
  const [files, setFiles] = useState([]);

  React.useEffect(() => {
    if (token) {
      import('../../api').then(api => {
        api.fetchNotes(token).then(setNotes);
        api.fetchFiles(token).then(setFiles);
      });
    }
  }, [token]);
  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <NavBar/>
        <h2 className="text-2xl text-gray-700 mt-10">Please log in to view your notes.</h2>
        <a href="/login" className="mt-4 text-blue-500 underline">Go to Login</a>
      </div>
    );
  }
  const handleDelete = async (id) => {
    const { deleteNote } = await import('../../api');
    await deleteNote(token, id);
    const { fetchNotes } = await import('../../api');
    fetchNotes(token).then(setNotes);
  };
  const handlePin = async (id, isPinned) => {
    const { pinNote } = await import('../../api');
    await pinNote(token, id, !isPinned);
    const { fetchNotes } = await import('../../api');
    fetchNotes(token).then(setNotes);
  };
  // Live filter notes using regex search
  let filteredNotes = notes;
  if (searchInput.trim()) {
    try {
      const regex = new RegExp(searchInput, 'i');
      filteredNotes = notes.filter(note =>
        regex.test(note.title) || regex.test(note.content) || (note.tags && note.tags.some(tag => regex.test(tag)))
      );
    } catch (e) {
      // Invalid regex, show all notes
      filteredNotes = notes;
    }
  }
  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleClearSearch = () => {
    setSearchInput("");
  };
  const handleFileDelete = async (id) => {
    await deleteFile(token, id);
    setFiles(files => files.filter(f => f.id !== id));
  };
  // Filter files based on search input
  let filteredFiles = files;
  if (searchInput.trim()) {
    try {
      const regex = new RegExp(searchInput, 'i');
      filteredFiles = files.filter(
        file =>
          regex.test(file.filename) ||
          regex.test(file.contentType)
      );
    } catch (e) {
      filteredFiles = files;
    }
  }
  return (
    <div className=''>
      <NavBar
        searchInput={searchInput}
        onInputChange={handleInputChange}
        onClearSearch={handleClearSearch}
      />
      <div className='container mx-auto'>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {filteredNotes.length > 0 ? (
          filteredNotes.map(note => (
            <NoteCard
              key={note._id}
              title={note.title}
              date={new Date(note.createdAt).toLocaleDateString()}
              content={note.content}
              tags={note.tags?.join(', ')}
              isPinned={note.isPinned}
              files={files.filter(f => f.noteId === note._id)}
              onEdit={() => setOpenAddEditModal({ isShown: true, type: 'edit', data: note })}
              onDelete={() => handleDelete(note._id)}
              onPinNote={() => handlePin(note._id, note.isPinned)}
            />
          ))
        ) : (
          notes.length > 0 ? (
            <div className="col-span-3 text-center text-gray-400 text-xl mt-10">No matching notes found.</div>
          ) : null
        )}
      </div>

      {/* Place Filelist here */}
      <Filelist files={filteredFiles} onDelete={handleFileDelete} />

      <button
        className='w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-600 hover:bg-blue-800 absolute right-10 bottom-10'
        onClick={() => setShowAddMenu(true)}
      >
        <MdAdd className="text-[32px] text-white cursor-pointer"/>
      </button>

      {/* Add menu modal */}
      {showAddMenu && (
        <div className="fixed inset-0 z-50 flex items-end justify-end">
          {/* Overlay click to close */}
          <div
            className="absolute inset-0"
            onClick={() => setShowAddMenu(false)}
          />
          {/* Popup */}
          <div className="relative mr-12 mb-24">
            {/* Triangle */}
            <div className="absolute -top-3 right-6 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white/0" />
            <div className="rounded-xl shadow-2xl p-2 flex flex-col bg-gray-900 min-w-[220px]">
              <button
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition"
                onClick={() => {
                  setOpenAddEditModal({ isShown: true, type: "add", data: null });
                  setShowAddMenu(false);
                }}
              >
                <MdNoteAdd className="text-blue-600 text-2xl" />
                <span className="text-white font-medium ">Add Note</span>
              </button>
              <button
                className="flex items-center gap-3 px-4 py-3 cursor-pointer rounded-lg hover:bg-gray-700 transition"
                onClick={() => {
                  setShowFileModal(true);
                  setShowAddMenu(false);
                }}
              >
                <MdAttachFile className="text-green-600 text-2xl" />
                <span className="text-white font-medium">Add File</span>
              </button>
              <button
                className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-700 transition"
                onClick={() => setShowAddMenu(false)}
              >
                <MdClose className="text-red-500 text-2xl" />
                <span className="text-white font-medium cursor-pointer">Cancel</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* File upload modal */}
      {showFileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-gray-900 rounded-lg p-6 flex flex-col gap-4">
            <h2 className="text-xl text-white font-bold mb-2">Upload File</h2>
            <input
              type="file"
              accept=".pdf,.doc,.docx,image/*,video/*"
              onChange={e => setSelectedFile(e.target.files[0])}
              className="block w-full text-white file:mr-4 file:py-2 cursor-pointer file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 bg-transparent p-0"
            />
            <div className="flex gap-2 mt-2">
              <button
                className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded hover:bg-blue-700"
                onClick={async () => {
                  if (!selectedFile) return;
                  const res = await uploadFile(token, selectedFile);
                  // Only keep serializable fields
                  setFiles(prev => [
                    ...prev,
                    {
                      id: res.fileId || res.id || res._id, // adapt to your backend response
                      filename: res.filename,
                      contentType: res.contentType,
                      length: res.length,
                      uploadDate: res.uploadDate,
                    }
                  ]);
                  setShowFileModal(false);
                  setSelectedFile(null);
                }}
              >
                Upload
              </button>
              <button
                className="px-4 py-2 bg-gray-300 cursor-pointer text-black rounded hover:bg-gray-400"
                onClick={() => {
                  setShowFileModal(false);
                  setSelectedFile(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => setOpenAddEditModal({ ...openAddEditModal, isShown: false })}
        className="fixed left-1/2 top-1/2 w-[90vw] h-[90vh] -translate-x-1/2 -translate-y-1/2 bg-gray-800 rounded-lg p-8 shadow-2xl border border-blue-500 focus:outline-none overflow-y-auto"
        overlayClassName="fixed inset-0 flex items-center justify-center z-50"
        title={openAddEditModal.type === "add" ? "Add Note" : "Edit Note"}
      >
        <AddEditNotes
          type={openAddEditModal.type}
          data={openAddEditModal.data}
          onClose={() => setOpenAddEditModal({ ...openAddEditModal, isShown: false })}
          token={token}
          onNoteAdded={() => {
            import('../../api').then(api => {
              api.fetchNotes(token).then(setNotes);
            });
            setOpenAddEditModal({ ...openAddEditModal, isShown: false });
          }}
        />
      </Modal>

    </div>
    </div>

  );
}
export default Home;