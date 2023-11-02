import {request} from "@@/plugin-request";

export async function deployWayBpmnModel(params: any, options?: { [key: string]: any }) {
  return request<any>('/workflow/act/re/deploy/deployWayBpmnModel',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data:params,
      ...(options || {}),
    });
}
