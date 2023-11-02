import {request} from "@@/plugin-request/request";


export async function getSysRoleListPage(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/system/role/getSysRoleListPage',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${localStorage.getItem('Token')}`
            },
            data: {
                pageSize: params.pageSize,
                pageCurrent: params.current,
                roleName: params.roleName,
            },
            ...(options || {}),
        });
}

export async function getSysRoleList(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/system/role/getSysRoleList',
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

export async function getSysRoleByRoleId(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/system/role/getSysRoleByRoleId',
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

export async function addSysRole(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/system/role/addSysRole',
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

export async function deleteSysRole(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/system/role/deleteSysRole',
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

export async function editSysRole(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/system/role/editSysRole',
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

export async function updateSysRoleStatus(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/system/role/updateSysRoleStatus',
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