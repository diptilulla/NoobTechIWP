import React, { useState } from "react";
import "./chatroomForm.scss";
import { Chip, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { navigate } from "gatsby";
import TextField from "@material-ui/core/TextField";
import { selectUser } from "../../redux/features/user/usersSlice";
import FormInput from "../formInput/formInput";
import { setChatroom } from "../../redux/features/chatroom/chatroomSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    gap: "5px",
    flexDirection: "column",
    padding: theme.spacing(2),
    margin: 0,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: theme.palette.secondary.light
  },
  list: {
    display: "flex",
    gap: "5px",
    flexWrap: "wrap",
    listStyle: "none"
  },
  center: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "max-content"
  },
  textfield: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderBottom: "1px solid #9D5BFF"
    },

    "& .MuiOutlinedInput-input": {
      color: "#C4C4C4"
    },

    "& .MuiInputLabel-outlined": {
      color: "#C4C4C4"
    }
  },
  cancel: {
    backgroundColor: theme.palette.primary.light,
    color: "#fff"
  },
  chips: {
    backgroundColor: "#9D5BFF",
    color: "white"
  }
}));

const ChatroomForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const currentUser = useSelector(selectUser);

  const initialState = {
    name: "",
    description: "",
    avatar: null,
    user_ids: [currentUser?.id],
    interests: [],
    interest: ""
  };

  const [chatroomDetails, setChatroomDetails] = useState(initialState);

  const handleDelete = (chipToDelete) => () => {
    var array = [...chatroomDetails.interests]; // make a separate copy of the array
    if (chipToDelete !== -1) {
      array.splice(chipToDelete, 1);
      setChatroomDetails({ ...chatroomDetails, interests: array });
    }
  };

  const handleChange = (event) => {
    switch (event.target.name) {
      case "avatar":
        if (event.target.files.length > 0) {
          setChatroomDetails({
            ...chatroomDetails,
            avatar: event.target.files[0]
          });
        }
        break;
      default:
        const { name, value } = event.target;
        console.log({ name });
        setChatroomDetails({ ...chatroomDetails, [name]: value });
        if (name === "interest" && value.includes(",")) {
          const formatValue = value.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
          if (formatValue.length) {
            setChatroomDetails({
              ...chatroomDetails,
              interests: [
                ...new Set([...chatroomDetails.interests, formatValue])
              ],
              interest: ""
            });
          }
        }
    }
  };
  const handleEnter = (event) => {
    const { value } = event.target;
    if (event.key === "Enter") {
      const formatValue = value.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
      if (formatValue.length)
        setChatroomDetails({
          ...chatroomDetails,
          interests: [...new Set([...chatroomDetails.interests, formatValue])],
          interest: ""
        });
    } else {
      return;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { interest, ...otherchatroomDetails } = chatroomDetails;
    dispatch(
      setChatroom({
        chatroomDetails: otherchatroomDetails,
        navigate,
        path: "/profile"
      })
    );
  };

  const { name, description, interests, interest } = chatroomDetails;

  return (
    <div
      style={{ height: "90vh" }}
      className="flex justify-center items-center"
    >
      <div className="flex flex-col flex-gap-2 w-4/5 md:w-1/2 lg:w-1/3 p-10 bg-black sm:w-7/12 md:w-1/2 lg:w-4/12 m-auto border-2 border-purple rounded-md">
        <h1 className="text-4xl text-purple">Create Chatroom</h1>
        <FormInput
          type="text"
          name="name"
          value={name}
          handleChange={handleChange}
          label="name"
          required
        />
        <div className="group margin w-full">
          <textarea
            className="form-input"
            name="description"
            rows="4"
            value={description}
            onChange={handleChange}
          />
          <label
            className={`${description.length ? "shrink" : ""} form-input-label`}
          >
            description
          </label>
        </div>

        <span className="ml-1 text-gray">Avatar</span>
        <TextField
          className={classes.textfield}
          fullWidth
          type="file"
          name="avatar"
          variant="outlined"
          helperText="Please upload your profile image"
          onChange={handleChange}
        />
        {interests?.length ? (
          <ul className={classes.list}>
            {interests.map((data, i) => {
              return (
                <li key={i}>
                  <Chip
                    label={data}
                    onDelete={handleDelete(i)}
                    className={classes.chips}
                  />
                </li>
              );
            })}
          </ul>
        ) : null}
        <FormInput
          type="text"
          name="interest"
          label="Interests"
          value={interest}
          handleChange={handleChange}
          onKeyUp={handleEnter}
        />
        <span className="mx-auto text-sm mb-4">
          Press enter/, after adding each interest
        </span>
        <div className="mx-auto flex gap-x-6">
          <button
            className="block px-3 bg-purple text-white p-2 hover:shadow-md px-8 rounded-3xl"
            onClick={handleSubmit}
          >
            Save details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatroomForm;
