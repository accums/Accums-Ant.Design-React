import {request} from "umi";


export async function getDataSourcePoolList(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<any>>('/api/system/datasource/pool/getDataSourcePoolList',
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

export async function addDataSourcePool(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<any>>('/api/system/datasource/pool/addDataSourcePool',
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
export async function removeDataSourcePool(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<any>>('/api/system/datasource/pool/removeDataSourcePool',
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

export async function getTableListByTableSchema(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<any>>('/api/system/datasource/pool/getTableListByTableSchema',
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

export async function getColumnsListByTableNameAndTableSchema(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<any>>('/api/system/datasource/pool/getColumnsListByTableNameAndTableSchema',
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
