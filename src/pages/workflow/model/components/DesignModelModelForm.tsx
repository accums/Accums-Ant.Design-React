import {AntDesignOutlined} from '@ant-design/icons';
import {
  ModalForm,
} from '@ant-design/pro-components';
import {Button} from 'antd';
import React, {} from "react";

export default (props: { modelId: any }) => {

  return (
    <ModalForm<any>
      submitter={false}
      width={"70%"}
      title="流程模型设计"
      trigger={<Button style={{marginRight: '10px'}} size={"small"} type="primary" ghost
                       icon={<AntDesignOutlined/>}> 设计流程 </Button>}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
      }}
    >
      <iframe width={"100%"}
              height={"600"}
              key={"DesignModelIframe"}
              src={"http://127.0.0.1/?modelId=" + props.modelId}
              frameBorder={0}
      ></iframe>
    </ModalForm>
  );
};
