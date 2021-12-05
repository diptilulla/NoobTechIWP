const axios = require("axios");

export async function subscribetonotifications(data) {
  const res = await axios.post(
    process.env.GATSBY_PUSH_BACKEND_LINK + "subscribe",
    data,
    {
      "Content-Type": "application/json"
    }
  );

  //Object { success: false, data: "Message from Backend" }
  return res["data"];
}

export async function removeSubscription(data) {
  const res = await axios.post(
    process.env.GATSBY_PUSH_BACKEND_LINK + "delete-subscription",
    data,
    {
      "Content-Type": "application/json"
    }
  );
  return res["data"];
}
export async function editSubscription(data) {
  const res = await axios.post(
    process.env.GATSBY_PUSH_BACKEND_LINK + "update-subscription",
    data,
    {
      "Content-Type": "application/json"
    }
  );

  //Object { success: false, data: "Message from Backend" }
  return res["data"];
}

export async function sendnotifchatroom(data) {
  const res = await axios.post(
    process.env.GATSBY_PUSH_BACKEND_LINK + "send-notif-chatroom",
    data,
    {
      "Content-Type": "application/json"
    }
  );
  return res["data"];
}

export async function sendnotifinterest(data) {
  const res = await axios.post(
    process.env.GATSBY_PUSH_BACKEND_LINK + "send-notif-interest",
    data,
    {
      "Content-Type": "application/json"
    }
  );
  return res["data"];
}
