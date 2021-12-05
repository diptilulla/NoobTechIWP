import React, { useState } from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import FormInput from "./formInput/formInput";

function CreateMessage({ setMessage }) {
  const [newMessage, setNewMessage] = useState("");

  const handleChange = async (event) => {
    const { value } = event.target;
    setNewMessage(value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage(newMessage, setNewMessage);
  };
  return (
    <div className="rounded flex gap-x-2 px-6 bg-purple-dark justify-between items-center mt-2">
      <div className="flex-grow">
        <FormInput
          placeholder="Type something .."
          handleChange={handleChange}
          margin="margin"
          value={newMessage}
        />
      </div>
      <RiSendPlane2Fill
        className="text-2xl cursor-pointer"
        onClick={handleSubmit}
      />
    </div>
  );
}

export default CreateMessage;
