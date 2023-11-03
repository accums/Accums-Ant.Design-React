
import {Button, message, Space,} from 'antd';
import React, {} from "react";
import PopConfirm from "antd/es/popconfirm";
import {deleteSysPosition} from "@/pages/system/position/api/PositionApi";
import {DeleteOutlined} from "@ant-design/icons";

export default (props: { actionRef: any, positionId: any}) => {

    return (
        <Space size={16}>
            <PopConfirm
                title="是否删除所选职位数据？删除后不可恢复，请谨慎操作"
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
              <Button ghost danger type="primary" style={{marginRight: '10px'}}
                      size={"small"} icon={<DeleteOutlined/>}>删除</Button>
            </PopConfirm>
        </Space>
    );
};
