import {ActionType, ModalForm, ProTable} from '@ant-design/pro-components';
import React, {} from 'react';
import {getColumnsListByTableNameAndTableSchema} from "@/pages/system/datasource/api/DataSourcePoolApi";

export default (props: any) => {
    const actionRef = React.useRef<ActionType>();
    return (
        <ModalForm<any>
            trigger={<a>{props.record.tableName}</a>}
            submitter={false}
        >
            <ProTable
                headerTitle={"表【" + props.record.tableName + "】中的列"}
                columns={[
                    {
                        title: '列名',
                        dataIndex: 'columnName',
                        width: 120,
                        align: "center"
                    },
                    {
                        title: '类型',
                        dataIndex: 'columnType',
                        width: 120,
                        align: "center"
                    },
                    {
                        title: '注释',
                        dataIndex: 'columnComment',
                        width: 200,
                        align: "center",
                    },
                    {
                        title: '顺序',
                        dataIndex: 'ordinalPosition',
                        width: 90,
                        align: "center"
                    },
                    {
                        title: '默认值',
                        dataIndex: 'columnDefault',
                        width: 140,
                        align: "center"
                    },
                    {
                        title: '可空',
                        dataIndex: 'isNullable',
                        width: 90,
                        align: "center"
                    },
                    {
                        title: '字符集',
                        dataIndex: 'characterSetName',
                        width: 120,
                        align: "center"
                    },
                    {
                        title: '排序方式',
                        dataIndex: 'collationName',
                        width: 120,
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
                    let result = await getColumnsListByTableNameAndTableSchema(props.record);
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
