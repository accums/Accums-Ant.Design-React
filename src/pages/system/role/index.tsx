import type {ActionType} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import React from 'react';
import {Switch, Tag} from 'antd';
import {getSysRoleListPage, updateSysRoleStatus} from './api/RoleApi';
import AddRoleDrawerForm from './components/AddRoleModalForm';
import EditRoleModalForm from './components/EditRoleModalForm';
import DelRolePopConfirm from './components/DelRolePopConfirm';
import {getSysDictListByDictTypeCode} from "@/pages/system/dict/api/DictApi";
import MenuAndButtonTree from '../menu/components/MenuAndButtonTree';

export default () => {
    const actionRef = React.useRef<ActionType>();
    return (
        <ProTable<any>
            columns={[
                {
                    dataIndex: 'roleId',
                    valueType: "indexBorder",
                    width: 30
                },
                {
                    title: '角色名称',
                    dataIndex: 'roleName',
                    align: "center",
                    width: 100
                },
                {
                    title: '数据范围',
                    dataIndex: 'dataScopeType',
                    valueType: 'select',
                    align: "center",
                    hideInSearch: true,
                    width: 100,
                    request: async () => {
                        const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "dataScopeType"});
                        newVar.data.forEach((item: any) => {
                            item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                        })
                        return newVar.data
                    }

                },
                {
                    title: '角色类型',
                    dataIndex: 'dataType',
                    valueType: 'select',
                    align: "center",
                    hideInSearch: true,
                    width: 100,
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
                    dataIndex: 'roleSort',
                    hideInSearch: true,
                    width: 100,
                    align: "center"
                },
                {
                    title: '启用',
                    dataIndex: 'status',
                    valueType: "switch",
                    hideInSearch: true,
                    align: "center",
                    width: 100,
                    render: (text, record) => {
                        return (
                            <>
                                <Switch
                                    size={"small"}
                                    key={`${record.createTime}`}
                                    checked={record.status == "0"}
                                    onChange={async (value) => {
                                        if (value) {
                                            record.status = "0"
                                        } else {
                                            record.status = "1"
                                        }
                                        let newVar = await updateSysRoleStatus(record)
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
                    title: '备注',
                    dataIndex: 'remark',
                    hideInSearch: true,
                    width: 100,
                    ellipsis: true
                },
                {
                    title: '操作',
                    width: 200,
                    valueType: 'option',
                    align: "center",
                    render: (text, record) => [
                        <EditRoleModalForm actionRef={actionRef} roleId={record.roleId}/>,
                        <DelRolePopConfirm actionRef={actionRef} roleId={record.roleId}/>,
                        <MenuAndButtonTree role={record}  />
                    ],
                },
            ]}
            actionRef={actionRef}
            request={
                async (params) => {
                    const result = await getSysRoleListPage(params);
                    return {
                        data: result.data.rows,
                        success: result.success,
                        total: result.data.totalRows,
                    };
                }
            }
            rowKey={(record) => record.roleId}
            toolBarRender={() => [
                <AddRoleDrawerForm actionRef={actionRef}/>,
            ]}
        />
    );
};
