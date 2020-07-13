import {request} from 'umi';

// 获取当前用户菜单
export async function getMenus(params: any) {
  return request(`/api/system/getMenus`, {
    method: 'POST',
    data: params,
  });
}
