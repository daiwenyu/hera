import request from '@/utils/request';

interface AreaUserInfo {
  areaId: number;
  dareaName: string;
  tentandId: number;
  userId: number;
  wechatCode: string;
}

export async function queryAreaList(params: { dareaName: string; }): Promise<any> {
  return request('/api/area/list', {
    method: 'POST',
    data: params,
  });
}

export async function addAreaUser(params: AreaUserInfo): Promise<any> {
  return request('/api/area/add/user', {
    method: 'POST',
    data: params,
  });
}

export async function delAreaUser(params: AreaUserInfo): Promise<any> {
  return request('/api/area/del/user', {
    method: 'POST',
    data: params,
  });
}

export async function saveWechatCode(params: AreaUserInfo): Promise<any> {
  return request('/api/area/save/wechatCode', {
    method: 'POST',
    data: params,
  });
}

export async function queryAreaUser(params: AreaUserInfo): Promise<any> {
  return request('api/area/user', {
    method: 'POST',
    data: params,
  });
}

export async function queryUncheckedAreaUser(params: AreaUserInfo): Promise<any> {
  return request('api/area/user/unchecked', {
    method: 'POST',
    data: params,
  });
}
