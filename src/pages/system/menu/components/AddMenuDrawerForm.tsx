import {PlusOutlined} from '@ant-design/icons';
import {ModalForm, ProForm, ProFormDigit, ProFormText, ProFormTreeSelect,} from '@ant-design/pro-components';
import {Button, Divider, message} from 'antd';
import React from "react";
import {addSysMenu, getSysMenuList} from "@/pages/system/menu/api/MenuApi";
import IconForm from "@/pages/system/icon/components/IconForm";

export default (props: { actionRef: any }) => {

  return (
    <ModalForm<any>
      title="新建菜单"
      trigger={<Button type="primary"> <PlusOutlined/>新建菜单</Button>}
      autoFocusFirstInput
      modalProps={{destroyOnClose: true,}}
      onFinish={async (values) => {
        let newVar = await addSysMenu(values);
        if (newVar.data) {
          message.success('添加成功');
          props.actionRef.current?.reload()
          return true;
        }
        message.error('添加失败，请重试');
        return false;
      }}
    >
      <ProForm.Group title={"基本信息"}>
        <ProFormTreeSelect width="md" name="menuParentId" label="上级菜单"
                           fieldProps={{
                             fieldNames: {label: "name", value: "menuId", children: "children"},
                             showSearch: true,
                             //默认展开 目前好像只在ProFormTreeSelect中生效
                             treeDefaultExpandAll: true,
                             //显示清除按钮
                             allowClear: true,
                           }}
                           request={async () => {
                             const newVar = await getSysMenuList({});
                             return newVar.data;
                           }}
        />

        <ProFormText width="md" name="menuName" label="菜单名称" rules={[{required: true}]}/>
        <ProFormText width="md" name="menuCode" label="菜单编码"/>
        <ProFormDigit width="md" name="menuSort" label="菜单排序" initialValue={99} rules={[{required: true}]}/>
        <ProFormText width="md" name="remark" label="备注信息"/>
      </ProForm.Group>
      <Divider orientation="left"></Divider>
      <ProForm.Group title={"菜单配置"}>
        <ProFormText width="md" name="antdRouter" label="路由路径" rules={[{required: true}]}/>
        <ProFormText width="md" name="antdComponent" label="组件路径"/>
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText width="md" name="antdIcon" label="菜单图标"/>
      </ProForm.Group>
      <IconForm/>
    </ModalForm>
  );
};

