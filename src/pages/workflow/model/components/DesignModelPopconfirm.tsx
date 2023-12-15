import {Button, Popconfirm} from 'antd';
import React from 'react';
import {designModel} from "@/pages/workflow/model/api/modelApi";
import {AntDesignOutlined} from "@ant-design/icons";

export default (props: { modelId: any }) => {

  return (
    <Popconfirm
      title="前往流程模型设计器"
      description="点击确认将在新的窗口打开流程模型设计器页面"
      onConfirm={
        async () => {
          let result = await designModel({modelId: props.modelId});
          window.open(result);
          return true;
        }
      }
    >
      <Button type={"primary"} style={{marginRight: '10px'}} size={"small"} ghost
              icon={<AntDesignOutlined/>}>流程设计(旧)</Button>
    </Popconfirm>
  );
}
