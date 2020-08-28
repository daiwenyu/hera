import request from '@/utils/request';

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function login(params: {
  account: string,
  key: string | number,
  userPwd: string,
  verifyCode: string
}) {
  return request(`/api/login`, {
    method: 'POST',
    data: params
  });
}

export async function logout() {
  return request(`/api/login/out`);
}
