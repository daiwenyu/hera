import { request } from 'yyui';

export async function getMenus(): Promise<any> {
  return request('/api/system/getMenus');
}

export async function addMenu(params): Promise<any> {
  return request('/api/system/addMenu', {
    method: 'POST',
    data: params,
  });
}

export async function updateMenu(params): Promise<any> {
  return request('/api/system/updateMenu', {
    method: 'POST',
    data: params,
  });
}

export async function updateMenuSort(params): Promise<any> {
  return request('/api/system/updateMenuSort', {
    method: 'POST',
    data: params,
  });
}

export async function deleteMenus(params): Promise<any> {
  return request('/api/system/deleteMenus', {
    method: 'POST',
    data: params,
  });
}
