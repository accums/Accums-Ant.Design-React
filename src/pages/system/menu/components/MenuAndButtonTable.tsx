import {ModalForm, ProTable} from '@ant-design/pro-components';
import {Table, Tag} from "antd";
import React, {useState} from 'react';
import {getSysMenuAndButtonList} from "@/pages/system/menu/api/MenuApi";

export default (param: { roleId: any }) => {

    const [selectedRow, setSelectedRow] = useState<any>([]);

    return (
        <ModalForm trigger={<a>设置菜单</a>}>
            <ProTable<any>
                headerTitle={"设置菜单"}
                columns={[
                    {
                        title: "菜单",
                        dataIndex: 'menuName',
                        width: 100,
                    },
                    {
                        title: "类型",
                        dataIndex: 'type',
                        width: 100,
                        valueEnum: {
                            1: <Tag color="processing">菜单</Tag>,
                            2: <Tag color="green">按钮</Tag>
                        },
                    },
                ]}
                expandable={{
                    expandRowByClick: true,
                }}
                pagination={false}
                rowSelection={{
                    selectedRowKeys: selectedRow,
                    selections: [
                        Table.SELECTION_ALL,
                        Table.SELECTION_INVERT,
                        Table.SELECTION_NONE,
                    ],
                    onChange: (record, selected) => {
                        for (let item of selected) {
                            if (!record.includes(item.menuId)) {
                                record.push(item.menuId)
                            }
                            if (!record.includes(item.menuParentId)) {
                                record.push(item.menuParentId)
                            }
                        }
                        setSelectedRow(record)
                    },
                }}
                tableAlertOptionRender={false}
                tableAlertRender={false}
                search={false}
                request={
                    async (params) => {
                        const result = await getSysMenuAndButtonList(params);
                        return {
                            data: result.data,
                            success: result.success,
                        };
                    }
                }
                rowKey={(record) => record.menuId}
            />
        </ModalForm>
    );
};

