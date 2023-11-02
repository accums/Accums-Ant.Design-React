import {ActionType, ModalForm, ProTable} from '@ant-design/pro-components';
import React, {} from 'react';
import {getTenantDataSourceByTenantId} from "@/pages/system/tenant/api/TenantDataSourceApi";
import {Alert} from "antd";

export default (props: { tenant: any }) => {
    const actionRef = React.useRef<ActionType>();

    return (
        <ModalForm<any>
            trigger={<a>数据源</a>}
            submitter={false}
        >
            <ProTable
                tooltip={"此处数据为 租户绑定且生效的数据源"}
                columns={[
                    {
                        title: '租户名称',
                        dataIndex: 'tenantName',
                        width: 100,
                        align: "center"
                    },
                    {
                        title: '租户编码',
                        dataIndex: 'tenantCode',
                        width: 100,
                        align: "center"
                    },
                    {
                        title: '数据源名称',
                        dataIndex: 'dataSourceName',
                        width: 100,
                        align: "center"
                    },
                ]}
                pagination={false}
                search={false}
                actionRef={actionRef}
                rowKey={() => props.tenant.dataSourceId}
                params={{tenantId: props.tenant.tenantId}}
                request={async (params) => {
                    const newVar = await getTenantDataSourceByTenantId(params);
                    if (newVar.data) {
                        return {
                            data: newVar.data,
                            success: newVar.success,
                        };
                    }
                    return [];
                }}
                toolbar={{
                    actions: [

                    ],
                }}
            />
            <Alert message="租户目前只能绑定一个数据源 切换或移除数据源请联系管理人员" closable type="info"/>
        </ModalForm>
    )
}
