import axios from 'axios';

const BACKEND_URL = 'http://192.168.45.248:8888/nutrient/';

export async function saveNutrientRecord(token, nutrientRecord) {
  const response = await axios.get(
    BACKEND_URL,
    JSON.stringify(nutrientRecord),
    {
      headers: { authorization: `Bearer ${token}` },
      withCredentials: true,
    }
  );

  console.log('Post request successful:', response.data.message);
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

  console.log('Get request successful:', response.data.message);

  const nutrientRecord = JSON.parse(response.data.data);

  return nutrientRecord;
}
