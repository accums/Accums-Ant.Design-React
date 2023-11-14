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
      title="提交委托合同"
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
      <Alert showIcon message={"请注意：委托合同数据提交后，将无法二次【提交】，且不可【配置样品】和【更新】数据。"}></Alert>
    </ModalForm>
  );
};
