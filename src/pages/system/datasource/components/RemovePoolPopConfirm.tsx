import {Button, message, Space} from 'antd';
import React from "react";
import PopConfirm from "antd/es/popconfirm";
import {FullscreenOutlined} from "@ant-design/icons";
import {removeDataSourcePool} from "@/pages/system/datasource/api/DataSourcePoolApi";


export default (props: any) => {

    if (props.record.dataSourcePoolName === "master") {
        return (<Button type={"primary"} size={"small"} >主数据源不可移除</Button>);
    }

    return (
        <Space size={16}>
            <PopConfirm
                title="是否将该数据源移除连接池？"
                okText="是"
                cancelText="否"
                placement='leftTop'
                onConfirm={
                    async () => {
                        let res = await removeDataSourcePool(props.record);
                        if (res.data) {
                            message.success("移除成功");
                            props.actionRef.current?.reload()
                            return true;
                        }
                        message.error("移除失败,请重试");
                        return false;
                    }
                }
            >
                <Button type="primary" size={"small"} icon={<FullscreenOutlined/>}>移除</Button>
            </PopConfirm>
        </Space>
    );
};
