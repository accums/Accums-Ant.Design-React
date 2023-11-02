import type {ActionType} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import React, {useState} from 'react';
import AlibabaTemplateRejectReason from './AlibabaTemplateRejectReason';
import {QuerySmsTemplateList} from "@/pages/system/sms/alibaba/api/AlibabaSmsApi";
import DelAlibabaSmsTemplatePopConfirm from "@/pages/system/sms/alibaba/template/DelAlibabaSmsTemplatePopConfirm";
import AddAlibabaSmsTemplateModalForm from "@/pages/system/sms/alibaba/template/AddAlibabaSmsTemplateModalForm";

export default () => {

    const actionRef = React.useRef<ActionType>();
    const [tableSelectedRowKeys, setTableSelectedRowKeys] = useState<any>([]);
    return (
        <ProTable<any>
            tooltip={'【请勿频繁刷新数据】阿里云接口QPS限制 单用户QPS限制为10次/秒。超过限制，API调用会被限流，这可能会影响您的业务，请合理调用。'}
            headerTitle={"阿里云短信模板数据列表"}
            columns={[
                {
                    title: '模板编码',
                    dataIndex: 'templateCode',
                    width: 100,
                },
                {
                    title: '工单编号',
                    dataIndex: 'orderId',
                    width: 100,
                },
                {
                    title: '模板类型',
                    dataIndex: 'templateType',
                    width: 100,
                    valueType: "select",
                    valueEnum: {
                        '0': {text: '短信通知'},
                        '1': {text: '推广短信'},
                        '2': {text: '验证码短信'},
                        '6': {text: '国际/港澳台消息'},
                        '7': {text: '数字短信'},
                    }
                },
                {
                    title: '模板名称',
                    dataIndex: 'templateName',
                    width: 100,
                },
                {
                    title: '模板内容',
                    dataIndex: 'templateContent',
                    hideInSearch: true,
                    width: 100,
                    ellipsis: true,
                    copyable: true,
                },

                {
                    title: '审批状态',
                    dataIndex: 'auditStatus',
                    width: 100,
                    render: (dom, entity,) => {
                        return <AlibabaTemplateRejectReason entity={entity}/>
                    }
                },
                {
                    title: '创建时间',
                    dataIndex: 'createDate',
                    width: 100,
                },
            ]}
            rowSelection={{
                selectedRowKeys: tableSelectedRowKeys,
                type: "radio",
                onChange: function (selectedRowKeys, selectedRows) {
                    if (selectedRows.length > 0 && selectedRows[0].templateCode) {
                        setTableSelectedRowKeys(selectedRowKeys)
                        return;
                    } else {
                        setTableSelectedRowKeys(undefined)
                    }
                }
            }}
            onRow={(record) => {
                return {
                    onClick: () => {
                        setTableSelectedRowKeys([record.templateCode])
                    },
                };
            }}
            tableAlertRender={({selectedRowKeys, onCleanSelected}) => {
                return [
                    <DelAlibabaSmsTemplatePopConfirm templateCode={selectedRowKeys[0]} actionRef={actionRef}
                                                     onCleanSelected={onCleanSelected}
                                                     key={'DelSmsTemplatePopConfirm'}/>
                ]
            }}
            search={false}
            actionRef={actionRef}
            request={
                async (params) => {
                    const result = await QuerySmsTemplateList(params);
                    return {
                        data: result.data.smsTemplateList,
                        total: result.data.totalCount,
                        success: result.success,
                    };
                }
            }
            rowKey={(record) => record.templateCode}
            toolBarRender={() => {
                return [
                    <AddAlibabaSmsTemplateModalForm actionRef={actionRef}/>
                ]
            }}
        />
    );
};

