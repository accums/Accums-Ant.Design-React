import {Button, message, Space,} from 'antd';
import React, {} from "react";
import PopConfirm from "antd/es/popconfirm";
import {DeleteOutlined} from "@ant-design/icons";
import { deleteSmsTemplate } from '../api/SmsTemplateApi';

export default (props: { actionRef: any, smsTemplateId: any, onCleanSelected: any }) => {

    return (
        <Space size={16}>
            <PopConfirm
                title="是否删除所选数据"
                okText="是"
                cancelText="否"
                placement='rightTop'
                onConfirm={
                    async () => {
                        let result = await deleteSmsTemplate({"smsTemplateId": props.smsTemplateId});
                        if (result.success && result.data) {
                            props.onCleanSelected();
                            message.success("删除短信模板数据成功！");
                            props.actionRef.current?.reload()
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
