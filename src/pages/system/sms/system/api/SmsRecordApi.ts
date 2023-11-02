import {request} from "@@/plugin-request/request";


//获取系统短信模板数据列表 （分页）
export async function getSysSmsSendRecordListPage(params: any, options?: { [key: string]: any }) {
    return request<any>('/api/system/sms/send/record/getSysSmsSendRecordListPage',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${localStorage.getItem('Token')}`
            },
            data: {
                pageSize: params.pageSize,
                pageCurrent: params.current,
                phoneNumbers: params.phoneNumbers,
                signName: params.signName,
                bizId: params.bizId,
                templateCode: params.templateCode,
                sendStatus: params.sendStatus,
            },
            ...(options || {}),
        });
}
