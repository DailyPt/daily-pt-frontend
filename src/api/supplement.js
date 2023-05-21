import axios from "axios";

const BACKEND_URL =
  "http://k8s-default-backendi-feb8c9a7e2-53368050.ap-northeast-2.elb.amazonaws.com/search/supplement";

export async function getSupplementList(input) {
  try {
    const response = await axios.get(BACKEND_URL, {
      params: { input: input },
    });

    const suppList = response.data.data;

    return suppList;
  } catch (error) {
    console.log("Get Food List Error : ", error);
  }
}
