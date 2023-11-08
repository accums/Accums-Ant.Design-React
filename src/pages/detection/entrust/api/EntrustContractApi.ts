import {request} from "@@/plugin-request";

export async function getDetectionEntrustContractListPage(params: any, options?: { [key: string]: any }) {
  return request<any>('/api/detection/entrust/contract/getDetectionEntrustContractListPage',
    {
      method: 'POST',
      data: {
        pageSize: params.pageSize,
        pageCurrent: params.current,
        entrustCode: params.entrustCode,
        detectionUnit: params.detectionUnit,
        detectionType: params.detectionType,
        entrustClient: params.entrustClient,
        entrustClientPhone: params.entrustClientPhone,
        entrustUnit: params.entrustUnit,
      },
      ...(options || {}),
    });
}


export async function addDetectionEntrustContract(params: any, options?: { [key: string]: any }) {
  return request<any>('/api/detection/entrust/contract/addDetectionEntrustContract',
    {
      method: 'POST',
      data: params,
      ...(options || {}),
    });
}
