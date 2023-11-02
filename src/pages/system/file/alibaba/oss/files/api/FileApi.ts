import {request} from 'umi';


export async function listFiles(params: any, options?: { [key: string]: any }) {
    return request('/api/alibaba/cloud/oss/files/listFiles',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${localStorage.getItem('Token')}`
            },
            data: params,
            ...(options || {}),
        });
}