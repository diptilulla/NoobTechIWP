import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  chatroomsSelector,
  selectChatroomTasksStatus
} from "../redux/features/chatroom/chatroomSlice";
import {
  dropTask,
  moveTask
} from "../redux/features/chatroom/chatroomTasksThunk";
import { selectUser } from "../redux/features/user/usersSlice";
import { CircularProgress } from "@material-ui/core";
import Col from "./col";
import CreateTask from "./createTask";
import DropWrapper from "./dropWrapper";
import Item from "./item";

function TaskContainer({ chatroom_id }) {
  const statuses = [
    {
      status: "open",
      icon: "⭕️",
      color: "#EB5A46"
    },
    {
      status: "in progress",
      icon: "⏳",
      color: "#00C2E0"
    },
    {
      status: "done",
      icon: "✅",
      color: "#3981DE"
    }
  ];
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);

  const chatroomTasksIds = useSelector((state) =>
    chatroomsSelector.selectById(state, chatroom_id)
  )?.tasks;
  const allChatroomTasks = useSelector(
    (state) => state.chatrooms.tasks.entities
  );
  const chatroomTasksStatus = useSelector(selectChatroomTasksStatus);

  const [chatroomTasks, setChatroomTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (chatroomTasksIds) {
      const chatroomtasks = chatroomTasksIds.map((id) => allChatroomTasks[id]);
      setChatroomTasks(chatroomTasksIds.length ? chatroomtasks : []);
    }
  }, [chatroomTasksIds, allChatroomTasks]);

  const onDrop = (item, monitor, status) => {
    const mapping = statuses.find((si) => si.status === status);
    const task_arr = chatroomTasksIds
      .filter((i) => i !== item._id)
      .concat(item._id);
    if (item.status !== status)
      dispatch(dropTask({ ...item, status, icon: mapping.icon, task_arr }));
    // setChatroomTasks((prevState) => {
    //   const newItems = prevState
    //     .filter((i) => i._id !== item.id)
    //     .concat({ ...item, status, icon: mapping.icon });
    //   return [...newItems];
    // });
  };
  const moveItem = (dragIndex, hoverIndex) => {
    const item = chatroomTasksIds[dragIndex];
    console.log({ item });
    const newItems = chatroomTasksIds.filter((i, idx) => idx !== dragIndex);
    console.log({ newItems });
    newItems.splice(hoverIndex, 0, item);
    dispatch(
      moveTask({
        chatroom_id,
        task_arr: newItems
      })
    );
  };

  const openForm = () => {
    setShowForm(true);
  };

  return (
    <div>
      <button
        className="px-3 bg-gray-dark text-white p-2 hover:shadow-md px-8 rounded-3xl m-8"
        onClick={openForm}
      >
        Create Task
      </button>
      <div className={`row ${showForm ? "opacity-50" : ""}`}>
        {chatroomTasksStatus === "get loading" ? (
          <div className="w-max mx-auto p-20">
            <CircularProgress color="inherit" />
          </div>
        ) : (
          statuses.map((s) => {
            return (
              <div key={s.status} className="col-wrapper">
                <h2 className="col-header">{s.status.toUpperCase()}</h2>
                <DropWrapper onDrop={onDrop} status={s.status}>
                  <Col>
                    {chatroomTasks && chatroomTasks.length ? (
                      chatroomTasks
                        .filter((t) => t?.status === s.status)
                        .map((t, idx) => (
                          <Item
                            key={t._id}
                            item={t}
                            index={idx}
                            moveItem={moveItem}
                            status={s}
                          />
                        ))
                    ) : (
                      <span>No tasks, create now</span>
                    )}
                  </Col>
                </DropWrapper>
              </div>
            );
          })
        )}
      </div>
      {showForm ? (
        <CreateTask setShowForm={setShowForm} chatroom_id={chatroom_id} />
      ) : null}
    </div>
  );
}

export default TaskContainer;
