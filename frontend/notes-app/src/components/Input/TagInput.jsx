import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags = [], setTags }) => {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...(Array.isArray(tags) ? tags : []), inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // optional: prevents form submission
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags((Array.isArray(tags) ? tags : []).filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-700 text-sm px-2 py-1 rounded flex items-center gap-1"
            >
              #{tag}
              <button onClick={() => handleRemoveTag(tag)}>
                <MdClose className="text-red-500 hover:text-red-700" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
          placeholder="Add tags"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full bg-blue-500 hover:bg-blue-700"
          onClick={() => addNewTag()}
        >
          <MdAdd className="text-2xl text-white" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
