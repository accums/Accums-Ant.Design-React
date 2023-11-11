import {SendOutlined} from '@ant-design/icons';
import {ModalForm,} from '@ant-design/pro-components';
import {Alert, Button, message,} from 'antd';
import React from "react";
import {
  addDetectionEntrustContract,
  getDetectionEntrustContractById
} from "@/pages/detection/entrust/api/EntrustContractApi";

export default (props: { actionRef: any, selectedRows: any }) => {
  return (
    <ModalForm
      title="更新委托合同"
      trigger={<Button ghost size={"small"} type="primary"
                       style={{marginRight: '10px'}}><SendOutlined/>提交</Button>}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: false,
      }}
      params={{entrustContractId: props.selectedRows.entrustContractId}}
      request={async (params) => {
        const result = await getDetectionEntrustContractById(params);
        return result.data
      }}
      onFinish={async (values) => {
        let newVar = await addDetectionEntrustContract(values);
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
      <Alert showIcon message={"数据提交后"}></Alert>
      <Alert showIcon message={"1. 委托合同数据不能继续配置样品"}></Alert>
      <Alert showIcon message={"2. 委托合同数据不能继续更新"}></Alert>
    </ModalForm>
  );
};
