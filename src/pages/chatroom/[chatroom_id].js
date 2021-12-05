import React, { useEffect, useState } from "react";
import {
  Avatar,
  CircularProgress,
  makeStyles,
  Tab,
  Tabs
} from "@material-ui/core";
import TabPanel from "../../components/tabPanel";
import { HiOutlineUserCircle } from "react-icons/hi";
import { getAllChatroomMessages } from "../../redux/features/chatroom/chatroomMessagesThunk";
import { useDispatch, useSelector } from "react-redux";
import MessageContainer from "../../components/messageContainer";
import {
  chatroomsSelector,
  selectChatroomsStatus,
  getChatroom,
  joinChatroom,
  leaveChatroom,
  selectChatroomTasksStatus
} from "../../redux/features/chatroom/chatroomSlice";
import NavBar from "../../components/navbar";
import { selectUser } from "../../redux/features/user/usersSlice";
import TaskContainer from "../../components/taskContainer";
import { getAllChatroomTasks } from "../../redux/features/chatroom/chatroomTasksThunk";
function a11yProps(index) {
  return {
    id: `chatroom-tab-${index}`,
    "aria-controls": `chatroom-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#AE70FC",
    display: "flex",
    height: "100%"
  },
  tabs: {
    paddingTop: "1rem",
    backgroundColor: "#393939",
    color: "#fff",
    width: "max-width"
  },
  tabCurrent: {
    backgroundColor: "#9C5AFF",
    color: "#3D3C3C"
  }
}));
function Chatroom({ params: { chatroom_id } }) {
  console.log(chatroom_id);
  const styleClasses = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);

  const userChatroomsIds = useSelector((state) => state.chatrooms.userRooms);
  const chatroomDetails = useSelector((state) =>
    chatroomsSelector.selectById(state, chatroom_id)
  );
  console.log(chatroomDetails);
  const chatroomStatus = useSelector(selectChatroomsStatus);
  const chatroomTasksStatus = useSelector(selectChatroomTasksStatus);

  const chatroomMessagesIds = useSelector(
    (state) => chatroomsSelector.selectById(state, chatroom_id)?.messages
  );
  // const chatroomTasksIds = useSelector(
  //   (state) => chatroomsSelector.selectById(state, chatroom_id)?.tasks
  // );

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const tabnameToIndex = {
  //   Chat: 0,
  //   Timeline: 1,
  //   "Upload tasks": 2,
  //   Leaderboard: 3,
  // };
  useEffect(() => {
    if (chatroomDetails === undefined)
      dispatch(
        getChatroom({
          chatroom_id
        })
      );
  }, [chatroom_id, chatroomDetails]);

  useEffect(() => {
    if (
      userChatroomsIds.includes(chatroom_id) &&
      chatroomDetails &&
      value === 0 &&
      chatroomMessagesIds &&
      !chatroomMessagesIds.length
    )
      dispatch(
        getAllChatroomMessages({
          chatroom_id
        })
      );
  }, [chatroomDetails, chatroom_id, chatroomMessagesIds, value, dispatch]);

  useEffect(() => {
    if (chatroomDetails)
      dispatch(
        getAllChatroomTasks({
          chatroom_id
        })
      );
  }, []);

  // useEffect(() => {
  //   if (initialTab) setValue(tabnameToIndex[initialTab]);
  // }, [initialTab]);

  return (
    <>
      <NavBar />
      <div className={styleClasses.root}>
        {chatroomStatus === "get loading" ? (
          <div className="w-max mx-auto p-20">
            <CircularProgress color="inherit" />
          </div>
        ) : userChatroomsIds.includes(chatroom_id) ? (
          <>
            <div className={styleClasses.tabs}>
              <div className="flex gap-x-2 pl-4 mb-6">
                {chatroomDetails?.avatar ? (
                  <Avatar
                    src={chatroomDetails?.avatar}
                    className={styleClasses.avatar}
                  />
                ) : (
                  <HiOutlineUserCircle className={styleClasses.avatar} />
                )}
                <h1 className="text-xl font-bold text-purple">
                  {chatroomDetails?.name}
                </h1>
              </div>
              <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                aria-label="chatroom tab"
              >
                <Tab
                  label="Chat"
                  {...a11yProps(0)}
                  className={value === 0 && styleClasses.tabCurrent}
                />
                <Tab
                  label="Tasks"
                  {...a11yProps(1)}
                  className={value === 1 && styleClasses.tabCurrent}
                />
                <button
                  className="block px-3 bg-purple text-white p-2 hover:shadow-md px-8 rounded-3xl m-4 max-w-max mx-auto"
                  onClick={() =>
                    dispatch(
                      leaveChatroom({ chatroom_id, user_id: currentUser.id })
                    )
                  }
                >
                  Leave
                </button>
              </Tabs>
            </div>
            <TabPanel value={value} index={0} name="chatroom">
              <MessageContainer chatroom_id={chatroom_id} />
            </TabPanel>
            <TabPanel value={value} index={1} name="chatroom">
              <TaskContainer chatroom_id={chatroom_id} />
            </TabPanel>
          </>
        ) : (
          <div
            style={{
              position: "absolute",
              zIndex: 10,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            }}
            className="w-11/12 p-10 bg-black sm:w-7/12 md:w-1/2 lg:w-4/12 m-auto border-2 border-purple rounded-md flex flex-col gap-y-2"
          >
            <h1 className="text-xl font-bold text-purple">
              {chatroomDetails?.name}
            </h1>
            <p className="text-small">{chatroomDetails?.description}</p>
            <button
              className="block px-3 bg-gray-dark text-white p-2 hover:shadow-md px-8 rounded-3xl mt-auto max-w-max mx-auto"
              onClick={() =>
                dispatch(joinChatroom({ chatroom_id, user_id: currentUser.id }))
              }
            >
              Join
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Chatroom;
