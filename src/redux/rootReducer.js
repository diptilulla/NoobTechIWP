import { combineReducers } from "redux";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import userReducer from "./features/user/usersSlice";
import tokenReducer from "./features/token/tokenSlice";
import popupReducer from "./features/popup/popupSlice";
import profileReducer from "./features/profile/profileSlice";
import chatroomsReducer from "./features/chatroom/chatroomSlice";
// import peerReducer from "./features/peer/peerSlice";

//import reducers
const rootReducer = combineReducers({
  user: userReducer,
  token: tokenReducer,
  popup: popupReducer,
  profile: profileReducer,
  chatrooms: chatroomsReducer,
});

export default rootReducer;
