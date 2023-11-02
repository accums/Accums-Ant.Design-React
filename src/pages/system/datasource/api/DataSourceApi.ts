import {request} from "@@/plugin-request/request";
import {PageResult} from "@/pages/workflow/model/api/modelApi";


const getRequestParams = (params: any) => {
    return {
        pageSize: params.pageSize,
        pageCurrent: params.current,
        dataSourceName: params.dataSourceName
    };
};

export async function getSysDataSourceListPage(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<PageResult<any>>>('/api/system/datasource/getSysDataSourceListPage',
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

export async function getSysDataSourceList(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<any>>('/api/system/datasource/getSysDataSourceList',
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

export async function addSysDataSource(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<boolean>>('/api/system/datasource/addSysDataSource',
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

export async function editSysDataSource(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<boolean>>('/api/system/datasource/editSysDataSource',
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

export async function getSysDataSourceById(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<any>>('/api/system/datasource/getSysDataSourceById',
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


