import {Button, message, Tree, TreeProps} from "antd";
import React, {useState} from 'react';
import {getSysMenuAndButtonList} from "@/pages/system/menu/api/MenuApi";
import {DrawerForm} from "@ant-design/pro-components";
import {Icon} from "@/pages/system/icon/api/Icon";
import {roleBindMenus, getSysRoleBindMenusByRoleId} from "../../role/api/RoleMenuApi";
import {MenuOutlined} from "@ant-design/icons";

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
  const [treeData, setTreeData] = useState<any>([]);
  const [selected, setSelected] = useState<any>([]);
  const [defaultCheckedKeys, setDefaultCheckedKeys] = useState<any>([]);

  const onCheck: TreeProps['onCheck'] = (checkedKeys) => {
    setSelected(checkedKeys);
  };

  return (
    <DrawerForm<any>
      title={"为角色【" + param.role.roleName + "】配置菜单"}
      drawerProps={{
        closeIcon: false,
        destroyOnClose: true
      }}
      request={async () => {
        const SysMenuAndButtonList = await getSysMenuAndButtonList({});
        iconFormat(SysMenuAndButtonList.data)
        setTreeData(SysMenuAndButtonList.data)
        const SysRoleMenusList = await getSysRoleBindMenusByRoleId({roleId: param.role.roleId});
        setDefaultCheckedKeys(SysRoleMenusList.data.map((item: { menuId: any; }) => item.menuId))
        return true
      }}
      width={350}
      onFinish={async () => {
        const newVar = await roleBindMenus({"roleId": param.role.roleId, "menuIds": selected.checked});
        if (newVar.data) {
          message.success('角色配置菜单成功');
          return true
        } else {
          message.error('角色配置菜单失败，请重试');
          return false
        }
      }}
      trigger={<Button ghost size={"small"} style={{marginRight: '10px'}} type="primary"
                       icon={<MenuOutlined/>}>配置菜单</Button>}>
      <Tree
        key={"MenuAndButtonTree"}
        showIcon
        checkStrictly={true}
        defaultExpandAll
        defaultCheckedKeys={defaultCheckedKeys}
        defaultExpandParent
        checkable
        treeData={treeData}
        onCheck={onCheck}
      />
      <br/>
    </DrawerForm>
  );
};

