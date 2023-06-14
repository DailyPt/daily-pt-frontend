import axios from "axios";

const BACKEND_URL =
  "http://k8s-default-backendi-feb8c9a7e2-53368050.ap-northeast-2.elb.amazonaws.com/nutrient";

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

    return response.data.status;
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

export async function getNutrientById(token, id) {
  try {
    const response = await axios.get(`${BACKEND_URL}/${id}`, {
      params: { id: id },
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

export async function getNutrientByDay(token, day) {
  try {
    const response = await axios.get(`${BACKEND_URL}/day/${day}`, {
      params: { day: day },
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

export async function updateDietById(token, newRoutine, id) {
  try {
    const response = await axios.put(`${BACKEND_URL}/${id}`, newRoutine, {
      headers: {
        "Content-Type": `application/json`,
        authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    console.log("Put request successful:", response.data.message);
  } catch (error) {
    console.log("Get Diet Record Error: ", error);
  }
}

export async function deleteNutrientRoutine(token, id) {
  try {
    const response = await axios.delete(`${BACKEND_URL}/${id}`, {
      params: { id: id },
      headers: { authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    console.log("Delete nutrient routine successful:", response.data.message);
  } catch (error) {
    console.log("Get nutrient routine Error: ", error);
  }
}

export async function deleteNutrientAlarm(token, id) {
  try {
    const response = await axios.delete(`${BACKEND_URL}/alarm/${id}`, {
      params: { id: id },
      headers: { authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    console.log("Delete nutrient routine successful:", response.data.message);
  } catch (error) {
    console.log("Get nutrient routine Error: ", error);
  }
}

export async function saveNutrientRecord(token, nutrientId) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/record/${nutrientId}`,
      {},
      {
        headers: {
          "Content-Type": `application/json`,
          authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    console.log("Post request successful:", response.data.message);

    return response.status;
  } catch (error) {
    console.log("Save Nutrient Routine Error: ", error);
  }
}

export async function updateAlarm(token, newAlarm, id) {
  try {
    const response = await axios.put(`${BACKEND_URL}/alarm/${id}`, newAlarm, {
      headers: {
        "Content-Type": `application/json`,
        authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    console.log("Post request successful:", response.data.message);

    return response.data.status;
  } catch (error) {
    console.log("Save Nutrient Routine Error: ", error);
  }
}

export async function getNutrientRecord(token) {
  try {
    const response = await axios.get(`${BACKEND_URL}/record/date`, {
      headers: { authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    // console.log("Get request successful:", response.data.message);

    const nutrientRecord = response.data.data;

    return nutrientRecord;
  } catch (error) {
    console.log("Get Nutrient Record Error: ", error);
  }
}

export async function getAllAlarm(token, nutrientId) {
  try {
    const response = await axios.get(`${BACKEND_URL}/alarm/all/${nutrientId}`, {
      headers: { authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    // console.log("Get alarm successful:", response.data.message);

    const nutrientAlarm = response.data.data;

    return nutrientAlarm;
  } catch (error) {
    console.log("Get Alarm Error: ", error);
  }
}

export async function getAlarmById(token, id) {
  try {
    const response = await axios.get(`${BACKEND_URL}/alarm/${id}`, {
      headers: { authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    console.log("Get alarm successful:", response.data.message);

    const nutrientAlarm = response.data.data;

    return nutrientAlarm;
  } catch (error) {
    console.log("Get Alarm Error: ", error);
  }
}

export async function getTrashCan(token) {
  try {
    const response = await axios.get(`${BACKEND_URL}/trash`, {
      headers: { authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    console.log("Get trashcan successful:", response.data.message);

    const trashCan = response.data.data;

    return trashCan;
  } catch (error) {
    console.log("Get Trashcan Error: ", error);
  }
}

export async function restoreNutrient(token, id) {
  try {
    const response = await axios.get(`${BACKEND_URL}/restore/${id}`, {
      headers: { authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    console.log("Restore nutrient successful:", response.data.message);

    return response.data.status;
  } catch (error) {
    console.log("Restore nutrient Error: ", error);
  }
}
