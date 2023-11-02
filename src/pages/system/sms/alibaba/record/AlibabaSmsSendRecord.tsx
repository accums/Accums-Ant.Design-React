import {ProFormDatePicker, ProFormText} from '@ant-design/pro-components';
import {ProTable, QueryFilter} from '@ant-design/pro-components';
import React, {useState} from 'react';
import {Spin, Tag} from "antd";
import {getSysDictListByDictTypeCode} from "@/pages/system/dict/api/DictApi";
import {alibabaCloudQuerySendDetails} from "@/pages/system/sms/alibaba/api/AlibabaSmsApi";


export default () => {
    const [datasource, setDatasource] = useState<any>([]);
    const [spinning, setSpinning] = useState<boolean | undefined>(false);
    return (
        <>
            <Spin size="large" spinning={spinning}>
                <QueryFilter
                    layout="vertical"
                    onFinish={async (values) => {
                        setSpinning(true)
                        try {
                            const result = await alibabaCloudQuerySendDetails(values);
                            setDatasource(result.data.smsSendDetailDTOs.smsSendDetailDTO)
                        } catch (e) {
                            setSpinning(false)
                        } finally {
                            setSpinning(false)
                        }
                    }}
                >
                    <ProFormText
                        name="phoneNumbers"
                        label="接收短信的手机号"
                        tooltip={'接收短信的手机号码。格式：国内短信：11位手机号码，例如1390000****。国际/港澳台消息：国际区号+号码，例如8520000****。'}
                        rules={[{required: true}]}
                        initialValue={'19822622620'}
                    />
                    <ProFormDatePicker
                        name="sendDate"
                        tooltip={'短信发送日期，支持查询最近30天的记录。格式为yyyyMMdd，例如20181225。'}
                        label="短信发送时间"
                        initialValue={'20230825'}
                        rules={[{required: true}]}
                        fieldProps={{
                            format: 'yyyyMMDD'
                        }}
                    />
                    <ProFormText
                        name="bizId"
                        label="BizId"
                        tooltip={'发送回执ID，即发送流水号。调用发送接口SendSms或SendBatchSms发送短信时，返回值中的BizId字段。'}
                        initialValue={"944700592759403163^0"}

                    />
                </QueryFilter>
                <ProTable<any>
                    tooltip={'【请勿频繁刷新数据】阿里云接口QPS限制 单用户QPS限制为10次/秒。超过限制，API调用会被限流，这可能会影响您的业务，请合理调用。'}
                    headerTitle={"阿里云短信发送记录列表"}
                    columns={[
                        {
                            title: '接收手机号',
                            dataIndex: 'phoneNum',
                            width: 100,
                            align: "center",
                        },
                        {
                            title: '短信内容',
                            dataIndex: 'content',
                            width: 200,
                            ellipsis: true,
                            copyable: true,
                            align: "center"
                        },
                        {
                            title: '发送时间',
                            dataIndex: 'sendDate',
                            width: 150,
                            align: "center",
                        },
                        {
                            title: '接收时间',
                            dataIndex: 'receiveDate',
                            width: 150,
                            align: "center"
                        },
                        {
                            title: '发送状态',
                            dataIndex: 'sendStatus',
                            width: 100,
                            align: "center",
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
                            title: '运营商状态码',
                            dataIndex: 'errCode',
                            tooltip: "如何遇到无法解析的状态码，请访问https://help.aliyun.com/document_detail/101347.html查找对应原因并维护至字典管理",
                            width: 100,
                            align: "center",
                            valueType: "select",
                            request: async () => {
                                const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "alibabaSmsErrCode"});
                                newVar.data.forEach((item: any) => {
                                    item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                                })
                                return newVar.data
                            }
                        },

                    ]}
                    options={{
                        reload: false
                    }}
                    search={false}
                    dataSource={datasource}
                />
            </Spin>
        </>
    );
};

