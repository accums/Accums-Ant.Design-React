
import {message, Space,} from 'antd';
import React, {} from "react";
import PopConfirm from "antd/es/popconfirm";
import {deleteSysPosition} from "@/pages/system/position/api/PositionApi";

export default (props: { actionRef: any, positionId: any}) => {

    return (
        <Space size={16}>
            <PopConfirm
                title="是否删除所选数据？"
                okText="是"
                cancelText="否"
                placement='rightTop'
                onConfirm={
                    async () => {
                        let res = await deleteSysPosition({positionId: props.positionId});
                        if (res.data) {
                            message.success("删除职位数据成功！");
                            props.actionRef.current?.reload()
                            return true;
                        }
                        message.error("删除职位数据失败,请重试");
                        return false;
                    }
                }
            >
                <a>删除</a>
            </PopConfirm>
        </Space>
    );
};
