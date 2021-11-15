const axios = require("axios");

export async function createbucket(data) {
  const res = await axios.post(
    process.env.GATSBY_MEDIA_BACKEND_LINK + "createBucket",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  //Object { success: false, data: "Message from Backend" }
  return res["data"];
}

export async function deletebucket(data) {
  const res = await axios.post(
    process.env.GATSBY_MEDIA_BACKEND_LINK + "deleteBucket",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  //Object { success: false, data: "Message from Backend" }
  return res["data"];
}

export async function upLoadFile(data) {
  console.log(data);
  const res = await axios.post(
    process.env.GATSBY_MEDIA_BACKEND_LINK + "upLoadFile",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  //Object { success: false, data: "Message from Backend" }
  return res["data"];
}

export async function deleteFile(data, access_token) {
  const res = await axios.post(
    process.env.GATSBY_MEDIA_BACKEND_LINK + "deleteFile",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      },
    }
  );
  //Object { success: false, data: "Message from Backend" }
  return res["data"];
}
