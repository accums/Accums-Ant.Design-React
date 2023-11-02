import {request} from "@@/plugin-request/request";

export async function getSysUserListPage(params: any, orgId: string, options?: { [key: string]: any }) {
    return request<any>('/api/system/user/getSysUserListPage',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${localStorage.getItem('Token')}`
            },
            data: {
                pageSize: params.pageSize,
                pageCurrent: params.current,
                account: params.account,
                nickName: params.nickName,
                orgId: orgId === "0" ? '' : orgId,
            },
            ...(options || {}),
        });
}

export async function getSysUserResultById(params: any) {
    return request<any>('/api/system/user/getSysUserResultById',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${localStorage.getItem('Token')}`
            },
            data: params,
        });
}


export async function updateSysUserStatus(params: any) {
    return request<any>('/api/system/user/updateSysUserStatus',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${localStorage.getItem('Token')}`
            },
            data: params,
        });
}

export async function addSysUser(params: any) {
    return request<any>('/api/system/user/addSysUser',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${localStorage.getItem('Token')}`
            },
            data: params,
        });
}

export async function editSysUser(params: any) {
    return request<any>('/api/system/user/editSysUser',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${localStorage.getItem('Token')}`
            },
            data: params,
        });
}

export async function deleteSysUser(params: any) {
    return request<any>('/api/system/user/deleteSysUser',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${localStorage.getItem('Token')}`
            },
            data: params,
        });
}