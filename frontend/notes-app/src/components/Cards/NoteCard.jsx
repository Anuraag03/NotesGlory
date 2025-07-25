import React from "react";
import { MdOutlinePushPin } from "react-icons/md";
import { MdCreate, MdDelete } from "react-icons/md";
const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="border rounded p-4 bg-gray-700 hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-xl text-white font-medium">{title}</h6>
          <span className="text-xs text-white">{date}</span>
        </div>
        <MdOutlinePushPin className={`icon-btn ${isPinned? 'text-red-400': 'text-white'}`} onClick={onPinNote} />
      </div>
      <p className="text-white text-xs mt-2">{content?.slice(0, 60)}</p>
      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-gray-300">{tags}</div>

        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn text-white hover:text-green-600"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn text-white hover:text-red-500"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
