import axios from "axios";

const BACKEND_URL =
  "http://k8s-default-backendi-feb8c9a7e2-53368050.ap-northeast-2.elb.amazonaws.com/nutrient";

export async function saveNutrientRecord(token, nutrientRecord) {
  const response = await axios.get(
    BACKEND_URL,
    JSON.stringify(nutrientRecord),
    {
      headers: { authorization: `Bearer ${token}` },
      withCredentials: true,
    }
  );

  console.log("Post request successful:", response.data.message);
}

export async function getNutrientRecord(token) {
  const response = await axios.get(
    BACKEND_URL,
    {},
    {
      headers: { authorization: `Bearer ${token}` },
      withCredentials: true,
    }
  );

  console.log("Get request successful:", response.data.message);

  const nutrientRecord = JSON.parse(response.data.data);

  return nutrientRecord;
}
