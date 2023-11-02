import {ActionType, ModalForm, ProTable} from '@ant-design/pro-components';
import React, {} from 'react';
import DataSourceTablesColumnsTable from "@/pages/system/datasource/components/table/DataSourceTablesColumnsTable";
import {getTableListByTableSchema} from "@/pages/system/datasource/api/DataSourcePoolApi";

export default (props: any) => {
    const actionRef = React.useRef<ActionType>();
    return (
        <ModalForm<any>
            trigger={<a>{props.record.dataSourceName}</a>}
            submitter={false}
        >
            <ProTable
                headerTitle={"数据源【"+props.record.dataSourceName+"】中的所有表"}
                columns={[
                    {
                        title: '表名称',
                        dataIndex: 'tableName',
                        width: 100,
                        align:"center",
                        render: (text, record) => {
                            return [
                                <DataSourceTablesColumnsTable  record={record} actionRef={actionRef}/>,
                            ]
                        },
                    },
                    {
                        title: '注释',
                        dataIndex: 'tableComment',
                        width: 100,
                        align: "center"
                    },
                    {
                        title: '类型',
                        dataIndex: 'tableType',
                        width: 100,
                        align: "center"
                    },
                    {
                        title: '引擎',
                        dataIndex: 'engine',
                        width: 100,
                        align: "center"
                    },
                    {
                        title: '排序方式',
                        dataIndex: 'tableCollation',
                        width: 100,
                        align: "center"
                    },
                    {
                        title: '行格式',
                        dataIndex: 'rowFormat',
                        width: 100,
                        align: "center"
                    },
                    {
                        title: '数据数',
                        dataIndex: 'tableRows',
                        width: 100,
                        align: "center"
                    },
                ]}
                pagination={{
                    size: "small",
                    defaultPageSize: 6
                }}
                search={false}
                actionRef={actionRef}
                rowKey={(record) => record.dataSourceId}
                request={async () => {
                    let result = await getTableListByTableSchema(props.record);
                    return {
                        data: result.data,
                        success: result.success,
                        total: result.data.size,
                    };
                }}
            />
        </ModalForm>
    )
}
