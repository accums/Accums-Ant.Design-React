import {BgColorsOutlined} from '@ant-design/icons';
import {ModalForm,} from '@ant-design/pro-components';
import {Alert, Button} from 'antd';
import React from "react";
import EntrustSampleProTable from '../../sample/components/EntrustSampleProTable';

export default (props: { actionRef: any, selectedRows: any }) => {
  return (
    <ModalForm
      width={1000}
      trigger={<Button ghost size={"small"} type="primary"
                       disabled={props.selectedRows.entrustStatus !== "1"}
                       style={{marginRight: '10px'}}><BgColorsOutlined/>配置样品</Button>}
      submitter={false}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: false,
        closeIcon: false
      }}
    >
      <Alert showIcon
             message={"委托合同编号【" + props.selectedRows.entrustCode + "】" +
               "委托单位【" + props.selectedRows.entrustUnit + "】" +
               "委托人【" + props.selectedRows.entrustClient + "】" +
               "委托人手机号【" + props.selectedRows.entrustClientPhone + "】"}></Alert>
      <EntrustSampleProTable entrustContractId={props.selectedRows.entrustContractId}/>
    </ModalForm>
  );
};
