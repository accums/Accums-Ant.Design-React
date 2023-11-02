import {request} from "@@/plugin-request/request";

export type BaseResult<T> = {
  code: string;
  data: T;
  message: string;
  success: boolean;
}


//查询参数构造器
const getRequestBodyParams = (params: any) => {
  return {
    pageSize: params.pageSize,
    pageCurrent: params.current,
    defineName: params.name,
    defineKey: params.key,
    categoryId: params.category,
    tenantId: params.tenantId
  };
};

export async function listPage(params: any, options?: { [key: string]: any }) {
  return request<any>('/workflow/act/re/define/listPage',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: getRequestBodyParams(params),
      ...(options || {}),
    });
}

export async function updateSuspensionStatus(params: any, options?: { [key: string]: any }) {
  return request<any>('/workflow/act/re/define/updateSuspensionStatus',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
      ...(options || {}),
    });
}
