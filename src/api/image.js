import axios from "axios";

const BACKEND_URL =
  "http://k8s-default-backendi-feb8c9a7e2-53368050.ap-northeast-2.elb.amazonaws.com/"; // image/analyze

export async function requestAnalyze(fileName) {
  try {
    const response = await axios.post(BACKEND_URL, fileName, {
      headers: {
        "Content-Type": `multipart/form-data`, //multi...
        authorization: `Bearer ${token}`,
      },
    });
    console.log("Image Analysis completed", response.data); // analyze result

    const food = response.data.name;

    return food;
  } catch (error) {
    console.log("Request Analyze error : ", error);
  }
}
