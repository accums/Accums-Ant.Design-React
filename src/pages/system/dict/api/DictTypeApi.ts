import {request} from "@@/plugin-request/request";

const getRequestBodyParams = (params: any) => {
    return {
        pageSize: params.pageSize,
        pageCurrent: params.current,
        dictTypeCode: params.dictTypeCode
    };
};


export async function getSysDictTypeList(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<any>>('/api/system/dict/type/getSysDictTypeList',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${localStorage.getItem('Token')}`
            },
            data: getRequestBodyParams(params),
            ...(options || {}),
        });
}

export async function addSysDictType(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<any>>('/api/system/dict/type/addSysDictType',
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

export async function deleteSysDictType(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<any>>('/api/system/dict/type/deleteSysDictType',
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


export async function getSysDictTypeById(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<any>>('/api/system/dict/type/getSysDictTypeById',
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


export async function updateSysDictType(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<any>>('/api/system/dict/type/updateSysDictType',
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


