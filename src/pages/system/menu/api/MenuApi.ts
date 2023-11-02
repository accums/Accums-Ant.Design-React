import {request} from 'umi';


export async function getSysMenuList(params: any, options?: { [key: string]: any }) {
    return request('/api/system/menu/getSysMenuList',
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

export async function getSysMenuAndButtonList(params: any, options?: { [key: string]: any }) {
    return request('/api/system/menu/getSysMenuAndButtonList',
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
export async function addSysMenu(params: any, options?: { [key: string]: any }) {
    return request('/api/system/menu/addSysMenu',
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

export async function updateSysMenuStatus(params: any, options?: { [key: string]: any }) {
    return request('/api/system/menu/updateSysMenuStatus',
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