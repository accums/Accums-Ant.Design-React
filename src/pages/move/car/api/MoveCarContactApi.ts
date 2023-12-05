import {request} from "@@/plugin-request";

export async function getMoveCarContactListPage(params: any, options?: { [key: string]: any }) {
  return request<any>('/api/move/car/contact/getMoveCarContactListPage',
    {
      method: 'POST',
      data: {
        pageSize: params.pageSize,
        pageCurrent: params.current,
      },
      ...(options || {}),
    });
}


export async function addMoveCarContact(params: any, options?: { [key: string]: any }) {
  return request<any>('/api/move/car/contact/addMoveCarContact',
    {
      method: 'POST',
      data: params,
      ...(options || {}),
    });
}
