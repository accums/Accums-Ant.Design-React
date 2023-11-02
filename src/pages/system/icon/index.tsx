import {ActionType, PageContainer} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import React from 'react';
import {Tag} from 'antd';
import {getAntDesignIconListPage} from "@/pages/system/icon/api/IconApi";
import {getSysDictListByDictTypeCode} from "@/pages/system/dict/api/DictApi";
import AddIconModalForm from './components/AddIconModalForm';
import { Icon } from './api/Icon';

export default () => {
    const actionRef = React.useRef<ActionType>();
    return (
        <PageContainer>
            <ProTable<any>
                columns={[
                    {
                        title: '',
                        dataIndex: 'iconId',
                        valueType: "indexBorder",
                        width: 30,
                    },
                    {
                        title: '图标名称',
                        dataIndex: 'iconName',
                        align: "center",
                        ellipsis:true,
                        copyable:true,
                        hideInSearch: true,
                        width: 200,
                    },
                    {
                        title: '图标样式',
                        align: "center",
                        hideInSearch: true,
                        width: 100,
                        render: (text, record) => {
                            return (
                                <>
                                    <Icon icon={record.iconName}></Icon>
                                </>
                            )
                        },
                    },
                    {
                        title: '图标大类',
                        dataIndex: 'iconLargeCategory',
                        align: "center",
                        width: 100,
                        valueType: 'select',
                        request: async () => {
                            const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "iconLargeCategory"});
                            newVar.data.forEach((item: any) => {
                                item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                            })
                            return newVar.data
                        }
                    },
                    {
                        title: '图标小类',
                        dataIndex: 'iconSubclass',
                        align: 'center',
                        width: 100,
                        valueType: 'select',
                        request: async () => {
                            const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "iconSubclass"});
                            newVar.data.forEach((item: any) => {
                                item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                            })
                            return newVar.data
                        }
                    },
                    {
                        title: '备注',
                        dataIndex: 'remark',
                        hideInSearch: true,
                        ellipsis: true,
                        width: 100,
                    },
                ]}
                pagination={{
                    defaultPageSize:10,
                    showSizeChanger:true
                }}
                actionRef={actionRef}
                request={
                    async (params) => {
                        const result = await getAntDesignIconListPage(params);
                        return {
                            data: result.data.rows,
                            success: result.success,
                            total: result.data.totalRows,
                        };
                    }
                }
                rowKey={(record) => record.positionId}
                toolBarRender={() => [
                    <AddIconModalForm actionRef={actionRef}/>
                ]}
            />
        </PageContainer>
    );
};
