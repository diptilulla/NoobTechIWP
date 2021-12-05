import React, { useCallback, useEffect, useRef, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setChatroomMessage } from "../redux/features/chatroom/chatroomMessagesThunk";
import {
  chatroomsSelector,
  selectChatroomMessagesStatus,
} from "../redux/features/chatroom/chatroomSlice";
import { selectProfile } from "../redux/features/profile/profileSlice";
import { setChatroomSocket } from "../redux/features/socket/socketSlice";
import { selectUser } from "../redux/features/user/usersSlice";
import {
  closeSocketG,
  connectSocketG,
  openSocketG,
  useReceiveSocket,
} from "../services/socket/socket";
import Message from "./message";
import CreateMessage from "./createMessage";

const MessageContainer = ({ chatroom_id }) => {
  const dispatch = useDispatch();
  const client_1 = useRef(null);
  const scrollRef = useRef();

  const receiveSocketG = useReceiveSocket();

  const currentUser = useSelector(selectUser);
  const profile = useSelector(selectProfile);

  const chatroomMessagesIds = useSelector((state) =>
    chatroomsSelector.selectById(state, chatroom_id)
  )?.messages;

  const allChatroomMessages = useSelector(
    (state) => state.chatrooms.messages.entities
  );
  const chatroomMessagesStatus = useSelector(selectChatroomMessagesStatus);

  const setMessage = useCallback(
    (content, setNewMessage) => {
      dispatch(
        setChatroomMessage({
          messageDetails: {
            content,
            user_id: profile.user_id,
            user_name: profile.user_name,
            chatroom_id,
          },
          setNewMessage,
        })
      );
    },
    [dispatch, profile, chatroom_id]
  );

  const [chatroomMessages, setChatroomMessages] = useState([]);

  //   const deleteGrpThread = useCallback((id) =>
  //     dispatch(
  //       deleteGroupThread({ id, user_id: profile?.user_id, group_id: group.id })
  //     )
  //   );

  useEffect(() => {
    if (chatroomMessagesIds) {
      const chatroommessages = chatroomMessagesIds.map(
        (id) => allChatroomMessages[id]
      );
      setChatroomMessages(chatroomMessagesIds.length ? chatroommessages : []);
    }
  }, [chatroomMessagesIds, allChatroomMessages]);

  useEffect(() => {
    if (currentUser) {
      if (!client_1.current) {
        client_1.current = connectSocketG();
        if (client_1.current) {
          client_1.current.onopen = openSocketG(client_1.current);
          client_1.current.onclose = closeSocketG(client_1.current);
          console.log({ client_1current: client_1.current });
          client_1.current.onmessage = receiveSocketG;
          dispatch(setChatroomSocket(client_1.current));
        }
      }
    }
    return () => {
      if (!currentUser) {
        client_1.current.close();
      }
    };
  }, [dispatch, receiveSocketG, currentUser]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [chatroomMessages]);
  return (
    <div>
      {chatroomMessagesStatus === "get loading" && (
        <div className="w-max mx-auto p-20">
          <CircularProgress color="inherit" />
        </div>
      )}
      <div
        style={{ height: "480px" }}
        className="overflow-auto mx-auto flex flex-col gap-y-5"
      >
        {chatroomMessages.length ? (
          chatroomMessages.map((msg, i) =>
            i + 1 == chatroomMessages.length ? (
              <div
                key={msg._id}
                ref={scrollRef}
                className={`${msg.user_id === currentUser.id && "self-end"}`}
              >
                <Message message={msg} />
              </div>
            ) : (
              <div
                key={msg._id}
                className={`${msg.user_id === currentUser.id && "self-end"}`}
              >
                <Message message={msg} />
              </div>
            )
          )
        ) : (
          <h2 className="max-w-max mx-auto my-2 text-gray-dark font-semibold">
            No messages found, start chat
          </h2>
        )}
      </div>
      <CreateMessage setMessage={setMessage} />
    </div>
  );
};

export default MessageContainer;
