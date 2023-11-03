import {ActionType, PageContainer, ProTable} from '@ant-design/pro-components';
import React, {} from 'react';
import EditOrgModalForm from './EditOrgModalForm';
import DelOrgPopConfirm from './DelOrgPopConfirm';
import AddOrgModalForm from './AddOrgModalForm';
import {getSysDictListByDictTypeCode} from "@/pages/system/dict/api/DictApi";
import {Tag} from "antd";

export default (props: { dataSource: any }) => {
    const actionRef = React.useRef<ActionType>();
    return (
        <PageContainer>
            <ProTable<any>
                columns={[
                    {
                        title: '机构名称',
                        dataIndex: 'orgName',
                        width: 100
                    },
                    {
                        title: '机构编码',
                        dataIndex: 'orgCode',
                        width: 100
                    },
                    {
                        title: '机构类型',
                        dataIndex: 'orgType',
                        width: 100,
                        valueType: 'select',
                        request: async () => {
                            const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "orgType"});
                            newVar.data.forEach((item: any) => {
                                item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                            })
                            return newVar.data
                        }
                    },
                    {
                        title: '排序',
                        dataIndex: 'orgSort',
                        hideInSearch: true,
                        width: 100,
                        sorter: (a, b) => a.orgSort - b.orgSort,
                    },
                    {
                        title: '创建时间',
                        dataIndex: 'createTime',
                        hideInSearch: true,
                        ellipsis: true,
                        width: 130
                    },
                    {
                        title: '更新时间',
                        dataIndex: 'updateTime',
                        hideInSearch: true,
                        ellipsis: true,
                        width: 130
                    },
                    {
                        title: '备注',
                        dataIndex: 'remark',
                        hideInSearch: true,
                        ellipsis: true,
                        width: 100

                    },
                    {
                        title: '操作',
                        width: 100,
                        valueType: 'option',
                        align: "center",
                        render: (text, record) => [
                            <EditOrgModalForm key={"EditOrgModalForm"} trigger={<a>编辑</a>} actionRef={actionRef} orgId={record.orgId}/>,
                            <DelOrgPopConfirm key={"DelOrgPopConfirm"} trigger={<a>删除</a>} actionRef={actionRef} orgId={record.orgId}/>,
                        ],
                    },
                ]}
                actionRef={actionRef}
                cardBordered
                rowKey={(record) => record.orgId}
                pagination={false}
                expandable={{
                    defaultExpandAllRows: true,
                    expandRowByClick: true
                }}
                request={props.dataSource}
                toolbar={{
                    actions: [
                        <AddOrgModalForm key={"AddOrgModalForm"} trigger={"新建机构"} actionRef={actionRef}/>,
                    ],
                }}
            />
        </PageContainer>
    )
}
