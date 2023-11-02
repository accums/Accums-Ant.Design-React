import {request} from "@@/plugin-request/request";

export async function alibabaSms(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/system/sms/send/alibabaSms',
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

export async function getSendAlibabaSmsResult(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/system/sms/send/getSendAlibabaSmsResult',
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
