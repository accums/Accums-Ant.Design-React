import {ActionType, PageContainer, ProTable} from '@ant-design/pro-components';
import {Switch,} from 'antd';
import React, {useState} from 'react';
import AddMenuDrawerForm from "@/pages/system/menu/components/AddMenuDrawerForm";
import {getSysMenuList, updateSysMenuStatus} from "@/pages/system/menu/api/MenuApi";
import {Icon} from '../icon/api/Icon';
import MenuButtonTable from './button/MenuButtonTable';

export default () => {
  const actionRef = React.useRef<ActionType>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [selectedRow, setSelectedRow] = useState<any>([]);
  return (
    <PageContainer>
      <ProTable<any>
        columns={[
          {
            title: '菜单名称',
            dataIndex: 'menuName',
            width: 200,
          },
          {
            title: '菜单图标',
            width: 100,
            hideInSearch: true,
            render: (text, record) => {
              return (
                <>
                  <Icon icon={record.antdIcon + record.antdIconSuffix}></Icon>
                </>
              )
            },
          },
          {
            title: '菜单编码',
            dataIndex: 'menuCode',
            width: 100,
          },
          {
            title: '路由地址',
            dataIndex: 'antdRouter',
            hideInSearch: true,
            width: 200,
          },
          {
            title: '排序',
            dataIndex: 'menuSort',
            hideInSearch: true,
            width: 100,
            sorter: (a, b) => a.menuSort - b.menuSort,
          },
          {
            title: '启用',
            dataIndex: 'status',
            valueType: "switch",
            hideInSearch: true,
            width: 60,
            render: (text, record) => {
              return (
                <>
                  <Switch
                    size={"small"}
                    key={`${record.createTime}`}
                    checked={record.status === "0"}
                    onChange={async (value) => {
                      if (value) {
                        record.status = 0
                      } else {
                        record.status = 1
                      }
                      let newVar = await updateSysMenuStatus(record)
                      if (newVar.data) {
                        actionRef.current?.reload()
                      }
                    }}
                  />
                </>
              )
            },
          },
          {
            title: '备注',
            dataIndex: 'remark',
            hideInSearch: true,
            width: 200,
            ellipsis: true,
          },
        ]}
        rowSelection={{
          type: "radio",
          selectedRowKeys: selectedRowKeys,
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              if (selectedRowKeys.includes(record.menuId)) {
                setSelectedRowKeys([])
                setSelectedRow([])
              } else {
                setSelectedRowKeys([record.menuId])
                setSelectedRow([record])
              }
            },
          };
        }}
        tableAlertRender={({}) => {
          if (selectedRowKeys.length === 1) {
            return [
              <MenuButtonTable key={"MenuButtonTable"} record={selectedRow[0]}/>
            ]
          }
          return []
        }}
        tableAlertOptionRender={() => {
          if (selectedRowKeys.length === 1) {
            return []
          }
          return []
        }}
        actionRef={actionRef}
        request={
          async (params) => {
            const result = await getSysMenuList(params);
            return {
              data: result.data,
              success: result.success,
            };
          }
        }
        rowKey={(record) => record.menuId}
        pagination={false}
        expandable={{
          defaultExpandAllRows: true,
        }}
        toolBarRender={() => [
          <AddMenuDrawerForm key={"AddMenuDrawerForm"} actionRef={actionRef}/>,
        ]}
      />
    </PageContainer>
  );
};

