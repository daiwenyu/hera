import request from '@/utils/request';

// export async function getMenus(): Promise<any> {
//   return request('/api/system/getMenus');
// }

interface UserInfo {
  id?: string;
  account: string;
  depId: string;
  mobile: string;
  password: string;
  userName: string;
}

export async function addUser(params: UserInfo): Promise<any> {
  return request('/api/userManager/addUser', {
    method: 'POST',
    data: params,
  });
}

export async function editUser(params: UserInfo): Promise<any> {
  return request('/api/userManager/editUser', {
    method: 'POST',
    data: params,
  });
}

export async function queryUserList(params: any): Promise<any> {
  return request('/api/userManager/queryUserList', {
    method: 'POST',
    data: params,
  });
}
