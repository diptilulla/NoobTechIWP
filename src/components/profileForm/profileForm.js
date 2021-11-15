import React, { useState } from "react";
import { Chip, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { navigate } from "gatsby";
import TextField from "@material-ui/core/TextField";

import {
  selectProfile,
  setEditProfile,
} from "../../redux/features/profile/profileSlice";
import { unsetInterestedRooms } from "../../redux/features/chatroom/chatroomSlice";

import { selectUser } from "../../redux/features/user/usersSlice";
import FormInput from "../formInput/formInput";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    gap: "5px",
    flexDirection: "column",
    padding: theme.spacing(2),
    margin: 0,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: theme.palette.secondary.light,
  },
  list: {
    display: "flex",
    gap: "5px",
    flexWrap: "wrap",
    listStyle: "none",
  },
  center: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "max-content",
  },
  textfield: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderBottom: "1px solid #9D5BFF",
    },

    "& .MuiOutlinedInput-input": {
      color: "#C4C4C4",
    },

    "& .MuiInputLabel-outlined": {
      color: "#C4C4C4",
    },
  },
  cancel: {
    backgroundColor: theme.palette.primary.light,
    color: "#fff",
  },
  chips: {
    backgroundColor: "#9D5BFF",
    color: "white",
  },
}));

const ProfileForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const currentUser = useSelector(selectUser);
  const profile = useSelector(selectProfile);
  console.log(currentUser.id);
  const initialState = {
    user_name: profile ? profile.user_name : "",
    profile_img: null,
    interests: profile ? profile.interests : [],
    interest: "",
  };

  const [profileDetails, setProfileDetails] = useState(initialState);
  const [interestChanged, setInterestChanged] = useState(false);

  const handleDelete = (chipToDelete) => () => {
    var array = [...profileDetails.interests]; // make a separate copy of the array
    if (chipToDelete !== -1) {
      setInterestChanged(true);
      array.splice(chipToDelete, 1);
      setProfileDetails({ ...profileDetails, interests: array });
    }
  };

  const handleChange = (event) => {
    switch (event.target.name) {
      case "profile_img":
        if (event.target.files.length > 0) {
          setProfileDetails({
            ...profileDetails,
            profile_img: event.target.files[0],
          });
        }
        break;
      default:
        const { name, value } = event.target;
        console.log({ name });
        setProfileDetails({ ...profileDetails, [name]: value });
        if (name === "interest" && value.includes(",")) {
          const formatValue = value.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
          if (formatValue.length) {
            setProfileDetails({
              ...profileDetails,
              interests: [
                ...new Set([...profileDetails.interests, formatValue]),
              ],
              interest: "",
            });
            setInterestChanged(true);
          }
        }
    }
  };
  const handleEnter = (event) => {
    const { value } = event.target;
    if (event.key === "Enter") {
      const formatValue = value.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
      if (formatValue.length)
        setProfileDetails({
          ...profileDetails,
          interests: [...new Set([...profileDetails.interests, formatValue])],
          interest: "",
        });
    } else {
      return;
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const { interest, ...otherProfileDetails } = profileDetails;
    if (interestChanged) dispatch(unsetInterestedRooms());
    dispatch(
      setEditProfile({
        profileDetails: {
          id: profile?.id,
          user_id: currentUser.id,
          ...otherProfileDetails,
        },
        oldProfileDetails: profile,
        navigate,
        path: "/profile",
      })
    );
  };

  const { user_name, interests, interest } = profileDetails;

  const closeForm = () => {
    navigate("/profile");
  };

  return (
    <div
      style={{ height: "90vh" }}
      className="flex justify-center items-center"
    >
      <div className="flex flex-col flex-gap-2 w-4/5 md:w-1/2 lg:w-1/3 p-10 bg-black sm:w-7/12 md:w-1/2 lg:w-4/12 m-auto border-2 border-purple rounded-md">
        <h1 className="text-4xl text-purple">Profile</h1>
        <FormInput
          type="text"
          name="user_name"
          value={user_name}
          handleChange={handleChange}
          label="User name"
          required
        />
        <span className="ml-1 text-gray">Profile image</span>
        <TextField
          className={classes.textfield}
          fullWidth
          type="file"
          name="profile_img"
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
          {profile && (
            <button
              className="block px-3 bg-gray-dark text-white p-2 hover:shadow-md px-8 rounded-3xl"
              onClick={closeForm}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
