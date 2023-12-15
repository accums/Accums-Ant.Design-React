import {ModalForm,} from '@ant-design/pro-components';
import {Button, message,} from 'antd';
import React from "react";
import {PlayCircleOutlined} from "@ant-design/icons";
import {newModel} from "@/pages/workflow/model/api/modelApi";

export default (props: { actionRef: any }) => {

  return (
    <ModalForm<any>
      {...{
        labelCol: {span: 5},
        wrapperCol: {span: 14},
      }}
      layout={"horizontal"}
      trigger={<Button style={{marginRight: '10px'}} size={"small"} type="primary" ghost
                       icon={<PlayCircleOutlined/>}> 流程启动 </Button>}
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
    </ModalForm>
  );
};
