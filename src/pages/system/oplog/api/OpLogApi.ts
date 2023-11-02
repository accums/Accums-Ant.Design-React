import {request} from 'umi';


//分页参数构造器
const getRequestBodyParams = (params: any) => {
    return {
        pageSize: params.pageSize,
        pageCurrent: params.current,
        logName: params.logName,
        opType: params.opType,
        dateTimeRange: params.dateTimeRange,
    };
};

//获取操作日志数据（分页）
export async function getSysOpLogPageList(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<any>>('/api/system/oplog/getSysOpLogPageList',
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

