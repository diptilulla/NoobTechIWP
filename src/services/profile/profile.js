const axios = require("axios");

export async function setprofile(data) {
  const res = await axios.post(
    process.env.GATSBY_BACKEND_LINK + "profile/setprofile",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res["data"];
}

export async function deleteprofile(data) {
  const res = await axios.post(
    process.env.GATSBY_BACKEND_LINK + "profile/deleteprofile",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res["data"];
}

export async function getprofile(data) {
  const res = await axios.post(
    process.env.GATSBY_BACKEND_LINK + "profile/getprofile",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res["data"];
}
