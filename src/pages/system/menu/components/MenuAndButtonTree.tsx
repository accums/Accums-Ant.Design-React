import {Button, message, Tree, TreeProps} from "antd";
import React, {useState} from 'react';
import {getSysMenuAndButtonList} from "@/pages/system/menu/api/MenuApi";
import {DrawerForm} from "@ant-design/pro-components";
import {Icon} from "@/pages/system/icon/api/Icon";
import {roleBindMenus, getSysRoleBindMenusByRoleId} from "../../role/api/RoleMenuApi";
import {MenuOutlined} from "@ant-design/icons";

/**
 * 将原始数据中的菜单和按钮通过图标区分开来
 * @param result
 */
export function iconFormat(result: any) {
  if (result) {
    result.forEach((item: any) => {
      if (item.type === "1") {
        item.icon = <Icon icon={"MediumOutlined"}></Icon>
      }
      if (item.type === "2") {
        item.icon = <Icon icon={"BoldOutlined"}></Icon>
      }
      iconFormat(item.children);
    })
  }
}

export default (param: { role: any }) => {

  //原始数据 所有菜单
  const [treeData, setTreeData] = useState<any>([]);
  //存储已选择的数据项
  const [selected, setSelected] = useState<any>([]);
  //默认选中的数据项
  const [defaultCheckedKeyList, setDefaultCheckedKeyList] = useState<any>([]);

  const onCheck: TreeProps['onCheck'] = (checkedKeys) => {
    setSelected(checkedKeys);
  };


  return (
    <DrawerForm<any>
      trigger={
        <Button
          ghost
          size={"small"}
          style={{marginRight: '10px'}}
          type="primary"
          icon={<MenuOutlined/>}
        >
          配置菜单(Tree)
        </Button>
      }
      width={350}
      title={"为角色【" + param.role.roleName + "】配置菜单"}
      drawerProps={{
        //不展示抽屉的关闭图标
        closeIcon: false,
        //点击空白处关闭抽屉
        destroyOnClose: true
      }}
      request={async () => {
        const SysMenuAndButtonList = await getSysMenuAndButtonList({});
        iconFormat(SysMenuAndButtonList.data)
        setTreeData(SysMenuAndButtonList.data)
        const SysRoleMenusList = await getSysRoleBindMenusByRoleId({roleId: param.role.roleId});
        const map = SysRoleMenusList.data.map((item: { menuId: any; }) => item.menuId);
        setDefaultCheckedKeyList(map)
        return true;
      }}
      onFinish={async () => {
        const newVar = await roleBindMenus({"roleId": param.role.roleId, "menuIds": selected.checked});
        if (newVar.data) {
          message.success("角色【" + param.role.roleName + "】配置菜单成功");
          return true
        } else {
          message.error('角色配置菜单失败，请重试');
          return false
        }
      }}
    >
      <Tree
        treeData={treeData}
        key={"MenuAndButtonTree"}

        showIcon
        checkStrictly={true}
        defaultExpandAll
        checkedKeys={defaultCheckedKeyList}
        //如果使用了此属性 则组件在第二次渲染的时候才会显示对应的值
        //defaultCheckedKeys={defaultCheckedKeyList}
        defaultExpandParent
        checkable
        onCheck={onCheck}
      />
      <br/>
    </DrawerForm>
  );
};

