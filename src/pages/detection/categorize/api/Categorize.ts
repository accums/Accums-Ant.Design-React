import {request} from "@@/plugin-request";


export async function addDetectionCategorize(params: any, options?: { [key: string]: any }) {
  return request<any>('/api/detection/categorize/addDetectionCategorize',
    {
      method: 'POST',
      data: params,
      ...(options || {}),
    });
}

export async function getDetectionCategorizeList(params: any, options?: { [key: string]: any }) {
  return request<any>('/api/detection/categorize/getDetectionCategorizeList',
    {
      method: 'POST',
      data: params,
      ...(options || {}),
    });
}

export async function getDetectionCategorizeById(params: any, options?: { [key: string]: any }) {
  return request<any>('/api/detection/categorize/getDetectionCategorizeById',
    {
      method: 'POST',
      data: params,
      ...(options || {}),
    });
}

export async function updateDetectionCategorizeById(params: any, options?: { [key: string]: any }) {
  return request<any>('/api/detection/categorize/updateDetectionCategorizeById',
    {
      method: 'POST',
      data: params,
      ...(options || {}),
    });
}

export async function getDetectionCategorizeListPage(params: any, options?: { [key: string]: any }) {
  return request<any>('/api/detection/categorize/getDetectionCategorizeListPage',
    {
      method: 'POST',
      data: {
        pageSize: params.pageSize,
        pageCurrent: params.current,
        categorizeName: params.categorizeName,
        categorizeCode: params.categorizeCode,
      },
      ...(options || {}),
    });
}
