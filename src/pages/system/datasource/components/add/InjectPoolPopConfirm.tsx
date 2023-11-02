import { message, Space} from 'antd';
import React from "react";
import PopConfirm from "antd/es/popconfirm";
import {addDataSourcePool} from "@/pages/system/datasource/api/DataSourcePoolApi";

export default (props: any) => {
    return (
        <Space size={16}>
            <PopConfirm
                title="是否将该数据源注入连接池？"
                okText="是"
                cancelText="否"
                placement='leftTop'
                onConfirm={
                    async () => {
                        let res = await addDataSourcePool(props.record);
                        if (res.data) {
                            message.success("注入成功");
                            props.actionRef.current?.reload()
                            return true;
                        }
                        message.error("注入失败,请重试");
                        return false;
                    }
                }
            >
                <a>注入</a>
            </PopConfirm>
        </Space>
    );
};
