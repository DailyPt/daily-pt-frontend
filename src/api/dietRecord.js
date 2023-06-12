import axios from "axios";

const BACKEND_URL =
  "http://k8s-default-backendi-feb8c9a7e2-53368050.ap-northeast-2.elb.amazonaws.com/diet";

export async function saveDietRecord(token, dietRecord) {
  try {
    const response = await axios.post(BACKEND_URL, dietRecord, {
      headers: {
        "Content-Type": `multipart/form-data`,
        authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    console.log("Post request successful:", response.data);

    return response.data.status;
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

    console.log("Get request successful:", response.data);

    const dietRecord = response.data.data;

    return dietRecord;
  } catch (error) {
    console.log("Get Diet Record Error: ", error);
  }
}

export async function deleteDietRecord(token, id) {
  try {
    const response = await axios.delete(`${BACKEND_URL}/${id}`, {
      params: { id: id },
      headers: { authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    console.log("Delete diet successful:", response.data.message);
  } catch (error) {
    console.log("Get Diet Record Error: ", error);
  }
}
