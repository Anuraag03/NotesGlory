import React,{useState} from 'react'
import NavBar from '../../components/NavBar/NavBar'
import NoteCard from '../../components/Cards/NoteCard'
import {MdAdd} from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
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

  React.useEffect(() => {
    if (token) {
      import('../../api').then(api => {
        api.fetchNotes(token).then(setNotes);
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
      <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-600 hover:bg-blue-800 absolute right-10 bottom-10' onClick={()=>{
        setOpenAddEditModal({
          isShown: true,
          type: "add",
          data: null,
        });
      }}>
        <MdAdd className="text-[32px] text-white"/> 
      </button>
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