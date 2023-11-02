import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import {Button, Divider, message, Tag} from 'antd';
import React, {} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {newModel} from "@/pages/workflow/model/api/modelApi";

export default (props: { actionRef: any }) => {

  return (
    <ModalForm<any>
      {...{
        labelCol: {span: 5},
        wrapperCol: {span: 14},
      }}
      layout={"horizontal"}
      trigger={<Button type="primary" icon={<PlusOutlined/>}>新建模型</Button>}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
      }}
      onFinish={async (values) => {
        let newVar = await newModel(values);
        if (newVar.success) {
          message.success('新建流程模型成功');
          props.actionRef.current?.reload()
          return true;
        } else {
          message.error('新建流程模型失败，请重试');
          return false;
        }
      }}
    >

      <Divider orientation="left">新建模型</Divider>
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
                     rules={[{required: true}]}
                     initialValue={"1"}
                     options={[
                       {value: '1', label: <Tag color='blue'> 请假类 </Tag>},
                       {value: '2', label: <Tag color='green'> 财务类 </Tag>},
                     ]}
      />
      <ProFormText width="xl" name="modelName"
                   label="流程模型名称"
                   tooltip="流程模型名称不宜过长,尽量避免使用特殊字符。"
                   initialValue={"员工请假流程"}
                   rules={[{required: true}]}
      />
      <ProFormText width="xl" name="modelKey"
                   label="流程模型KEY"
                   tooltip="流程模型KEY不宜过长,请使用字母+数字组合。"
                   rules={[{required: true}]}
      />
      <ProFormText width="xl"
                   name="modelDesc"
                   label="流程模型描述"
                   tooltip="描述将会在保存后记录至metaInfo中"
                   initialValue={"普通员工的简单请求流程"}
                   rules={[{required: true}]}
      />

      <ProFormTextArea width="xl" name="metaInfo" label="META_INFO_"
                       tooltip="此处用于扩展自身的业务数据，请不要使用name和description作为key，会被上面的数据覆盖，请填写JSON格式，系统已给出默认参考。"
                       initialValue={"{\n" +
                         "    \"Email\":\"accums@pm.me\",\n" +
                         "    \"Author\":\"WH\"\n" +
                         "}"}
      />
    </ModalForm>
  );
};
