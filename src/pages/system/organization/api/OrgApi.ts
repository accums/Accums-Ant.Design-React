import {request} from "@@/plugin-request/request";

export async function addSysOrganization(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<any>>('/api/system/organization/addSysOrganization',
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


export async function editSysOrganization(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<any>>('/api/system/organization/editSysOrganization',
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

export async function deleteSysOrganization(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<any>>('/api/system/organization/deleteSysOrganization',
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

export async function getSysOrganizationById(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<any>>('/api/system/organization/getSysOrganizationById',
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

//获取当前登录人权限下的机构组织树形数据
export async function getSysOrganizationTreeByToken(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<any>>('/api/system/organization/getSysOrganizationTreeByToken',
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

//获取当前登录人权限下的机构组织树形数据Options
export async function getSysOrganizationTreeList(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<any>>('/api/system/organization/getSysOrganizationTreeList',
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


const getRequestParams = (params: any) => {
    return {
        pageSize: params.pageSize,
        pageCurrent: params.current,
        orgName: params.orgName,
        orgCode: params.orgCode,
        orgType: params.orgType
    };
};
