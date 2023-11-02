import {request} from "@@/plugin-request/request";
import {PageResult} from "@/pages/workflow/model/api/modelApi";

const getRequestParams = (params: any) => {
    return {
        pageSize: params.pageSize,
        pageCurrent: params.current,
        tenantCode: params.tenantCode,
        tenantName:params.tenantName
    };
};
export async function getSysTenantListPage(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<PageResult<any>>>('/api/system/tenant/getSysTenantListPage',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${localStorage.getItem('Token')}`
            },
            data: getRequestParams(params),
            ...(options || {}),
        });
}


export async function addSysTenant(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<boolean>>('/api/system/tenant/addSysTenant',
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


export async function editSysTenant(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<boolean>>('/api/system/tenant/editSysTenant',
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

export async function updateSysTenantStatus(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<boolean>>('/api/system/tenant/updateSysTenantStatus',
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

export async function getSysTenantById(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<any>>('/api/system/tenant/getSysTenantById',
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
export async function getSysTenantList(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<any>>('/api/system/tenant/getSysTenantList',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: params,
            ...(options || {}),
        });
}
