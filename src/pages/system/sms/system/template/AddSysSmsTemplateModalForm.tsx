import {PlusOutlined} from '@ant-design/icons';
import {
    ActionType, ModalForm,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-components';
import {Button, message} from 'antd';
import React from "react";
import {addSysSmsTemplate} from "@/pages/system/sms/system/api/SmsTemplateApi";

export default (props: { actionRef: React.MutableRefObject<ActionType | undefined> }) => {
    return (
        <ModalForm
            {...{
                labelCol: {span: 5},
                wrapperCol: {span: 14},
            }}
            layout={"horizontal"}
            title="新建短信模板"
            trigger={<Button type="primary" icon={<PlusOutlined/>}>新建模板</Button>}
            autoFocusFirstInput
            modalProps={{
                destroyOnClose: true,
            }}
            onFinish={async (values) => {
                let newVar = await addSysSmsTemplate(values);
                if (newVar.data) {
                    message.success('短信模板添加成功');
                    props.actionRef.current?.reload()
                    return true;
                } else {
                    message.error('短信模板添加失败，请重试');
                    return false;
                }
            }}
        >
            <ProFormText width="xl" name="smsTemplateName" label="模板名称" rules={[{required: true}]}/>
            <ProFormText width="xl" name="smsTemplateType" label="模板类型" rules={[{required: true}]}/>
            <ProFormText width="xl" name="smsTemplateCode" label="模板编码" rules={[{required: true}]}/>
            <ProFormTextArea width="xl" name="smsTemplateContent" label="模板内容" rules={[{required: true}]}/>
            <ProFormTextArea width="xl" name="remark" label="备注"/>
        </ModalForm>
    );
};
