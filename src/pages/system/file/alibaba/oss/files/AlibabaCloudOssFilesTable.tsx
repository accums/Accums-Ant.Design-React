import {ProTable} from '@ant-design/pro-components';
import React from 'react';
import {listBuckets} from '../bucket/api/BucketApi';
import {Alert} from "antd";
import {listFiles} from "@/pages/system/file/alibaba/oss/files/api/FileApi";

const formatFileSize = (bytes: any) => {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }
    // 保留两位小数，四舍五入
    size = Math.round(size * 100) / 100;
    return `${size} ${units[unitIndex]}`;
}

export default () => {

    return (
        <>
            <Alert showIcon message={"因该功能使用了第三方SDK 请在网络畅通状态下使用"}/>
            <ProTable<any>
                tooltip={'【请勿频繁刷新数据】阿里云接口QPS限制 单用户QPS限制为10次/秒。超过限制，API调用会被限流，这可能会影响您的业务，请合理调用。'}
                headerTitle={" 文件列表"}
                request={async (params) => {
                    const result = await listFiles(params);
                    return {
                        data: result.data,
                        success: result.success
                    }
                }}
                columns={[
                    {
                        title: 'Bucket存储空间',
                        dataIndex: 'bucketName',
                        valueType: "select",
                        fieldProps: {
                            fieldNames: {
                                label: "name",
                                value: "name"
                            }
                        },
                        request: async () => {
                            const result = await listBuckets({})
                            return result.data;
                        },
                        width: 100,
                        align: "center"
                    },
                    {
                        title: '文件名称',
                        dataIndex: 'key',
                        width: 100,
                        ellipsis: true,
                        hideInSearch: true,
                        align: "center"
                    },
                    {
                        title: '文件大小',
                        dataIndex: 'size',
                        width: 100,
                        hideInSearch: true,
                        align: "center",
                        render: (t, r) => {
                            //向上取整
                            return formatFileSize(r.size);
                        }
                    },
                    {
                        title: '最后修改时间',
                        dataIndex: 'lastModified',
                        width: 100,
                        hideInSearch: true,
                        align: "center"
                    },
                ]}
                search={{
                    layout: "vertical",
                    labelWidth: "auto"
                }}
            />
        </>
    );
};

