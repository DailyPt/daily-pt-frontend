import axios from "axios";

const BACKEND_URL =
  "http://k8s-default-backendi-feb8c9a7e2-53368050.ap-northeast-2.elb.amazonaws.com/user/profile";

export async function saveUserInfo(token, userInfo) {
  try {
    const response = await axios.post(BACKEND_URL, JSON.stringify(userInfo), {
      headers: {
        "Content-Type": `application/json`,
        authorization: `Bearer ${token}`,
      },
    });
    console.log("Post request successful:", response.data);
  } catch (error) {
    console.log("Save UserInfo error : ", error);
  }
}

export async function modifyUserInfo(token, userInfo) {
  try {
    const response = await axios.put(BACKEND_URL, JSON.stringify(userInfo), {
      headers: {
        "Content-Type": `application/json`,
        authorization: `Bearer ${token}`,
      },
    });
    console.log("Put request successful:", response.data.message);
  } catch (error) {
    console.log("Modify UserInfo error : ", error);
  }
}

export async function getUserInfo(token) {
  try {
    const response = await axios.get(BACKEND_URL, {
      headers: { authorization: `Bearer ${token}` },
    });

    console.log("Get UserInfo successful:", response.data.message);

    const userInfo = response.data.data;

    console.log(userInfo);

    return userInfo;
  } catch (error) {
    console.log("Get UserInfo error: ", error);
  }
}

export async function getUserName(token) {
  try {
    const response = await axios.get(BACKEND_URL, {
      headers: { authorization: `Bearer ${token}` },
    });

    console.log("Get UserName successful:", response.data.message);
    console.log(token);

    const userName = response.data.data.name;

    return userName;
  } catch (error) {
    console.log("Get Username error : ", error);
  }
}
