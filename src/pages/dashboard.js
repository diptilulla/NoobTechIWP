import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { selectProfile } from "../redux/features/profile/profileSlice";
import {
  chatroomsSelector,
  getAllChatrooms,
  getAllInterestChatrooms,
  selectChatroomsStatus,
} from "../redux/features/chatroom/chatroomSlice";
import { useDispatch, useSelector } from "react-redux";
import ChatroomCard from "../components/chatroomCard";
import Navbar from "../components/navbar";
import { CircularProgress } from "@material-ui/core";
import Gallery from "../components/gallery/gallery";

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

function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const interestedChatroomsIds = useSelector(
    (state) => state.chatrooms.interestedRooms
  );
  const userChatroomsIds = useSelector((state) => state.chatrooms.userRooms);
  const allChatroomsArray = useSelector(chatroomsSelector.selectAll);
  console.log(allChatroomsArray.length === interestedChatroomsIds.length);
  const chatroomStatus = useSelector(selectChatroomsStatus);
  const profile = useSelector(selectProfile);

  const [viewAllChatrooms, setViewAllChatrooms] = useState(false);

  useEffect(() => {
    if (!profile?.interests.length) setViewAllChatrooms(true);
  }, [profile]);

  useEffect(() => {
    if (!interestedChatroomsIds.length && profile.interests.length)
      dispatch(getAllInterestChatrooms({ interests: profile.interests }));
  }, [dispatch, interestedChatroomsIds, profile]);

  useEffect(() => {
    console.log({
      effect:
        viewAllChatrooms &&
        (!allChatroomsArray.length ||
          allChatroomsArray.length === interestedChatroomsIds.length ||
          allChatroomsArray.length === userChatroomsIds.length),
    });
    if (
      viewAllChatrooms &&
      (!allChatroomsArray.length ||
        allChatroomsArray.length === interestedChatroomsIds.length ||
        allChatroomsArray.length === userChatroomsIds.length)
    ) {
      dispatch(getAllChatrooms());
    }
  }, [dispatch, viewAllChatrooms, allChatroomsArray, interestedChatroomsIds]);

  return (
    <>
      <Navbar />
      <div className="p-10">
        {chatroomStatus === "get loading" ? (
          <div className="w-max mx-auto p-20">
            <CircularProgress color="inherit" />
          </div>
        ) : (
          <Gallery heading="Interested Chatrooms" type="interested" />
        )}
        <button
          className="block px-3 bg-purple text-white p-2 hover:shadow-md px-8 rounded-3xl mx-auto"
          onClick={() =>
            setViewAllChatrooms((viewAllChatrooms) => !viewAllChatrooms)
          }
        >
          {viewAllChatrooms ? "Close all chatrooms" : "View all chatrooms"}
        </button>
        {viewAllChatrooms && (
          <>
            {chatroomStatus === "get loading" ? (
              <div className="w-max mx-auto p-20">
                <CircularProgress color="inherit" />
              </div>
            ) : (
              <Gallery heading="All Chatrooms" type="all" />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Dashboard;
