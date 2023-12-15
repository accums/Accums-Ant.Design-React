import type {ActionType} from '@ant-design/pro-components';
import {PageContainer, ProTable,} from '@ant-design/pro-components';
import React, {useRef, useState} from 'react';
import {selectModelListPage} from "@/pages/workflow/model/api/modelApi";
import AddModel from "@/pages/workflow/model/components/AddModelModalForm";
import {Tag} from "antd";
import UpdateModelModalForm from "@/pages/workflow/model/components/UpdateModelModalForm";
import DeleteModelPopConFirm from "@/pages/workflow/model/components/DeleteModelPopconfirm";
import DeleteWholeModelPopconfirm from "@/pages/workflow/model/components/DeleteWholeModelPopconfirm";
import DeployModelModalFormTable from "@/pages/workflow/deploy/components/DeployModelModalFormTable";
import DesignModelPopconfirm from './components/DesignModelPopconfirm';
import DesignModelModelForm from './components/DesignModelModelForm';

export default () => {

  const actionRef = useRef<ActionType>();

  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);

  return (
    <PageContainer>
      <ProTable<any>
        columns={[
          {
            title: 'ID_',
            dataIndex: 'modelId',
            ellipsis: true,
            width: 100,
            fieldProps: {
              placeholder: "请输入完整的流程模型ID_",
            },
            copyable: true,
          },
          {
            title: '模型名称',
            dataIndex: 'modelName',
            fieldProps: {
              placeholder: "支持模糊查询",
            },
            width: 100
          },
          {
            title: '模型描述',
            dataIndex: 'modelDesc',
            ellipsis: true,
            hideInSearch: true,
            width: 100
          },
          {
            title: 'KEY',
            dataIndex: 'modelKey',
            hideInSearch: true,
            width: 100,
          },
          {
            title: '分类',
            dataIndex: 'category',
            width: 100,
            valueEnum: {
              "1": {text: <Tag color='blue'> 请假类 </Tag>,},
              "2": {text: <Tag color='green'> 财务类 </Tag>,}
            },
          },
          {
            title: '所属租户',
            dataIndex: 'tenantId',
            width: 100,
            valueEnum: {
              "1": {text: <Tag color='blue'> 人事公司 </Tag>,},
              "2": {text: <Tag color='green'> 财务公司 </Tag>,}
            },
          },
          {
            title: 'META_INFO_',
            dataIndex: 'metaInfo',
            ellipsis: true,
            hideInSearch: true,
            width: 150
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            hideInSearch: true,
            width: 140
          },
          {
            title: '更新时间',
            dataIndex: 'updateTime',
            hideInSearch: true,
            width: 140
          },
          // {
          //   title: '操作',
          //   width: 180,
          //   key: 'option',
          //   valueType: 'option',
          //   render: (dom, entity) => [],
          // },
        ]}
        request={
          async (params) => {
            const result = await selectModelListPage(params);
            return {
              data: result.data.rows,
              success: result.success,
              total: result.data.totalRows,
            };
          }
        }
        rowSelection={{
          type: "radio",
          selectedRowKeys: selectedRowKeys,
          onChange: function (selectedRowKeys, selectedRows) {
            if (selectedRows[0].modelId) {
              setSelectedRowKeys(selectedRowKeys)
              return;
            }
          },
        }}
        tableAlertRender={({selectedRows, selectedRowKeys}) => {
          if (selectedRowKeys.length === 1) {
            return [
              <DesignModelModelForm modelId={selectedRowKeys[0]} key={"DesignModelModelForm"}/>,
              <DesignModelPopconfirm modelId={selectedRowKeys[0]} key={"DesignModelPopconfirm"}/>,
              <UpdateModelModalForm actionRef={actionRef} modelId={selectedRowKeys[0]} key={"UpdateModelModalForm"}/>,
              <DeployModelModalFormTable key={"DeployModelModalFormTable"} model={selectedRows[0]}/>
            ]
          }
          return []
        }}
        tableAlertOptionRender={() => {
          if (selectedRowKeys.length === 1) {
            return [
              <DeleteModelPopConFirm actionRef={actionRef} modelId={selectedRowKeys[0]} key={"DeleteModelPopConFirm"}/>,
              <DeleteWholeModelPopconfirm actionRef={actionRef} modelId={selectedRowKeys[0]}
                                          key={"DeleteModelPopConFirm"}/>
            ]
          }
          return []
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              if (selectedRowKeys.includes(record.modelId)) {
                setSelectedRowKeys([])
              } else {
                setSelectedRowKeys([record.modelId])
              }
            },
          };
        }}
        actionRef={actionRef}
        rowKey={(record) => record.modelId}
        search={{
          labelWidth: "auto",
        }}
        toolBarRender={() => [
          <AddModel key={"AddModel"} actionRef={actionRef}/>
        ]}
      />
    </PageContainer>
  );
};
