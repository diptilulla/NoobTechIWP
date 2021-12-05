const axios = require("axios");

export async function settask(data) {
  const res = await axios.post(
    process.env.GATSBY_BACKEND_LINK + "chatroom/task/settask",
    data,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  return res["data"];
}

export async function movetask(data) {
  const res = await axios.put(
    process.env.GATSBY_BACKEND_LINK + "chatroom/task/movetask",
    data,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  return res["data"];
}

export async function droptask(data) {
  const res = await axios.put(
    process.env.GATSBY_BACKEND_LINK + "chatroom/task/droptask",
    data,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  return res["data"];
}

export async function deletetask(data) {
  const res = await axios.post(
    process.env.GATSBY_BACKEND_LINK + "chatroom/task/deletetask",
    data,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  return res["data"];
}

export async function getallchatroomtasks(data) {
  const res = await axios.post(
    process.env.GATSBY_BACKEND_LINK + "chatroom/task/getallchatroomtasks",
    data,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  return res["data"];
}
