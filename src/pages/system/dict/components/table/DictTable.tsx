import {Switch, Tag} from 'antd';
import React, {useEffect, useState} from 'react';
import {ActionType, ProTable} from '@ant-design/pro-components';
import AddDictModalForm from "@/pages/system/dict/components/add/AddDictModalForm";
import DeleteDictPopConfirm from "@/pages/system/dict/components/delete/DeleteDictPopConfirm";
import EditDict from "@/pages/system/dict/components/edit/EditDict";
import {getSysDictListByDictParentId, updateSysDict} from "@/pages/system/dict/api/DictApi";

export default (props: { dictTypeId: string; }) => {
    const [tableListDataSource, setTableListDataSource] = useState<any>([]);
    const actionRef = React.useRef<ActionType>();

    useEffect(() => {
        if (props.dictTypeId) {
            DictList().then()
        }
    }, [props.dictTypeId]);

    const DictList = async () => {
        try {
            const states = await getSysDictListByDictParentId({"dictParentId": props.dictTypeId});
            setTableListDataSource(states.data)
            return true;
        } catch (error) {
            return false;
        }
    };

    return (
        <ProTable<any>
            columns={[
                {
                    title: '字典编码',
                    dataIndex: 'dictCode',
                    width: 100,
                    align: "center",
                    copyable: true
                },
                {
                    title: '字典名称',
                    dataIndex: 'dictName',
                    width: 100,
                    align: "center",
                    render: (text, record) => {
                        return <Tag color={record.antDesignTagColor}> {record.dictName} </Tag>
                    }
                },
                {
                    title: '字典值',
                    dataIndex: 'dictValue',
                    width: 100,
                    align: "center",
                    hideInSearch: true,
                },
                {
                    title: '排序',
                    dataIndex: 'dictSort',
                    width: 100,
                    align: "center",
                    hideInSearch: true
                },
                {
                    title: '备注',
                    dataIndex: 'remark',
                    width: 200,
                    hideInSearch: true,
                    align: "center",
                    ellipsis: true
                },
                {
                    title: '启用',
                    dataIndex: 'status',
                    valueType: "switch",
                    width: 100,
                    align: "center",
                    hideInSearch: true,
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
                                        let newVar = await updateSysDict(record);
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
                    render: (text, record) => [
                        <EditDict actionRef={actionRef} record={record}/>,
                        <DeleteDictPopConfirm actionRef={actionRef} record={record}/>,
                    ],
                },
            ]}
            actionRef={actionRef}
            params={{"dictParentId": props.dictTypeId}}
            request={async (params) => {
                if (props.dictTypeId !== '' && props.dictTypeId !== undefined) {
                    const states = await getSysDictListByDictParentId(params);
                    setTableListDataSource(states.data)
                    return {
                        data: states.data,
                        success: states.success,
                    };
                }
                return {
                    data: undefined,
                    success: undefined,
                };
            }}
            pagination={{defaultPageSize: 9}}
            dataSource={tableListDataSource}
            rowKey={(record) => record.dictId}
            toolbar={{
                actions: [
                    <AddDictModalForm actionRef={actionRef} dictTypeId={props.dictTypeId}/>,
                ],
            }}
        />
    );
};
