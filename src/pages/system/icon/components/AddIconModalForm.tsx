import {
  ActionType, ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import {Alert, Button, message, Tag} from 'antd';
import React, {} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {getSysDictListByDictTypeCode} from "@/pages/system/dict/api/DictApi";
import {saveOrUpdateAntDesignIcon} from "@/pages/system/icon/api/IconApi";

export default (props: { actionRef: React.MutableRefObject<ActionType | undefined> }) => {

  return (
    <ModalForm<any>
      {...{
        labelCol: {span: 5},
        wrapperCol: {span: 14},
      }}
      layout={"horizontal"}
      title="新建图标"
      trigger={<Button type="primary" icon={<PlusOutlined/>}>新建图标</Button>}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
      }}
      onFinish={async (values) => {
        let newVar = await saveOrUpdateAntDesignIcon(values);
        if (newVar.data) {
          message.success('新增成功');
          props.actionRef.current?.reload()
          return true;
        } else {
          message.error('新增失败，请重试');
          return false;
        }
      }}
    >
      <Alert message="图标参考：https://ant.design/components/icon-cn" type="info" showIcon
             action={<a target={'_blank'} href={"https://ant.design/components/icon-cn"} rel="noreferrer">点击前往</a>}
             banner
      />
      <br/>

      <ProFormSelect width="xl" name="iconLargeCategory" label="大类型" rules={[{required: true}]}
                     request={
                       async () => {
                         const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "iconLargeCategory"});
                         newVar.data.forEach((item: any) => {
                           item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                         })
                         return newVar.data
                       }
                     }
      />
      <ProFormSelect width="xl" name="iconSubclass" label="小类型" rules={[{required: true}]}
                     request={
                       async () => {
                         const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "iconSubclass"});
                         newVar.data.forEach((item: any) => {
                           item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                         })
                         return newVar.data
                       }
                     }
      />
      <ProFormText width="xl" name="iconName" label="图标名称" rules={[{required: true}]}/>
      <ProFormTextArea width="xl" name="remark" label="备注信息"/>


    </ModalForm>
  );
};
