import {request} from "@@/plugin-request/request";


export async function bindTenantDataSource(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<any>>('/api/system/tenant/datasource/bindTenantDataSource',
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


export async function getTenantDataSourceByTenantId(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<any>>('/api/system/tenant/datasource/getTenantDataSourceByTenantId',
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
