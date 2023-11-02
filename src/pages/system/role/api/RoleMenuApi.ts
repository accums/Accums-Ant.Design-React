import {request} from "@@/plugin-request/request";


export async function roleBindMenus(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/system/role/menu/roleBindMenus',
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

export async function getSysRoleBindMenusByRoleId(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/system/role/menu/getSysRoleBindMenusByRoleId',
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
