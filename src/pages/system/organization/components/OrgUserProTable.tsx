import {ActionType, ProTable} from '@ant-design/pro-components';
import React, {useEffect} from 'react';
import EditOrgModalForm from './EditOrgModalForm';
import DelOrgPopConfirm from './DelOrgPopConfirm';
import AddOrgModalForm from './AddOrgModalForm';
import {Button} from "antd";
import {DeleteOutlined, EditOutlined,} from "@ant-design/icons";

export default (props: any) => {
    const actionRef = React.useRef<ActionType>();
    useEffect(() => {
        if (props.orgId) {
            props.setHrOrgTableSelectedRowKeys([props.orgId])
        }
    }, [props.orgId]);
    return (
        <ProTable<any>
            columns={[
                {
                    title: '机构名称',
                    dataIndex: 'orgName',
                },
            ]}
            actionRef={actionRef}
            rowKey={(record) => record.orgId}
            pagination={false}
            search={false}
            expandable={{
                defaultExpandAllRows: true,
                expandRowByClick: true
            }}
            rowSelection={{
                selectedRowKeys: props.hrOrgIdTableSelectedRowKeys,
                type: "radio",
                onChange: function (selectedRowKeys, selectedRows,) {
                    if (selectedRows[0].orgId) {
                        props.setOrgId(selectedRows[0].orgId)
                        props.setHrOrgTableSelectedRowKeys(selectedRowKeys)
                        return;
                    }
                }
            }}
            options={{
                //搜索
                search: false,
                //设置
                setting: false,
                //刷新
                reload: true,
                //密度
                density: false
            }}
            tableAlertOptionRender={false}
            tableAlertRender={false}
            request={props.dataSource}
            toolbar={{
                actions: [
                    <AddOrgModalForm trigger={""} actionRef={actionRef}/>,
                    <EditOrgModalForm trigger={<Button type="primary"  icon={<EditOutlined/>}></Button>}
                                      actionRef={actionRef} orgId={props.orgId}/>,
                    <DelOrgPopConfirm trigger={<Button type="primary"  danger  icon={<DeleteOutlined/>}></Button>}
                                      actionRef={actionRef} orgId={props.orgId}/>,
                ],
            }}
        />
    )
}
