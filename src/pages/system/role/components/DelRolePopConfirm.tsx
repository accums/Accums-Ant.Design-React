import {message, Space} from 'antd';
import React from "react";
import PopConfirm from "antd/es/popconfirm";
import {deleteSysRole} from "@/pages/system/role/api/RoleApi";

export default (props: { actionRef: any, roleId: (string | number)}) => {
    return (
        <Space size={16}>
            <PopConfirm
                title="是否删除所选角色？其分配的菜单数据将一并删除且不可恢复"
                okText="是"
                cancelText="否"
                placement='right'
                onConfirm={
                    async () => {
                        let res = await deleteSysRole({"roleId":props.roleId});
                        if (res.data) {
                            message.success("删除成功");
                            props.actionRef.current?.reload()
                            return true;
                        }
                        message.error("删除失败,请失败")
                        return false;
                    }
                }
            >
                <a>删除</a>
            </PopConfirm>
        </Space>
    );
};

