import {PlusOutlined} from '@ant-design/icons';
import {
  ActionType, ModalForm, ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import {Alert, Button, message} from 'antd';
import React from "react";
import {AddSmsTemplate} from "@/pages/system/sms/alibaba/api/AlibabaSmsApi";

export default (props: { actionRef: React.MutableRefObject<ActionType | undefined> }) => {
  return (
    <ModalForm
      {...{
        labelCol: {span: 5},
        wrapperCol: {span: 14},
      }}
      layout={"horizontal"}
      title="申请阿里云短信服务模板"
      trigger={<Button type="primary" icon={<PlusOutlined/>}>申请模板</Button>}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
      }}
      onFinish={async (values) => {
        let newVar = await AddSmsTemplate(values);
        if (newVar.data.code === 'OK') {
          message.success('申请阿里云短信服务模板成功 短信模板Code【' + newVar.data.templateCode + '】');
          props.actionRef.current?.reload()
          return true;
        } else {
          message.error('申请阿里云短信服务模板失败，请重试');
          return false;
        }
      }}
    >
      <ProFormSelect width="xl" name="templateType" label="短信类型"
                     tooltip={'说明 推广短信和国际/港澳台消息仅支持企业用户。'} rules={[{required: true}]}
                     request={async () => [
                       {label: '验证码', value: '0'},
                       {label: '短信通知', value: '1'},
                       {label: '推广短信', value: '2'},
                       {label: '国际/港澳台消息', value: '3'},
                     ]}
      />
      <ProFormText width="xl" name="templateName" label="模板名称" tooltip={'长度不超过30个字符'}
                   rules={[{required: true}]}/>
      <ProFormTextArea width="xl" name="templateContent" label="模板内容"
                       tooltip={'长度不超过500个字符。更多规范，请参见模板内容规范。'} rules={[{required: true}]}/>
      <ProFormTextArea width="xl" name="remark" label="申请说明"
                       tooltip={'短信模板申请说明 模板审核的参考信息之一。长度不超过100个字符。'}/>
      <Alert message={<a
        target={'_blank'}
        href={'https://help.aliyun.com/document_detail/108253.html'} rel="noreferrer">
        阿里云短信模板内容规范：https://help.aliyun.com/document_detail/108253.html</a>}></Alert>
    </ModalForm>
  );
};
