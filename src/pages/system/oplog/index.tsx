import type {ActionType} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import {message, Tag} from 'antd';
import React from 'react';
import DetailOpLogDrawerForm from "@/pages/system/oplog/components/DetailOpLogDrawerForm";
import { getSysOpLogPageList } from './api/OpLogApi';
import { getSysDictListByDictTypeCode } from '../dict/api/DictApi';



export default () => {
    const actionRef = React.useRef<ActionType>();
    return (
        <ProTable<any>
            columns={[
                {
                    title: '序号',
                    dataIndex: 'logId',
                    valueType: 'indexBorder'
                },
                {
                    title: '名称',
                    dataIndex: 'logName',
                    align:"center",
                    render: (dom, entity) => {
                        return <DetailOpLogDrawerForm entity={entity}/>
                    },
                },
                {
                    title: '请求接口',
                    dataIndex: 'requestUrl',
                    hideInSearch: true,
                    align:"center",
                },
                {
                    title: '操作类型',
                    dataIndex: 'opType',
                    valueType:"select",
                    align:"center",
                    request: async () => {
                        const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "opType"});
                        newVar.data.forEach((item: any) => {
                            item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                        })
                        return newVar.data
                    }
                },
                {
                    title: '操作结果',
                    dataIndex: 'opStatus',
                    align:"center",
                    valueType:"select",
                    hideInSearch: true,
                    request: async () => {
                        const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "opStatus"});
                        newVar.data.forEach((item: any) => {
                            item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                        })
                        return newVar.data
                    }
                },
                {
                    title: '操作用户',
                    dataIndex: 'createUser',
                    align:"center",
                    hideInSearch: true,
                },
                {
                    title: '操作时间',
                    dataIndex: 'createTime',
                    align:"center",
                    hideInSearch: true,
                },
                {
                    title: '时间范围',
                    dataIndex: 'dateTimeRange',
                    valueType: 'dateTimeRange',
                    hideInTable: true,
                },
            ]}
            actionRef={actionRef}
            cardBordered
            request={
                async (params) => {
                    const result = await getSysOpLogPageList(params);
                    if (result.data) {
                        return {
                            data: result.data.rows,
                            success: result.success,
                            total: result.data.totalRows,
                        };
                    }
                    message.error(result.message)
                    return {};
                }
            }
            rowKey={(record) => record.logId}
            pagination={{}}
            headerTitle="日志列表"
        />
    );
};

