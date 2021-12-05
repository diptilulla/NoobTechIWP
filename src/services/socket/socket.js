import { useDispatch, useSelector } from "react-redux";
import {
  socketDeleteChatroomMessage,
  socketSetChatroomMessage,
} from "../../redux/features/chatroom/chatroomSlice";
import { selectUser } from "../../redux/features/user/usersSlice";

//Individual Message
export function connectSocketA() {
  return new WebSocket(process.env.GATSBY_SOCKET_LINK_2);
}
export function openSocketA(client_2) {
  return () => console.log(client_2?.readyState);
}

export async function sendSocketA(body, client_2) {
  client_2?.send(JSON.stringify(body));
}
// //Group Message
export function connectSocketG() {
  return new WebSocket(process.env.GATSBY_SOCKET_LINK);
}
export function openSocketG(client_1) {
  return () => console.log(client_1?.readyState);
}
export function closeSocketG(client_1) {
  return () => console.log(client_1?.readyState);
}
export async function sendSocketG(body, client_1) {
  client_1?.send(JSON.stringify(body));
}
export function useReceiveSocket() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  return async (e) => {
    console.log("msg received check");
    console.log(e);
    const data = JSON.parse(e["data"]);
    // var str = "";
    // data.forEach((ele) => (str += String.fromCharCode(ele)));
    // data = JSON.parse(str);
    if (data.user_id !== currentUser.id) {
      switch (data.op) {
        case "create":
          dispatch(socketSetChatroomMessage(data));
          break;
        // case "edit":
        //   if (type === "thread") dispatch(socketEditGroupThread(data));
        //   else dispatch(socketEditGroupMessage(data));
        //   break;
        case "delete":
          dispatch(socketDeleteChatroomMessage(data));
          break;
        default:
      }
    }
  };
}
