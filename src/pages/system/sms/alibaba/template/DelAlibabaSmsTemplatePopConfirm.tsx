import {Button, message, Space,} from 'antd';
import React, {} from "react";
import PopConfirm from "antd/es/popconfirm";
import {DeleteOutlined} from "@ant-design/icons";
import {DeleteAlibabaSmsTemplate} from "@/pages/system/sms/alibaba/api/AlibabaSmsApi";

export default (props: { actionRef: any, templateCode: any, onCleanSelected: any }) => {

    return (
        <Space size={16}>
            <PopConfirm
                title={"删除短信模板后不可恢复 请谨慎操作。"}
                okText="是"
                cancelText="否"
                placement='rightTop'
                onConfirm={
                    async () => {
                        let result = await DeleteAlibabaSmsTemplate({"templateCode": props.templateCode});
                        if (result.success && result.data) {
                            props.onCleanSelected();
                            props.actionRef.current?.reload()
                            message.success("删除短信模板数据成功！");
                            return true;
                        }
                        message.error("删除短信模板失败,请重试");
                        return false;
                    }
                }
            >
                <Button danger size={"small"} icon={<DeleteOutlined/>}>删除</Button>
            </PopConfirm>
        </Space>
    );
};
