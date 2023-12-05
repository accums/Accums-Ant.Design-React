import {PlusOutlined} from '@ant-design/icons';
import {ActionType, ModalForm, ProForm, ProFormText,} from '@ant-design/pro-components';
import {Button, Divider, message} from 'antd';
import React from "react";
import {addMoveCarContact} from "@/pages/move/car/api/MoveCarContactApi";

export default (props: { actionRef: React.MutableRefObject<ActionType | undefined> }) => {
  return (
    <ModalForm
      title="新建车辆信息"
      trigger={<Button type="primary"><PlusOutlined/>新建</Button>}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: false,
      }}
      onFinish={async (values) => {
        let newVar = await addMoveCarContact(values);
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
      <Divider></Divider>
      <ProForm.Group title={"车辆信息"}>
        <ProFormText width="md" name="moveCarNumber" label="车辆牌号" rules={[{required: true}]}/>
        <ProFormText width="md" name="moveCarPhone" label="车辆电话" rules={[{required: true}]}/>
      </ProForm.Group>
      <ProForm.Group title={"个性化"}>
        <ProFormText width="md" name="moveCarTitle" label="挪车标语"
                     tooltip={"显示在扫描挪车码后页面的最上方 不宜过长"}/>
        <ProFormText width="md" name="moveCarIconUrl" label="个性图标" tooltip={"请将图标网络地址复制至此栏"}/>
      </ProForm.Group>


    </ModalForm>
  );
};
