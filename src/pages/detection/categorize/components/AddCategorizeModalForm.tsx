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
import {addDetectionCategorize, getDetectionCategorizeList,} from "@/pages/detection/categorize/api/Categorize";

export default (props: { actionRef: React.MutableRefObject<ActionType | undefined> }) => {
  return (
    <ModalForm
      {...{
        labelCol: {span: 5},
        wrapperCol: {span: 14},
      }}
      layout={"horizontal"}
      title="新建试验检测分类"
      trigger={
        <Button type="primary"><PlusOutlined/>新建试验检测分类</Button>
      }
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
      }}
      onFinish={async (values) => {
        values.categorizeParent = values.categorizeParent.toString()
        let newVar = await addDetectionCategorize(values);
        if (newVar.data) {
          message.success('新建试验检测分类成功');
          props.actionRef.current?.reload()
          return true;
        } else {
          message.error('新建试验检测分类失败，请重试');
          return false;
        }
      }}
    >
      <br/>
      <ProFormSelect width="xl" name="categorizeParent" label="所属分类"
                     tooltip={"在已创建的试验检测分类中选择单个或多个"}
                     fieldProps={{
                       //设置为支持多选
                       mode: 'multiple',
                     }}
                     request={async () => {
                       const newVar = await getDetectionCategorizeList({});
                       return newVar.data;
                     }}
      />
      <ProFormText width="xl" name="categorizeCode" label="分类代码" rules={[{required: true}]}/>
      <ProFormText width="xl" name="categorizeName" label="分类名称" rules={[{required: true}]}/>
      <ProFormText width="xl" name="categorizeTranslate" label="分类英文"/>
      <ProFormDigit width="xl" name="categorizeSort" label="排序" initialValue={99} rules={[{required: true}]}/>
      <ProFormTextArea width="xl" name="remark" label="备注"/>
    </ModalForm>
  );
};
