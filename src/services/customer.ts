import request from '@/utils/request';

interface CustomerInfo {
  id?: string;
  companyAddress: string;
  companyDesc: string;
  companyMobile: string;
  companyName: string;
  corporation: string;
  establishedTime: string;
  scale: string;
}

export async function addCompany(params: CustomerInfo): Promise<any> {
  return request('/api/company/add', {
    method: 'POST',
    data: params,
  });
}

export async function getCompanyList(params: {
  companyName: string;
  companyNo: string;
  pageNum: number;
  pageSize: number;
}): Promise<any> {
  return request('/api/company/list', {
    method: 'POST',
    data: params,
  });
}

export async function updateCompany(params: CustomerInfo): Promise<any> {
  return request('/api/company/update', {
    method: 'POST',
    data: params,
  });
}

