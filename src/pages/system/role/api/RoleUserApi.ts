import {request} from "@@/plugin-request/request";


export async function getSysUserBindRolesByUserId(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/system/role/user/getSysUserBindRolesByUserId',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${localStorage.getItem('Token')}`
            },
            data: params,
            ...(options || {}),
        });
}
export async function userBindRoles(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/system/role/user/userBindRoles',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${localStorage.getItem('Token')}`
            },
            data: params,
            ...(options || {}),
        });
}
