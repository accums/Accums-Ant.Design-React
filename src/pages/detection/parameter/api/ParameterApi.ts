import {request} from "@@/plugin-request";


export async function addDetectionParameter(params: any, options?: { [key: string]: any }) {
  return request<any>('/api/detection/parameter/addDetectionParameter',
    {
      method: 'POST',
      data: params,
      ...(options || {}),
    });
}


export async function getDetectionParameterListPage(params: any, options?: { [key: string]: any }) {
  return request<any>('/api/detection/parameter/getDetectionParameterListPage',
    {
      method: 'POST',
      data: {
        pageSize: params.pageSize,
        pageCurrent: params.current,
        parameterName: params.parameterName,
        parameterCode: params.parameterCode,
        categorizeParent: params.categorizeParent,
      },
      ...(options || {}),
    });
}
