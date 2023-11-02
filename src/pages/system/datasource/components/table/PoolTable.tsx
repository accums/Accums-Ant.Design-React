import {ActionType, ModalForm, ProTable} from '@ant-design/pro-components';
import React, {useState} from 'react';
import {getDataSourcePoolList} from "@/pages/system/datasource/api/DataSourcePoolApi";
import {Button} from "antd";
import RemovePoolPopConfirm from "@/pages/system/datasource/components/RemovePoolPopConfirm";


export default (props: { dataSource: any }) => {
    const actionRef = React.useRef<ActionType>();


    const [dataSource, setDataSource] = useState<any>();

    return (
        <ModalForm<any>
            trigger={<Button onClick={
                async () => {
                    let result = await getDataSourcePoolList({});
                    setDataSource(result.data);
                }
            } type="primary">查看连接池</Button>}
            submitter={false}
        >
            <ProTable
                tooltip={"此处展示的是已经注入连接池中的数据源 无须重启服务即可被租户动态使用"}
                columns={[
                    {
                        title: '数据源名称',
                        dataIndex: 'dataSourceName',
                        width: "200px",
                        align: "center"
                    },
                    {
                        title: '操作',
                        align: "center",
                        width: "200px",
                        valueType: 'option',
                        render: (text, record) => {
                            return [
                                <RemovePoolPopConfirm record={record} actionRef={actionRef}/>
                            ]
                        }
                    },
                ]}
                pagination={{
                    defaultPageSize:5
                }}
                search={false}
                actionRef={actionRef}
                rowKey={(record) => record.dataSourceId}
                dataSource={dataSource}
                request={async () => {
                    let result = await getDataSourcePoolList({});
                    setDataSource(result.data);
                    return {
                        data: result.data.rows,
                        success: result.success,
                        total: result.data.totalRows,
                    };
                }}
            />
        </ModalForm>
    )
}
