import axios from 'axios';

const BACKEND_URL =
  'http://k8s-default-backendi-feb8c9a7e2-53368050.ap-northeast-2.elb.amazonaws.com/user/login';

export async function checkIsLogged(token) {
  try {
    const response = await axios.post(
      BACKEND_URL,
      {},
      {
        headers: { authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );

    const isProfileLogged = response.data.data.isProfileLogged;
    console.log('CheckIsLogged success!');

    return isProfileLogged;
  } catch (error) {
    console.log('CheckIsLogged error : ', error);
  }
}
