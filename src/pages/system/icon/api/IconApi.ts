import {request} from "@@/plugin-request/request";


export async function getAntDesignIconListPage(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/system/icon/getAntDesignIconListPage',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${localStorage.getItem('Token')}`
            },
            data: {
                pageSize: params.pageSize,
                pageCurrent: params.current,
                iconLargeCategory: params.iconLargeCategory,
                iconSubclass: params.iconSubclass,
            },
            ...(options || {}),
        });
}

export async function getAntDesignIconList(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/system/icon/getAntDesignIconList',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${localStorage.getItem('Token')}`
            },
            data: {
                iconLargeCategory: params.iconLargeCategory,
                iconSubclass: params.iconSubclass,
            },
            ...(options || {}),
        });
}

export async function saveOrUpdateAntDesignIcon(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/system/icon/saveOrUpdateAntDesignIcon',
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
