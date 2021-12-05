import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./features/user/usersSlice";
import popupReducer from "./features/popup/popupSlice";
import profileReducer from "./features/profile/profileSlice";
import chatroomsReducer from "./features/chatroom/chatroomSlice";
import socketReducer from "./features/socket/socketSlice";

const rootReducer = combineReducers({
  user: userReducer,
  socket: socketReducer,
  popup: popupReducer,
  profile: profileReducer,
  chatrooms: chatroomsReducer
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "profile"]
};

export default persistReducer(persistConfig, rootReducer);
