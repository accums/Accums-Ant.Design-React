import {ActionType, PageContainer, ProTable} from '@ant-design/pro-components';
import React, {} from 'react';
import {editSysDataSource, getSysDataSourceListPage} from "@/pages/system/datasource/api/DataSourceApi";
import EditDataSourceModalForm from "@/pages/system/datasource/components/EditDataSourceModalForm";
import {Switch} from "antd";
import InjectPoolPopConfirm from "@/pages/system/datasource/components/add/InjectPoolPopConfirm";
import AddDataSourceModalForm from "@/pages/system/datasource/components/add/AddDataSourceModalForm";
import PoolTable from "@/pages/system/datasource/components/table/PoolTable";
import DataSourceTablesTable from "@/pages/system/datasource/components/table/DataSourceTablesTable";

export default (props: { dataSource: any }) => {
    const actionRef = React.useRef<ActionType>();
    return (
        <PageContainer>
            <ProTable
                columns={[
                    {
                        title: '数据源名称',
                        dataIndex: 'dataSourceName',
                        width: 100,
                        align: "center",
                        render: (text, record) => {
                            return [
                                <DataSourceTablesTable record={record} actionRef={actionRef}/>,
                            ]
                        },
                    },
                    {
                        title: '数据源地址',
                        dataIndex: 'dataSourceUrl',
                        hideInSearch: true,
                        align: "center",
                        width: 200,
                        ellipsis: true
                    },
                    {
                        title: '用户名',
                        dataIndex: 'dataSourceUser',
                        hideInSearch: true,
                        width: 90,
                        align: "center",
                    },
                    {
                        title: '密码',
                        dataIndex: 'dataSourcePassword',
                        hideInSearch: true,
                        valueType: "password",
                        width: 120,
                        align: "center",
                    },
                    {
                        title: '数据源驱动',
                        dataIndex: 'driverClassName',
                        hideInSearch: true,
                        width: 150,
                        align: "center",
                    },
                    {
                        title: '版本号',
                        dataIndex: 'version',
                        hideInSearch: true,
                        width: 60,
                        align: "center",
                    },
                    {
                        title: '备注',
                        dataIndex: 'remark',
                        hideInSearch: true,
                        width: 200,
                        ellipsis: true,
                        align: "center",
                    },
                    {
                        title: '启用',
                        dataIndex: 'status',
                        valueType: "switch",
                        hideInSearch: true,
                        align: "center",
                        width: 60,
                        render: (text, record) => {
                            return (
                                <>
                                    <Switch
                                        size={"small"}
                                        key={`${record.createTime}`}
                                        checked={record.status == "0"}
                                        onChange={async (value) => {
                                            if (value) {
                                                record.status = 0
                                            } else {
                                                record.status = 1
                                            }
                                            let newVar = await editSysDataSource(record)
                                            if (newVar.data) {
                                                actionRef.current?.reload()
                                            }
                                        }}
                                    />
                                </>
                            )
                        },
                    },
                    {
                        title: '操作',
                        width: 100,
                        valueType: 'option',
                        align: "center",
                        render: (text, record) => [
                            <EditDataSourceModalForm actionRef={actionRef} dataSourceId={record.dataSourceId}/>,
                            <InjectPoolPopConfirm record={record} actionRef={actionRef}/>,
                        ],
                    },
                ]}
                search={{
                    layout: 'vertical',
                    defaultCollapsed: true,
                }}
                pagination={{
                    showQuickJumper: true,
                }}
                actionRef={actionRef}
                cardBordered
                rowKey={(record) => record.dataSourceId}
                request={async (params) => {
                    let result = await getSysDataSourceListPage(params);
                    return {
                        data: result.data.rows,
                        success: result.success,
                        total: result.data.totalRows,
                    };
                }}
                toolbar={{
                    actions: [
                        <AddDataSourceModalForm actionRef={actionRef}/>,
                        <PoolTable dataSource={undefined}/>
                    ],
                }}
            />
        </PageContainer>
    )
}
