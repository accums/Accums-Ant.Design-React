import {ProTable} from '@ant-design/pro-components';
import React from 'react';
import {listBuckets} from './api/BucketApi';
import {Alert} from "antd";


export default () => {
    return (
        <>
            <Alert showIcon message={"因该功能使用了第三方SDK 请在网络畅通状态下使用"}/>
            <ProTable<any>
                tooltip={'【请勿频繁刷新数据】阿里云接口QPS限制 单用户QPS限制为10次/秒。超过限制，API调用会被限流，这可能会影响您的业务，请合理调用。'}
                headerTitle={"阿里云对象存储 Bucket 列表"}
                columns={[
                    {
                        title: 'Bucket名称',
                        dataIndex: 'name',
                        width: 100,
                        align: "center",
                    },
                    {
                        title: 'Endpoint地域节点',
                        dataIndex: 'location',
                        width: 100,
                        ellipsis: true,
                        copyable: true,
                        align: "center"
                    },
                    {
                        title: 'Bucket域名',
                        dataIndex: 'extranetEndpoint',
                        width: 100,
                        ellipsis: true,
                        copyable: true,
                        align: "center"
                    },
                    {
                        title: '存储类型',
                        dataIndex: 'storageClass',
                        width: 100,
                        align: "center"
                    },
                    {
                        title: '创建时间',
                        dataIndex: 'creationDate',
                        width: 100,
                        align: "center",
                    },
                ]}
                request={async (params) => {
                    const result = await listBuckets(params)
                    return {
                        data: result.data,
                        success: result.success,
                    };
                }}
                search={false}
            />
        </>
    );
};

