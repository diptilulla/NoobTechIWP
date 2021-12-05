const axios = require("axios");

export async function setchatroommessage(data) {
  const res = await axios.post(
    process.env.GATSBY_BACKEND_LINK + "chatroom/message/setchatroommessage",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res["data"];
}

export async function deletechatroommessage(data) {
  const res = await axios.post(
    process.env.GATSBY_BACKEND_LINK + "chatroom/message/deletechatroommessage",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res["data"];
}

export async function getallchatroommessages(data) {
  const res = await axios.post(
    process.env.GATSBY_BACKEND_LINK + "chatroom/message/getallchatroommessages",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res["data"];
}
