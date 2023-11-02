import {
    ModalForm,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-components';
import {Button, message} from 'antd';
import React from "react";
import {EditOutlined} from "@ant-design/icons";
import {editSmsTemplate, getSysSmsTemplateById} from "@/pages/system/sms/system/api/SmsTemplateApi";

export default (props: { actionRef: any, smsTemplateId: any }) => {
    return (
        <ModalForm
            {...{
                labelCol: {span: 5},
                wrapperCol: {span: 14},
            }}
            layout={"horizontal"}
            title="编辑"
            trigger={<Button type="primary" style={{marginRight: '10px'}} size={"small"}
                             icon={<EditOutlined/>}>编辑</Button>}
            autoFocusFirstInput
            modalProps={{
                destroyOnClose: true,
            }}
            params={{smsTemplateId: props.smsTemplateId}}
            request={async (params) => {
                const newVar = await getSysSmsTemplateById(params);
                return newVar.data;
            }}
            onFinish={async (values) => {
                let newVar = await editSmsTemplate(values);
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

            <ProFormText width="xl" hidden name="version" label="乐观锁" rules={[{required: true}]}/>
            <ProFormText width="xl" hidden name="smsTemplateId" label="模板ID" rules={[{required: true}]}/>
            <ProFormText width="xl" name="smsTemplateName" label="模板名称" rules={[{required: true}]}/>
            <ProFormText width="xl" name="smsTemplateType" label="模板类型" rules={[{required: true}]}/>
            <ProFormText width="xl" name="smsTemplateCode" label="模板编码" rules={[{required: true}]}/>
            <ProFormTextArea width="xl" name="smsTemplateContent" label="模板内容" rules={[{required: true}]}/>
            <ProFormTextArea width="xl" name="remark" label="备注"/>
        </ModalForm>
    );
};
