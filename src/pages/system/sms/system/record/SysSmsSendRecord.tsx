import {ProTable} from '@ant-design/pro-components';
import React from 'react';
import {getSysSmsSendRecordListPage} from "@/pages/system/sms/system/api/SmsRecordApi";
import {getSysDictListByDictTypeCode} from "@/pages/system/dict/api/DictApi";
import {Button, Tag} from "antd";
import {Loading3QuartersOutlined,} from "@ant-design/icons";

export default () => {
    return (
        <ProTable<any>
            columns={[
                {
                    title: '日期',
                    dataIndex: 'createDate',
                    align: "center",
                    hideInSearch: true,
                    width: 100,
                },
                {
                    title: '接收手机号',
                    dataIndex: 'phoneNumbers',
                    align: "center",
                    width: 100
                },
                {
                    title: '短信签名',
                    dataIndex: 'signName',
                    align: "center",
                    width: 100,
                },
                {
                    title: '短信服务器商',
                    dataIndex: 'apiProvider',
                    align: "center",
                    hideInSearch: true,
                    width: 100,
                },
                {
                    title: '短信内容',
                    dataIndex: 'content',
                    hideInSearch: true,
                    align: "center",
                    width: 100,
                    ellipsis: true
                },
                {
                    title: '阿里云短信回执码',
                    tooltip: '若调用阿里云接口发送短信，会返还一个该字段作为查询的依据',
                    dataIndex: 'bizId',
                    ellipsis: true,
                    copyable: true,
                    align: "center",
                    width: 100,
                },
                {
                    title: '模板编码',
                    dataIndex: 'templateCode',
                    align: "center",
                    width: 100,
                },
                {
                    title: '发送状态',
                    dataIndex: 'sendStatus',
                    align: "center",
                    width: 100,
                    valueType: "select",
                    request: async () => {
                        const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "sendStatus"});
                        newVar.data.forEach((item: any) => {
                            item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                        })
                        return newVar.data
                    }
                },
                {
                    title: '发送时间',
                    dataIndex: 'sendDate',
                    align: "center",
                    hideInSearch: true,
                    ellipsis: true,
                    width: 100,
                },
                {
                    title: '接收时间',
                    dataIndex: 'receiveDate',
                    align: "center",
                    hideInSearch: true,
                    ellipsis: true,
                    width: 100,
                },
                {
                    title: '运营商状态码',
                    tooltip: '中国电信 移动 联动 等运营商返还的状态码',
                    dataIndex: 'errCode',
                    align: "center",
                    hideInSearch: true,
                    width: 100,
                    valueType: "select",
                    request: async () => {
                        const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "alibabaSmsErrCode"});
                        newVar.data.forEach((item: any) => {
                            item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                        })
                        return newVar.data
                    }
                },
                {
                    title: '操作',
                    valueType: "option",
                    width: 100,
                    render: () => {
                        return (
                            <Button size={"small"} type="primary" icon={<Loading3QuartersOutlined/>}>更新</Button>
                        )
                    }
                },
            ]}
            search={{
                labelWidth: "auto",
                layout: "vertical"
            }}
            request={
                async (params) => {
                    const result = await getSysSmsSendRecordListPage(params);
                    return {
                        data: result.data.rows,
                        success: result.success,
                        total: result.data.totalRows,
                    };
                }
            }
            rowKey={(record) => record.smsSendRecordId}
        />
    );
};
