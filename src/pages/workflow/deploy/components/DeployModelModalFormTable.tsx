import {
  ModalForm,
} from '@ant-design/pro-components';
import {Button} from 'antd';
import React, {} from "react";
import {EditOutlined} from "@ant-design/icons";

export default (props: { modelId: any }) => {

  return (
    <ModalForm<any>
      {...{
        labelCol: {span: 5},
        wrapperCol: {span: 14},
      }}
      title={"123z`"}
      layout={"horizontal"}
      trigger={<Button ghost size={"small"} style={{marginRight: '10px'}} type="primary"
                       icon={<EditOutlined/>}>部署信息</Button>}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
      }}
    >

    </ModalForm>
  );
};
