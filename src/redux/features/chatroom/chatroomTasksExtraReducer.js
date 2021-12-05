// import {
//   deleteChatroomMessage,
//   getAllChatroomMessages,
//   setTask
// } from "./chatroomMessagesThunk";

import { chatroomsAdaptor } from "./chatroomSlice";
import {
  deleteTask,
  dropTask,
  getAllChatroomTasks,
  moveTask,
  setTask
} from "./chatroomTasksThunk";

export const chatroomTasksExtraReducer = (chatroomTasksAdaptor) => ({
  [getAllChatroomTasks.pending]: (state) => {
    state.tasks.status = "get loading";
  },

  [getAllChatroomTasks.rejected]: (state, { error }) => {
    state.tasks.status = "failed";
    state.tasks.error = error;
  },

  [getAllChatroomTasks.fulfilled]: (state, { payload, meta: { arg } }) => {
    if (payload.success) {
      if (payload.data.length) {
        chatroomTasksAdaptor.addMany(state.tasks, payload.data);
      }
      state.tasks.status = "get complete";
    }
  },

  [setTask.fulfilled]: (state, { payload, meta: { arg } }) => {
    if (payload.success) {
      chatroomTasksAdaptor.addOne(state.tasks, payload.data);
      chatroomsAdaptor.updateOne(state, {
        id: arg.taskDetails.chatroom_id,
        changes: {
          tasks: [
            ...state.entities[arg.taskDetails.chatroom_id].tasks,
            payload.data._id
          ]
        }
      });
      state.tasks.status = "set complete";
    } else {
      state.tasks.success = "failed";
      state.tasks.error = payload.data;
    }
  },
  [moveTask.pending]: (state) => {
    state.tasks.status = "move pending";
  },
  [moveTask.rejected]: (state, { error }) => {
    state.tasks.status = "failed";
    state.tasks.error = error;
  },

  [moveTask.fulfilled]: (state, { payload, meta: { arg } }) => {
    if (payload.success) {
      chatroomsAdaptor.updateOne(state, {
        id: arg.chatroom_id,
        changes: {
          tasks: payload.data
        }
      });
      state.tasks.status = "move complete";
    } else {
      state.tasks.success = "failed";
      state.tasks.error = payload.data;
    }
  },

  [dropTask.fulfilled]: (state, { payload, meta: { arg } }) => {
    if (payload.success) {
      chatroomTasksAdaptor.updateOne(state.tasks, {
        id: payload.data.data._id,
        changes: payload.data.data
      });
      chatroomsAdaptor.updateOne(state, {
        id: arg.chatroom_id,
        changes: {
          tasks: payload.data.task_arr
        }
      });
      state.tasks.status = "drop complete";
    } else {
      state.tasks.success = "failed";
      state.tasks.error = payload.data;
    }
  },
  [dropTask.rejected]: (state, { error }) => {
    state.tasks.status = "failed";
    state.tasks.error = error;
  },

  [setTask.rejected]: (state, { error }) => {
    state.tasks.status = "failed";
    state.tasks.error = error;
  },

  [deleteTask.fulfilled]: (
    state,
    {
      meta: {
        arg: { _id, chatroom_id }
      },
      payload
    }
  ) => {
    if (payload.success) {
      chatroomTasksAdaptor.removeOne(state.tasks, _id);
      chatroomsAdaptor.updateOne(state, {
        id: chatroom_id,
        changes: {
          tasks: state.entities[chatroom_id].tasks.filter((tid) => tid !== _id)
        }
      });
      state.tasks.status = "delete success";
    } else {
      state.tasks.success = "failed";
      state.tasks.error = payload.data;
    }
  },
  [deleteTask.rejected]: (state, { error }) => {
    state.tasks.status = "failed";
    state.tasks.error = error;
  }
});
