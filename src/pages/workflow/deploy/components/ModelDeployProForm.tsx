import {ProForm, ProFormSelect, ProFormText} from '@ant-design/pro-components';
import React, {useRef} from "react";
import {ProFormInstance} from "@ant-design/pro-form/lib";
import {Divider, message, Tag} from 'antd';
import {deployWayBpmnModel} from "@/pages/workflow/deploy/api/deployApi";
import {selectActReModelResultList} from "@/pages/workflow/model/api/modelApi";


export default () => {

  const formRef = useRef<ProFormInstance>();

  return (
    <ProForm<any>
      formRef={formRef}
      layout={"vertical"}
      onFinish={async (values) => {
        let newVar = await deployWayBpmnModel(values);
        if (newVar.success) {
          message.success('部署流程模型成功');
          return true;
        } else {
          message.error('部署流程模型失败，请重试');
          return false;
        }
      }}
    >

      <ProFormSelect
        name="modelId"
        label="流程模型"
        placeholder="请选择流程模型"
        rules={[{required: true, message: '流程模型一定要选哦~!'}]}
        fieldProps={{
          onSelect: (value, option) => {
            formRef.current?.setFieldValue("tenantId", option.tenantId);
            formRef.current?.setFieldValue("modelName", option.modelName);
            formRef.current?.setFieldValue("category", option.category);
            formRef.current?.setFieldValue("modelDesc", option.modelDesc);
            formRef.current?.setFieldValue("modelKey", option.modelKey);
          },
          onClear: () => {
            formRef.current?.resetFields()
          }
        }}
        request={async (params) => {
          let newVar = await selectActReModelResultList(params);
          return newVar.data;
        }}
      />
      <ProFormSelect
        width="xl"
        name="tenantId"
        label="所属租户"
        tooltip="租户设置可根据自身业务数据或者架构进行调整，此处只做参考，默认使用流程模型租户"
        options={[
          {value: '1', label: <Tag color='blue'> 人事公司 </Tag>},
          {value: '2', label: <Tag color='green'> 财务公司 </Tag>},
        ]}
        rules={[{required: true, message: '所属租户一定要选哦~!'}]}
      />
      <ProFormSelect
        width="xl"
        name="category"
        label="流程类型"
        tooltip="此类型可用于关联相关业务类型，此处只做参考，默认使用流程模型类型"
        options={[
          {value: '1', label: <Tag color='blue'> 请假类 </Tag>},
          {value: '2', label: <Tag color='green'> 财务类 </Tag>},
        ]}
        rules={[{required: true, message: '流程类型一定要选哦~!'}]}
      />
      <ProFormText
        width="xl"
        name="modelKey"
        label="流程定义KEY"
        disabled={true}
        tooltip="作为模型与部署数据相关联的属性值，禁止自定义"
        rules={[{required: true, message: '流程定义KEY一定要写哦~!'}]}
      />
      <ProFormText
        width="xl"
        name="modelName"
        label="流程定义名称"
        tooltip="部署后的流程定义名称，默认使用流程模型名称"
        placeholder="请输入流程定义名称"
        rules={[{required: true, message: '流程定义名称一定要写哦~!'}]}
      />
      <ProFormText
        width="xl"
        name="modelDesc"
        label="流程定义描述"
        tooltip="部署后的流程定义描述，默认使用流程模型描述"
        placeholder="请输入流程定义描述"
        rules={[{required: true, message: '流程定义描述一定要选哦~!'}]}
      />
      <Divider plain
               orientation="left">
        提交前请确保所选模型对应的流程图中，至少存在一个【开始节点】【用户任务节点】【结束节点】
      </Divider>

    </ProForm>
  );
};
