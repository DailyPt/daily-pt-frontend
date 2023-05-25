import axios from "axios";

const BACKEND_URL =
  "http://k8s-default-backendi-feb8c9a7e2-53368050.ap-northeast-2.elb.amazonaws.com/nutrient/";

export async function saveNutrientRoutine(token, nutrientRoutine) {
  try {
    const response = await axios.post(BACKEND_URL, nutrientRoutine, {
      headers: {
        "Content-Type": `application/json`,
        authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    console.log("Post request successful:", response.data.message);

    return response.data.data;
  } catch (error) {
    console.log("Save Nutrient Routine Error: ", error);
  }
}

export async function getNutrientRoutine(token) {
  try {
    const response = await axios.get(BACKEND_URL, {
      headers: { authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    console.log("Get request successful:", response.data.message);

    const nutrientRoutine = response.data.data;

    return nutrientRoutine;
  } catch (error) {
    console.log("Get Nutrient Routine Error: ", error);
  }
}
