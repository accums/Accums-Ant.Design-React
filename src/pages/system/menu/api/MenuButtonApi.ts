import {request} from 'umi';


export async function getSysMenuButtonListPage(params: any, options?: { [key: string]: any }) {
    return request('/api/system/menu/button/getSysMenuButtonListPage',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${localStorage.getItem('Token')}`
            },
            data: {
                pageSize: params.pageSize,
                pageCurrent: params.current,
                menuId: params.menuId,
            },
            ...(options || {}),
        });
}

export async function addSysMenuButton(params: any, options?: { [key: string]: any }) {
    return request('/api/system/menu/button/addSysMenuButton',
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

export async function deleteSysMenuButton(params: any) {
    return request('/api/system/menu/button/deleteSysMenuButton',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${localStorage.getItem('Token')}`
            },
            data: params
        });
}

export async function editSysMenuButton(params: any, options?: { [key: string]: any }) {
    return request('/api/system/menu/button/editSysMenuButton',
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

export async function getSysMenuButtonById(params: any, options?: { [key: string]: any }) {
    return request('/api/system/menu/button/getSysMenuButtonById',
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