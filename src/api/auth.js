import axios from "axios";

const FB_API_KEY = "AIzaSyBwrN_vifw37waZ8PH5knP92IVLzD7PDms"; // 환경변수로 숨기기

async function refreshAuthToken(refreshToken) {
  const url = `https://securetoken.googleapis.com/v1/token?key=${FB_API_KEY}`;

  const response = await axios.post(
    url,
    {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    },
    {
      headers: {
        "Content-Type": `application/x-www-form-urlencoded`,
      },
    }
  );

  const token = response.data.id_token;

  return token;
}

export async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${FB_API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  let token = response.data.idToken;
  const refreshToken = response.data.refreshToken;
  const expiresIn = response.data.expiresIn;

  const currentTime = Math.floor(Date.now() / 1000);
  if (expiresIn && expiresIn < currentTime) {
    token = await refreshAuthToken(refreshToken);
  }

  return token;
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function signIn(email, password) {
  return authenticate("signInWithPassword", email, password);
}
