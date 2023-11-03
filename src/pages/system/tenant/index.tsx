import {ActionType, PageContainer, ProTable} from '@ant-design/pro-components';
import React, {useState} from 'react';
import {getSysTenantListPage, updateSysTenantStatus} from "@/pages/system/tenant/api/TenantApi";
import AddTenantModalForm from "@/pages/system/tenant/components/AddTenantModalForm";
import EditTenantModalForm from "@/pages/system/tenant/components/EditTenantModalForm";
import {Switch} from "antd";
import TenantBindDataSourceModalForm from "@/pages/system/tenant/components/datasource/TenantBindDataSourceModalForm";

export default () => {
  const actionRef = React.useRef<ActionType>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  return (
    <PageContainer>
      <ProTable
        columns={[
          {
            title: '序号',
            dataIndex: 'positionId',
            valueType:"indexBorder",
            width: 100,
          },
          {
            title: '租户名称',
            dataIndex: 'tenantName',
            width: 150,
            ellipsis: true
          },
          {
            title: '租户编码',
            dataIndex: 'tenantCode',
            width: 150,
          },
          {
            title: '图标',
            tooltip: '目前暂不支持系统同步LOGO 数据只做展示',
            dataIndex: 'tenantLogo',
            hideInSearch: true,
            valueType: 'image',
            width: 100,
          },
          {
            title: '启用',
            dataIndex: 'status',
            valueType: "switch",
            hideInSearch: true,
            width: 100,
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
                      let newVar = await updateSysTenantStatus(record)
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
            ellipsis: true,
            width: 200,
          },
        ]}
        rowSelection={{
          type: "radio",
          selectedRowKeys: selectedRowKeys,
          onChange: function (selectedRowKeys, selectedRows) {
            if (selectedRows[0].tenantId) {
              setSelectedRowKeys(selectedRowKeys)
              return;
            }
          },
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              if (selectedRowKeys.includes(record.tenantId)) {
                setSelectedRowKeys([])
              } else {
                setSelectedRowKeys([record.tenantId])
              }
            },
          };
        }}
        tableAlertRender={({selectedRowKeys}) => {
          if (selectedRowKeys.length === 1) {
            return [
              <EditTenantModalForm key={"EditTenantModalForm"} actionRef={actionRef} tenantId={selectedRowKeys[0]}/>,
              <TenantBindDataSourceModalForm key={"TenantBindDataSourceModalForm"} tenant={selectedRowKeys[0]}/>
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
        rowKey={(record) => record.tenantId}
        request={async (params) => {
          let result = await getSysTenantListPage(params);
          return {
            data: result.data.rows,
            success: result.success,
            total: result.data.totalRows,
          };
        }}
        toolbar={{
          actions: [
            <AddTenantModalForm key={"AddTenantModalForm"} actionRef={actionRef}/>
          ],
        }}
      />
    </PageContainer>
  )
}
