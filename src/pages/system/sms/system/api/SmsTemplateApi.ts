import {request} from "@@/plugin-request/request";


//获取系统短信模板数据列表 （分页）
export async function getSysSmsTemplateListPage(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/system/sms/template/getSysSmsTemplateListPage',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${localStorage.getItem('Token')}`
            },
            data: {
                pageSize: params.pageSize,
                pageCurrent: params.current,
            },
            ...(options || {}),
        });
}

//新增系统短信模板
export async function addSysSmsTemplate(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/system/sms/template/addSysSmsTemplate',
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

// 获取系统短信模板信息根据其ID
export async function getSysSmsTemplateById(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/system/sms/template/getSysSmsTemplateById',
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

// 编辑系统短信模板
export async function editSmsTemplate(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/system/sms/template/editSmsTemplate',
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


// 删除系统短信模板
export async function deleteSmsTemplate(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/system/sms/template/deleteSmsTemplate',
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
