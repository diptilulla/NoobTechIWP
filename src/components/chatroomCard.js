import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar } from "@material-ui/core";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  joinChatroom,
  leaveChatroom,
} from "../redux/features/chatroom/chatroomSlice";
import { selectUser } from "../redux/features/user/usersSlice";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.secondary.light,
    height: "54px !important",
    width: "54px !important",
    margin: "10px auto",
    "& img": {
      width: "100%",
    },
  },
}));

function ChatroomCard({ your, details: { _id, name, description, avatar } }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const currentUser = useSelector(selectUser);

  return (
    <div className="flex flex-col gap-2 border-2 border-purple rounded-md bg-black p-5">
      {avatar ? (
        <Avatar src={avatar} className={classes.avatar} />
      ) : (
        <HiOutlineUserCircle className={classes.avatar} />
      )}
      <h1 className="text-2xl text-purple">{name}</h1>
      <p className="text-gray-light">{description}</p>
      <button
        className="block px-3 bg-purple text-white p-2 hover:shadow-md px-8 rounded-3xl mt-auto w-1/2 mx-auto"
        onClick={() =>
          your
            ? dispatch(leaveChatroom({ _id, user_id: currentUser.id }))
            : dispatch(joinChatroom({ _id, user_id: currentUser.id }))
        }
      >
        {!your ? "Join" : "Leave"}
      </button>
    </div>
  );
}

export default ChatroomCard;
