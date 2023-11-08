import {Button, message, Space} from 'antd';
import React from "react";
import PopConfirm from "antd/es/popconfirm";
import {DeleteOutlined} from "@ant-design/icons";
import {deleteSysMenuButton} from '../api/MenuButtonApi';


export default (props: { actionRef: any, buttonId: any }) => {
    if (!props.buttonId) {
        return null;
    }
    return (
        <Space size={16}>
            <PopConfirm
                title="是否删除所选菜单按钮数据？"
                okText="是"
                cancelText="否"
                placement='leftTop'
                onConfirm={
                    async () => {
                        let res = await deleteSysMenuButton({"buttonId": props.buttonId});
                        if (res.data) {
                            message.success("删除成功");
                            props.actionRef.current?.reload()
                            return true;
                        }
                        message.error("删除失败,请重试");
                        return false;
                    }
                }
            >
                <Button ghost type="primary" danger icon={<DeleteOutlined/>}></Button>
            </PopConfirm>
        </Space>
    );
};
