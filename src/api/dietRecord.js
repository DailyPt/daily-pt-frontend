import axios from "axios";

const BACKEND_URL =
  "http://k8s-default-backendi-feb8c9a7e2-53368050.ap-northeast-2.elb.amazonaws.com/diet";

// id 추가
const id = {
  DEFAULT: "",
  ID: "",
};

export async function saveDietRecord(token, dietRecord) {
  try {
    const response = await axios.post(BACKEND_URL + id.DEFAULT, dietRecord, {
      headers: {
        "Content-Type": `application/json`,
        authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    console.log("Post request successful:", response.data.message);

    return response.data.data;
  } catch (error) {
    console.log("Save Diet Record Error: ", error);
  }
}

export async function getDietRecord(token, start, end) {
  try {
    const response = await axios.get(BACKEND_URL, {
      params: { start: start, end: end },
      headers: { authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    console.log("Get request successful:", response.data.message);

    const dietRecord = response.data.data;

    return dietRecord;
  } catch (error) {
    console.log("Get Diet Record Error: ", error);
  }
}
