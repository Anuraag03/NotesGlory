import React,{useState} from 'react'
import NavBar from '../../components/NavBar/NavBar'
import NoteCard from '../../components/Cards/NoteCard'
import {MdAdd} from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
Modal.setAppElement('#root');
const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type:"add",
    data:null,
  });
  return (
    <div className=''>
      <NavBar/>
      <div className='container mx-auto'>
        <div className="grid grid-cols-3 gap-4 mt-4">
        <NoteCard
          title="25th July 25" 
          date="25th July 2025"
          content="This is a sample note content for the home page."
          tags="#sample"
          isPinned={true}
          onEdit={() => {}}
          onDelete={() => {}}
          onPinNote={() => {}}
        
        />
        </div>
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
        />
      </Modal>
    </div>
  )
}

export default Home