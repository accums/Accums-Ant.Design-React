import {request} from "@@/plugin-request/request";


export async function QuerySmsTemplateList(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/alibaba/cloud/sms/template/QuerySmsTemplateList',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${localStorage.getItem('Token')}`
            },
            data: {
                pageSize: params.pageSize,
                pageIndex: params.current,
            },
            ...(options || {}),
        });
}

export async function AddSmsTemplate(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/alibaba/cloud/sms/template/AddSmsTemplate',
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

export async function DeleteAlibabaSmsTemplate(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/alibaba/cloud/sms/template/DeleteSmsTemplate',
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

export async function alibabaCloudSendSms(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/alibaba/cloud/sms/SendSms',
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
export async function alibabaCloudQuerySendDetails(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/alibaba/cloud/sms/QuerySendDetails',
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