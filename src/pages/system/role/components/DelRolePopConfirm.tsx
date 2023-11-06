import {Button, message, Space} from 'antd';
import React from "react";
import PopConfirm from "antd/es/popconfirm";
import {deleteSysRole} from "@/pages/system/role/api/RoleApi";
import {DeleteOutlined} from "@ant-design/icons";

export default (props: { actionRef: any, roleId: (string | number)}) => {
    return (
        <Space size={16}>
            <PopConfirm
                title="是否删除所选角色及配置的菜单数据？删除后不可恢复，请谨慎操作"
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
              {<Button ghost danger type="primary" style={{marginRight: '10px'}}
                               size={"small"} icon={<DeleteOutlined/>}>删除</Button>}
            </PopConfirm>
        </Space>
    );
};

