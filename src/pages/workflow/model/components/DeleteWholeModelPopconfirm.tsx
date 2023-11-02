import {Button, message, Popconfirm} from 'antd';
import React from 'react';
import {deleteWholeModelById} from "@/pages/workflow/model/api/modelApi";
import {DeleteOutlined} from '@ant-design/icons';

export default (props: { actionRef: any, modelId: any }) => {

  return (
    <Popconfirm
      title="删除后数据无法恢复，请谨慎操作"
      description="点击确认将清除流程模型所有相关数据【正在执行的流程实例不受影响】"
      onConfirm={
        async () => {
          let result = await deleteWholeModelById({modelId: props.modelId});
          if (result.success) {
            message.success('删除流程模型成功');
            props.actionRef.current?.reload()
            return true;
          } else {
            message.error('删除流程模型失败请重试');
            return false;
          }
        }
      }
    >
      <Button ghost danger type="primary" style={{marginRight: '10px'}} size={"small"} icon={<DeleteOutlined/>}>级联删除</Button>
    </Popconfirm>
  );
}
