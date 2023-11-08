import {request} from "@@/plugin-request";

export async function getDetectionEntrustContractListPage(params: any, options?: { [key: string]: any }) {
  return request<any>('/api/detection/entrust/contract/getDetectionEntrustContractListPage',
    {
      method: 'POST',
      data: {
        pageSize: params.pageSize,
        pageCurrent: params.current,
      },
      ...(options || {}),
    });
}
