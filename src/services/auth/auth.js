const axios = require("axios");

export async function logIn(userDetails) {
  const res = await axios.post(
    process.env.GATSBY_BACKEND_LINK + "auth/login",
    userDetails,
    {
      "Content- Type": "application / json",
    }
  );
  return res["data"];
}

export async function register(userDetails) {
  const res = await axios.post(
    process.env.GATSBY_BACKEND_LINK + "auth/register",
    userDetails,
    {
      "Content- Type": "application / json",
    }
  );
  return res["data"];
}

export async function logOut() {
  const res = await axios.post(
    process.env.GATSBY_BACKEND_LINK + "auth/logout",
    {
      "Content- Type": "application / json",
    }
  );
  return res["data"];
}
