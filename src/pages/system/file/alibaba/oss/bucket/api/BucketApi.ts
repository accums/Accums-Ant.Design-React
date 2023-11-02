import {request} from 'umi';


export async function listBuckets(params: any, options?: { [key: string]: any }) {
    return request('/api/alibaba/cloud/oss/buckets/listBuckets',
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
