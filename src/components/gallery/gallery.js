import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { chatroomsSelector } from "../../redux/features/chatroom/chatroomSlice";
import ChatroomCard from "../chatroomCard";
import "./gallery.scss";
// import ChatroomCard from "../chatroomCard";

function Gallery({ heading, type }) {
  const userChatroomsIds = useSelector((state) => state.chatrooms.userRooms);
  const interestedChatroomsIds = useSelector(
    (state) => state.chatrooms.interestedRooms
  );
  const allChatroomsEntities = useSelector((state) => state.chatrooms.entities);
  const allChatroomsArray = useSelector(chatroomsSelector.selectAll);
  const [chatrooms, setChatrooms] = useState(null);

  useEffect(() => {
    switch (type) {
      case "interested":
        const interestedchatrooms = interestedChatroomsIds.map(
          (id) => allChatroomsEntities[id]
        );
        setChatrooms(interestedChatroomsIds.length ? interestedchatrooms : []);
        break;
      case "all":
        setChatrooms(allChatroomsArray.length ? allChatroomsArray : []);
        break;
      case "user":
        const userchatrooms = userChatroomsIds.map(
          (id) => allChatroomsEntities[id]
        );
        setChatrooms(userChatroomsIds.length ? userchatrooms : []);
        break;
    }
  }, [
    interestedChatroomsIds,
    allChatroomsEntities,
    allChatroomsArray,
    userChatroomsIds,
  ]);

  return (
    <div className="mb-10">
      <h1 className="text-3xl text-purple mb-5">{heading}</h1>
      {chatrooms && (
        <div className="grid-wrapper">
          {chatrooms.length ? (
            chatrooms.map((chatroom) => (
              <ChatroomCard
                your={
                  type === "user" || userChatroomsIds.includes(chatroom._id)
                }
                key={chatroom._id}
                details={chatroom}
              />
            ))
          ) : (
            <span>No chatrooms found</span>
          )}
        </div>
      )}
      <hr className="mt-5 border-gray-dark"></hr>
    </div>
  );
}

export default Gallery;
