import axios from "axios";

const BACKEND_URL =
  "http://k8s-default-backendi-feb8c9a7e2-53368050.ap-northeast-2.elb.amazonaws.com/search/food";

export async function getFoodList(input) {
  try {
    const response = await axios.get(BACKEND_URL, {
      params: { input: input },
    });

    const foodList = response.data.data;

    return foodList;
  } catch (error) {
    console.log("Get Food List Error : ", error);
  }
}
