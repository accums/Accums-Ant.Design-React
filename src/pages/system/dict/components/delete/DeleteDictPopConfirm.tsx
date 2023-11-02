import {message, Space} from 'antd';
import React from "react";
import PopConfirm from "antd/es/popconfirm";
import {deleteSysDict} from "@/pages/system/dict/api/DictApi";


const DeleteDictPopConfirm: React.FC<any> = ({actionRef, record}) => {
    return (
        <Space size={16}>
            <PopConfirm
                title="是否删除所选字典数据？"
                okText="是"
                cancelText="否"
                placement='leftTop'
                onConfirm={
                    async () => {
                        let res = await deleteSysDict(record);
                        if (res.data) {
                            message.success("删除成功");
                            actionRef.current?.reload()
                            return true;
                        }
                        message.error("删除失败,请重试");
                        return false;
                    }
                }
            >
                <a>删除</a>
            </PopConfirm>
        </Space>
    );
};
export default DeleteDictPopConfirm;
