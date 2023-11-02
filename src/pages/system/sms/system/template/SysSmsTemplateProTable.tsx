import type {ActionType} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import React, {useState} from 'react';
import EditSysSmsTemplateModalForm from './EditSysSmsTemplateModalForm';
import AddSysSmsTemplateModalForm from './AddSysSmsTemplateModalForm';
import DelSysSmsTemplatePopConfirm from "@/pages/system/sms/system/template/DelSysSmsTemplatePopConfirm";
import {getSysSmsTemplateListPage} from "@/pages/system/sms/system/api/SmsTemplateApi";

export default () => {

    const [tableSelectedRowKeys, setTableSelectedRowKeys] = useState<any>([]);

    const actionRef = React.useRef<ActionType>();
    return (
        <ProTable<any>
            search={{
                labelWidth: "auto",
                layout: "vertical"
            }}
            columns={[
                {
                    title: '模板名称',
                    dataIndex: 'smsTemplateName',
                    width: 100
                },
                {
                    title: '模板类型',
                    dataIndex: 'smsTemplateType',
                    width: 100,
                },
                {
                    title: '模板编码',
                    dataIndex: 'smsTemplateCode',
                    width: 100,
                },
                {
                    title: '模板内容',
                    dataIndex: 'smsTemplateContent',
                    ellipsis: true,
                    width: 200,
                },
                {
                    title: '备注',
                    dataIndex: 'remark',
                    hideInSearch: true,
                    width: 100,
                    ellipsis: true
                },
            ]}
            actionRef={actionRef}
            rowSelection={{
                selectedRowKeys: tableSelectedRowKeys,
                type: "radio",
                onChange: function (selectedRowKeys, selectedRows) {
                    if (selectedRows.length > 0 && selectedRows[0].smsTemplateId) {
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
                        setTableSelectedRowKeys([record.smsTemplateId])
                    },
                };
            }}
            tableAlertRender={({selectedRowKeys, onCleanSelected}) => {
                return [
                    <EditSysSmsTemplateModalForm smsTemplateId={selectedRowKeys[0]} actionRef={actionRef}/>,
                    <DelSysSmsTemplatePopConfirm smsTemplateId={selectedRowKeys[0]} actionRef={actionRef}
                                                 onCleanSelected={onCleanSelected}/>
                ]
            }}
            request={
                async (params) => {
                    const result = await getSysSmsTemplateListPage(params);
                    return {
                        data: result.data.rows,
                        success: result.success,
                        total: result.data.totalRows,
                    };
                }
            }
            rowKey={(record) => record.smsTemplateId}
            toolBarRender={() => [
                <AddSysSmsTemplateModalForm actionRef={actionRef}/>
            ]}
        />
    );
};
