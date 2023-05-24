import axios from "axios";

const BACKEND_URL =
  "http://k8s-default-backendi-feb8c9a7e2-53368050.ap-northeast-2.elb.amazonaws.com/diet";

// id 추가
const id = {
  DEFAULT: "",
  ID: "",
};

// 검색 시작, 종료 날짜 설정 가능 (종료 날짜는 설정 안 하면 비워두는 걸로)

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
