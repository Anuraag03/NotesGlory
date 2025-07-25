import React,{useState} from "react";
import TagInput from "../../components/Input/TagInput";

const AddEditNotes = (props) => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);

    const [error,setError] = useState(null);

    const { type, data, token, onNoteAdded, onClose } = props;

    React.useEffect(() => {
        if (type === 'edit' && data) {
            setTitle(data.title || '');
            setContent(data.content || '');
            setTags(data.tags || []);
        } else {
            setTitle('');
            setContent('');
            setTags([]);
        }
    }, [type, data]);

    const handleAddNote = async () => {
        if (!title) {
            setError("Please enter title");
            return;
        }
        if (!content) {
            setError("Please enter content");
            return;
        }
        setError("");
        if (type === "edit") {
            const { updateNote } = await import('../../api');
            await updateNote(token, data._id, { title, content, tags });
        } else {
            const { createNote } = await import('../../api');
            await createNote(token, { title, content, tags });
        }
        if (onNoteAdded) onNoteAdded();
        if (onClose) onClose();
    }
  return (
    <div>
      <div className="flex flex-col text-white gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-xl bg-gray-700 text-white p-2 rounded w-full outline-none"
          placeholder="Ex: My First Note"
          value={title}
          onChange={({target})=> setTitle(target.value)}
        ></input>
        <div>
          <label className="input-label">CONTENT</label>
          <textarea
            type="text"
            className="text-white text-sm bg-gray-700 p-2 rounded w-full outline-none min-h-[180px]"
            placeholder="Write your note here..."
            value={content}
            onChange={({target})=> setContent(target.value)}
          ></textarea>
        </div>
        <div className="mt-3">
          <label className="input-label">TAGS</label>
          <TagInput tags={tags} setTags={setTags}/>
        </div>

        {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

        <button
          className="btn-primary font-medium mt-5 p-3"
          onClick={handleAddNote}
        
        >
          ADD
        </button>
      </div>
    </div>
  );
};

export default AddEditNotes;
