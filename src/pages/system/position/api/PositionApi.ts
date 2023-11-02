import {request} from "@@/plugin-request/request";


//分页参数构造器
const getRequestBodyParams = (params: any) => {
    return {
        pageSize: params.pageSize,
        pageCurrent: params.current,
        positionName: params.positionName,
    };
};

export async function getSysPositionListPage(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/system/position/getSysPositionListPage',
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

export async function addSysPosition(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/system/position/addSysPosition',
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

export async function deleteSysPosition(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/system/position/deleteSysPosition',
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

export async function getSysPositionById(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/system/position/getSysPositionById',
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

export async function editSysPosition(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/system/position/editSysPosition',
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


export async function updateSysPositionStatus(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/system/position/updateSysPositionStatus',
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

export async function getSysPositionList(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/system/position/getSysPositionList',
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