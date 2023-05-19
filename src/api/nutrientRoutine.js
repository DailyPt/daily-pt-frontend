import axios from 'axios';

const BACKEND_URL = 'http://192.168.45.248:8888/nutrient/';

export async function saveNutrientRoutine(token, nutrientRoutine) {
  const response = await axios.get(
    BACKEND_URL,
    JSON.stringify(nutrientRoutine),
    {
      headers: { authorization: `Bearer ${token}` },
      withCredentials: true,
    }
  );

  console.log('Post request successful:', response.data.message);
}

export async function getNutrientRoutine(token) {
  const response = await axios.get(
    BACKEND_URL,
    {},
    {
      headers: { authorization: `Bearer ${token}` },
      withCredentials: true,
    }
  );

  console.log('Get request successful:', response.data.message);

  const nutrientRoutine = JSON.parse(response.data.data);

  return nutrientRoutine;
}
