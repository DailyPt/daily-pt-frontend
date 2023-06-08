import axios from "axios";

const BACKEND_URL =
  "http://k8s-default-backendi-feb8c9a7e2-53368050.ap-northeast-2.elb.amazonaws.com/search/test"; // image/analyze

export async function requestAnalyze(formData) {
  try {
    const response = await axios.post(BACKEND_URL, formData, {
      headers: {
        "Content-Type": `multipart/form-data`, //multi...
        // authorization: `Bearer ${token}`,
      },
    });
    console.log("Image Analysis completed", response.data); // analyze result

    const food = response.data;

    return food;
  } catch (error) {
    console.log("Request Analyze error : ", error);
  }
}
