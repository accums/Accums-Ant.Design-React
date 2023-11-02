import type {ActionType} from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import React, {useRef} from 'react';
import {listPage, updateSuspensionStatus} from "@/pages/workflow/define/api/defineApi";
import {Switch, Tag} from "antd";

export default () => {

  const actionRef = useRef<ActionType>();

  return (
    <PageContainer>
      <ProTable<any>
        columns={[
          {
            title: 'ID_',
            dataIndex: 'id',
            ellipsis: true,
            copyable: true,
            width: 100
          },
          {
            title: '定义名称',
            align: "center",
            dataIndex: 'name',
            width: 100
          },
          {
            title: '描述',
            align: "center",
            dataIndex: 'description',
            ellipsis: true,
            hideInSearch: true,
            width: 100
          },
          {
            title: 'KEY',
            align: "center",
            dataIndex: 'key',
            hideInSearch: true,
            width: 100
          },
          {
            title: '分类',
            dataIndex: 'category',
            width: 80,
            align: "center",
            valueEnum: {
              "1": {text: <Tag color='blue'> 请假类 </Tag>,},
              "2": {text: <Tag color='green'> 财务类 </Tag>,}
            },
          },
          {
            title: '所属租户',
            dataIndex: 'tenantId',
            width: 90,
            align: "center",
            valueEnum: {
              "1": {text: <Tag color='blue'> 人事公司 </Tag>,},
              "2": {text: <Tag color='green'> 财务公司 </Tag>,}
            },
          },
          {
            title: '状态',
            dataIndex: 'suspensionState',
            hideInSearch: true,
            valueType: "switch",
            width: 100,
            align: "center",
            render: (text, record) => {
              return (
                <Switch
                  checkedChildren="激活" unCheckedChildren="挂起"
                  checked={record.suspensionState === 1}
                  onChange={async () => {
                    let newVar = await updateSuspensionStatus({
                      "defineId": record.id
                    })
                    if (newVar.success) {
                      actionRef.current?.reload()
                    }
                  }}
                />
              )
            },
          },
          {
            title: '部署ID_',
            dataIndex: 'deploymentId',
            ellipsis: true,
            hideInSearch: true,
            align: "center",
            copyable: true,
            width: 120
          },
          {
            title: '创建时间',
            dataIndex: 'deploymentTime',
            hideInSearch: true,
            align: "center",
            ellipsis: true,
            width: 150
          },

        ]}
        request={
          async (params) => {
            const result = await listPage(params);
            return {
              data: result.data.rows,
              success: result.success,
              total: result.data.totalRows,
            };
          }
        }
        rowSelection={{
          type: "radio",
        }}
        tableAlertRender={({selectedRowKeys}) => {
          if (selectedRowKeys.length === 1) {
            return []
          } else {
            return []
          }
        }}
        actionRef={actionRef}
        rowKey={(record) => record.id}
        search={{
          labelWidth: "auto",
        }}
        toolBarRender={() => []}
      />
    </PageContainer>
  );
};
