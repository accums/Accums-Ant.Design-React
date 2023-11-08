import {PlusOutlined} from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import {Button, message} from 'antd';
import React from "react";
import {getDetectionCategorizeList} from "@/pages/detection/categorize/api/Categorize";
import {addDetectionParameter} from "@/pages/detection/parameter/api/ParameterApi";

export default (props: { actionRef: React.MutableRefObject<ActionType | undefined> }) => {
  return (
    <ModalForm
      {...{
        labelCol: {span: 5},
        wrapperCol: {span: 14},
      }}
      layout={"horizontal"}
      title="新建委托合同"
      trigger={
        <Button type="primary"><PlusOutlined/>新建委托合同</Button>
      }
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: false,
      }}
      onFinish={async (values) => {
        values.categorizeParent = values.categorizeParent.toString()
        let newVar = await addDetectionParameter(values);
        if (newVar.data) {
          message.success('新建委托合同成功');
          props.actionRef.current?.reload()
          return true;
        } else {
          message.error('新建委托合同失败，请重试');
          return false;
        }
      }}
    >
      <br/>
      <ProFormSelect width="xl" name="categorizeParent" label="所属分类"
                     tooltip={"在已创建的试验检测分类中选择单个"}
                     fieldProps={{
                       //设置为支持多选
                       //mode: 'multiple',
                       showSearch: true,
                     }}
                     request={async () => {
                       const newVar = await getDetectionCategorizeList({});
                       return newVar.data;
                     }}
      />
      <ProFormText width="xl" name="parameterCode" label="参数代码" rules={[{required: true}]}/>
      <ProFormText width="xl" name="parameterName" label="参数名称" rules={[{required: true}]}/>
      <ProFormDigit width="xl" name="parameterSort" label="排序" initialValue={99} rules={[{required: true}]}/>
      <ProFormTextArea width="xl" name="remark" label="备注"/>
    </ModalForm>
  );
};
