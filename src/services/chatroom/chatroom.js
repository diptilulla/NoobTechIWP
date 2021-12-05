const axios = require("axios");

export async function getchatroom(data) {
  const res = await axios.post(
    process.env.GATSBY_BACKEND_LINK + "chatroom/getchatroom",
    data,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  return res["data"];
}

export async function setchatroom(data) {
  const res = await axios.post(
    process.env.GATSBY_BACKEND_LINK + "chatroom/setchatroom",
    data,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  return res["data"];
}

export async function deletechatroom(data) {
  const res = await axios.post(
    process.env.GATSBY_BACKEND_LINK + "chatroom/deletechatroom",
    data,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  return res["data"];
}

export async function getalluserchatrooms(data) {
  const res = await axios.post(
    process.env.GATSBY_BACKEND_LINK + "chatroom/getalluserchatrooms",
    data,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  return res["data"];
}

export async function getallinterestchatrooms(data) {
  const res = await axios.post(
    process.env.GATSBY_BACKEND_LINK + "chatroom/getallinterestchatrooms",
    data,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  return res["data"];
}

export async function getallchatrooms() {
  const res = await axios.get(
    process.env.GATSBY_BACKEND_LINK + "chatroom/getallchatrooms",
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  return res["data"];
}

export async function joinchatroom(data) {
  const res = await axios.post(
    process.env.GATSBY_BACKEND_LINK + "chatroom/joinchatroom",
    data,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  return res["data"];
}

export async function leavechatroom(data) {
  const res = await axios.post(
    process.env.GATSBY_BACKEND_LINK + "chatroom/leavechatroom",
    data,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  return res["data"];
}
