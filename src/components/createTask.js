import React, { useState } from "react";
import { navigate } from "gatsby";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "./formInput/formInput";
import { ImCross } from "react-icons/im";
import { setTask } from "../redux/features/chatroom/chatroomTasksThunk";
import { selectUser } from "../redux/features/user/usersSlice";

function CreateTask({ chatroom_id, setShowForm }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);

  const initialState = {
    user_id: currentUser.id,
    chatroom_id,
    title: "",
    content: ""
  };
  const [taskDetails, setTaskDetails] = useState(initialState);

  const closeForm = () => {
    setShowForm(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setTask({ taskDetails, setShowForm }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTaskDetails({ ...taskDetails, [name]: value });
  };

  const { title, content } = taskDetails;

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 10,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }}
      className="w-11/12 p-10 bg-black sm:w-7/12 md:w-1/2 lg:w-4/12 m-auto border-2 border-purple rounded-md"
    >
      <ImCross
        className="block ml-auto cursor-pointer text-gray"
        onClick={closeForm}
      />
      <form>
        <FormInput
          type="title"
          name="title"
          value={title}
          handleChange={handleChange}
          label="Title"
          required
        />
        <FormInput
          type="content"
          name="content"
          value={content}
          handleChange={handleChange}
          label="Content"
          required
        />
        <button
          className="block px-3 bg-purple text-white p-2 hover:shadow-md px-8 rounded-3xl mx-auto"
          onClick={handleSubmit}
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
