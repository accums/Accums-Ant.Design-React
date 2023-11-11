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

export async function updateDetectionEntrustContractById(params: any, options?: { [key: string]: any }) {
  return request<any>('/api/detection/entrust/contract/updateDetectionEntrustContractById',
    {
      method: 'POST',
      data: params,
      ...(options || {}),
    });
}

export async function getDetectionEntrustContractById(params: any, options?: { [key: string]: any }) {
  return request<any>('/api/detection/entrust/contract/getDetectionEntrustContractById',
    {
      method: 'POST',
      data: params,
      ...(options || {}),
    });
}
