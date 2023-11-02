import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import {Button, Divider, message, Tag} from 'antd';
import React, {} from "react";
import {EditOutlined} from "@ant-design/icons";
import {selectModelDetailsById, updateModelById} from "@/pages/workflow/model/api/modelApi";

export default (props: { actionRef: any, modelId: any }) => {

  return (
    <ModalForm<any>
      {...{
        labelCol: {span: 5},
        wrapperCol: {span: 14},
      }}
      layout={"horizontal"}
      trigger={<Button ghost size={"small"} style={{marginRight: '10px'}} type="primary"
                       icon={<EditOutlined/>}>更新</Button>}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
      }}
      params={{modelId: props.modelId}}
      request={async (params) => {
        let newVar = await selectModelDetailsById(params);
        return newVar.data;
      }}
      onFinish={async (values) => {
        let newVar = await updateModelById(values);
        if (newVar.success) {
          message.success('更新流程模型成功');
          props.actionRef.current?.reload()
          return true;
        } else {
          message.error('更新流程模型失败请重试');
          return false;
        }
      }}
    >

      <Divider orientation="left">更新流程模型</Divider>
      <ProFormText disabled width="xl" name="modelId" label="流程模型ID_" rules={[{required: true}]}/>
      <ProFormSelect width="xl" name="tenantId" label="所属租户"
                     tooltip="租户设置可根据自身业务数据或者架构进行调整，此处只做参考。" rules={[{required: true}]}
                     initialValue={"1"}
                     options={[
                       {value: '1', label: <Tag color='blue'> 人事公司 </Tag>},
                       {value: '2', label: <Tag color='green'> 财务公司 </Tag>},
                     ]}
      />
      <ProFormSelect width="xl" name="category" label="流程模型类型"
                     tooltip="此类型可用于关联相关业务类型，此处只做参考。"
                     initialValue={"1"}
                     rules={[{required: true}]}
                     options={[
                       {value: '1', label: <Tag color='blue'> 请假类 </Tag>},
                       {value: '2', label: <Tag color='green'> 财务类 </Tag>},
                     ]}
      />
      <ProFormText width="xl" name="modelName" label="流程模型名称" tooltip="流程模型名称不宜过长,尽量避免使用特殊字符。"
                   rules={[{required: true}]}/>
      <ProFormText width="xl" name="modelKey" label="流程模型KEY" tooltip="流程模型KEY不宜过长,请使用字母+数字组合。"
                   rules={[{required: true}]}/>
      <ProFormText width="xl" name="modelDesc" label="流程模型描述" tooltip="描述将会在保存后记录至metaInfo中"
                   rules={[{required: true}]}/>

      <ProFormText width="xl" name="version" label="版本号" disabled rules={[{required: true}]}/>

      <ProFormTextArea width="xl" name="metaInfo" label="META_INFO_"
                       tooltip="此处用于扩展自身的业务数据，请不要使用name和description作为key，会被上面的数据覆盖，请填写JSON格式，系统已给出默认参考。"
      />
    </ModalForm>
  );
};
