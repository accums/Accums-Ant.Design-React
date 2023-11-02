import {request} from "@@/plugin-request/request";

export type BaseResult<T> = {
  code: string;
  data: T;
  message: string;
  success: boolean;
}

export type PageResult<T> = {
  pageCurrent: string;
  pageSize: string;
  totalPage: string;
  totalRows: number;
  rows: T[];
}

//查询参数构造器
const getRequestBodyParams = (params: any) => {
  return {
    pageSize: params.pageSize,
    pageCurrent: params.current,
    modelId: params.modelId,
    modelName: params.modelName,
    category: params.category,
    tenantId: params.tenantId
  };
};

export async function selectModelListPage(params: any, options?: { [key: string]: any }) {
  return request<any>('/workflow/act/re/model/selectModelListPage',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: getRequestBodyParams(params),
      ...(options || {}),
    });
}

export async function selectActReModelResultList(params: any, options?: { [key: string]: any }) {
  return request<any>('/workflow/act/re/model/selectActReModelResultList',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: getRequestBodyParams(params),
      ...(options || {}),
    });
}

export async function newModel(params: any, options?: { [key: string]: any }) {
  return request<any>('/workflow/act/re/model/newModel',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
      ...(options || {}),
    });
}

export async function updateModelById(params: any, options?: { [key: string]: any }) {
  return request<any>('/workflow/act/re/model/updateModelById',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
      ...(options || {}),
    });
}

export async function deleteModelById(params: any, options?: { [key: string]: any }) {
  return request<any>('/workflow/act/re/model/deleteModelById',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
      ...(options || {}),
    });
}
export async function deleteWholeModelById(params: any, options?: { [key: string]: any }) {
  return request<any>('/workflow/act/re/model/deleteWholeModelById',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
      ...(options || {}),
    });
}
export async function selectModelDetailsById(params: any, options?: { [key: string]: any }) {
  return request<any>('/workflow/act/re/model/selectModelDetailsById',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
      ...(options || {}),
    });
}



export async function designModel(params: any, options?: { [key: string]: any }) {
  return request<any>('/workflow/design/modeler',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      params,
      ...(options || {}),
    });
}
