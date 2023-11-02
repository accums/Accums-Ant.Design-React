import {ActionType, ProTable} from '@ant-design/pro-components';
import React, {useEffect} from 'react';
import AddDictTypeModalForm from "@/pages/system/dict/components/add/AddDictTypeModalForm";
import DeleteDictTypeAndDictPopConfirm from '../delete/DeleteDictTypeAndDictPopConfirm';
import EditDictType from "@/pages/system/dict/components/edit/EditDictType";
import {getSysDictListByDictTypeCode} from "@/pages/system/dict/api/DictApi";
import {Switch, Tag} from "antd";
import {updateSysDictType} from "@/pages/system/dict/api/DictTypeApi";

const DictTypeTable: React.FC<any> = (props) => {
    const {dictTypeId} = props;
    const {setDictTypeId} = props;
    const {dictTypeTableSelectedRowKeys, setDictTypeTableSelectedRowKeys} = props;
    const actionRef = React.useRef<ActionType>();

    useEffect(() => {
        if (dictTypeId) {
            props.setDictTypeTableSelectedRowKeys([dictTypeId])
        }
    }, [dictTypeId]);

    return (
        <ProTable
            columns={[
                {
                    title: '类型编码 ',
                    dataIndex: 'dictTypeCode',
                    width: 100,
                    copyable: true,
                    ellipsis: true,
                    align: "center",
                },
                {
                    title: '类型名称 ',
                    dataIndex: 'dictTypeName',
                    ellipsis: true,
                    width: 100,
                    align: "center",
                },
                {
                    title: '字典类型',
                    dataIndex: 'dataType',
                    width: 100,
                    align: "center",
                    valueType: 'select',
                    hideInSearch: true,
                    request: async () => {
                        const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "dataType"});
                        newVar.data.forEach((item: any) => {
                            item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                        })
                        return newVar.data
                    }
                },
                {
                    title: '排序',
                    dataIndex: 'dictTypeSort',
                    width: 100,
                    hideInSearch: true,
                    align: "center",
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
                    hideInSearch: true,
                    width: 100,
                    align: "center",
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
                                        let newVar = await updateSysDictType(record);
                                        if (newVar.data) {
                                            actionRef.current?.reload()
                                        }
                                    }}
                                />
                            </>
                        )
                    },
                },
            ]}
            request={props.dataSource}
            actionRef={actionRef}
            rowKey={(record) => record.dictTypeId}
            onRow={(record) => {
                return {
                    onClick: () => {
                        setDictTypeId(record.dictTypeId)
                        setDictTypeTableSelectedRowKeys([record.dictTypeId])
                    },
                };
            }}
            rowSelection={{
                selectedRowKeys: dictTypeTableSelectedRowKeys,
                type: "radio",
                onChange: function (selectedRowKeys, selectedRows) {
                    if (selectedRows[0].dictTypeId) {
                        setDictTypeId(selectedRows[0].dictTypeId)
                        setDictTypeTableSelectedRowKeys(selectedRowKeys)
                        return;
                    }
                }
            }}
            tableAlertRender={false}
            tableAlertOptionRender={false}
            toolbar={{
                actions: [
                    <AddDictTypeModalForm actionRef={actionRef}/>,
                    <EditDictType actionRef={actionRef} dictTypeId={dictTypeId}/>,
                    <DeleteDictTypeAndDictPopConfirm actionRef={actionRef} dictTypeId={dictTypeId}/>,
                ],
            }}
            pagination={{defaultPageSize: 9}}
        />
    );
};
export default DictTypeTable;
