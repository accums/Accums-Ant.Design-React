import {request} from "@@/plugin-request";

export async function getDetectionSampleListPage(params: any, options?: { [key: string]: any }) {
  return request<any>('/api/detection/sample/getDetectionSampleListPage',
    {
      method: 'POST',
      data: {
        pageSize: params.pageSize,
        pageCurrent: params.current,
        entrustContractId: params.entrustContractId
      },
      ...(options || {}),
    });
}


export async function addDetectionSample(params: any, options?: { [key: string]: any }) {
  return request<any>('/api/detection/sample/addDetectionSample',
    {
      method: 'POST',
      data: params,
      ...(options || {}),
    });
}
