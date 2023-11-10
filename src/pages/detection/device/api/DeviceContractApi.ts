import {request} from "@@/plugin-request";

export async function getDetectionDeviceListPage(params: any, options?: { [key: string]: any }) {
  return request<any>('/api/detection/device/getDetectionDeviceListPage',
    {
      method: 'POST',
      data: {
        pageSize: params.pageSize,
        pageCurrent: params.current,
      },
      ...(options || {}),
    });
}


