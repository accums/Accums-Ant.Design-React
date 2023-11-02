import {Button, message, Space} from 'antd';
import React from "react";
import PopConfirm from "antd/es/popconfirm";
import {deleteSysDictType} from "@/pages/system/dict/api/DictTypeApi";
import {DeleteOutlined} from "@ant-design/icons";


const DeleteDictTypeAndDictPopConfirm: React.FC<any> = ({actionRef, dictTypeId}) => {
    return (
        <Space size={16}>
            <PopConfirm
                title={"是否删除？该字典类型下的数据将一起被删除"}
                okText="是"
                cancelText="否"
                placement='rightTop'
                onConfirm={
                    async () => {
                        let res = await deleteSysDictType({dictTypeId:dictTypeId});
                        if (res.data) {
                            message.success("删除成功");
                            actionRef.current?.reload()
                            return true
                        }
                        message.error("删除失败,请重试");
                        return false;
                    }
                }
            >
                <Button type="primary" danger icon={<DeleteOutlined/>}></Button>
            </PopConfirm>
        </Space>
    );
};
export default DeleteDictTypeAndDictPopConfirm;
