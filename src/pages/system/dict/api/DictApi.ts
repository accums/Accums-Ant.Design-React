import {request} from "@@/plugin-request/request";


export async function getSysDictListByDictParentId(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<any>>('/api/system/dict/getSysDictListByDictParentId',
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


export async function getSysDictById(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<any>>('/api/system/dict/getSysDictById',
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


export async function addSysDict(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<any>>('/api/system/dict/addSysDict',
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

export async function deleteSysDict(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<any>>('/api/system/dict/deleteSysDict',
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

export async function updateSysDict(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<any>>('/api/system/dict/updateSysDict',
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

export async function getSysDictListByDictTypeCode(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<any>>('/api/system/dict/getSysDictListByDictTypeCode',
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