import axios from 'axios';

const BACKEND_URL = 'http://192.168.45.248:8888/diet/token/diet';

// id 추가
const id = {
  DEFAULT: '',
  ID: '',
};

export async function saveDietRecord(token, dietRecord) {
  const response = await axios.get(
    BACKEND_URL + id.DEFAULT,
    JSON.stringify(dietRecord),
    {
      headers: { authorization: `Bearer ${token}` },
      withCredentials: true,
    }
  );

  console.log('Post request successful:', response.data.message);
}

export async function getDietRecord(token) {
  const response = await axios.get(
    BACKEND_URL,
    {},
    {
      headers: { authorization: `Bearer ${token}` },
      withCredentials: true,
    }
  );

  console.log('Get request successful:', response.data.message);

  const dietRecord = JSON.parse(response.data.data);

  return dietRecord;
}
