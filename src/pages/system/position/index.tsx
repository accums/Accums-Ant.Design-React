import {ActionType, PageContainer} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import React, {useState} from 'react';
import {Switch, Tag} from 'antd';
import EditPositionModalForm from "@/pages/system/position/components/EditPositionModalForm";
import DelPositionPopConfirm from "@/pages/system/position/components/DelPositionPopConfirm";
import {getSysPositionListPage, updateSysPositionStatus} from "@/pages/system/position/api/PositionApi";
import AddPositionModalForm from "@/pages/system/position/components/AddPositionModalForm";

export default () => {
  const actionRef = React.useRef<ActionType>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  return (
    <PageContainer>
      <ProTable<any>
        columns={[
          {
            title: '序号',
            dataIndex: 'positionId',
            valueType:"indexBorder",
            width: 100,
          },
          {
            title: '职位名称',
            dataIndex: 'positionName',
            width: 150,
          },
          {
            title: '职位类型',
            dataIndex: 'positionType',
            hideInSearch: true,
            width: 100,
            valueEnum: {
              0: {text: <Tag color='blue'> 系统职位 </Tag>,},
              1: {text: <Tag color='green'> 业务职位 </Tag>,}
            },
          },
          {
            title: '职位排序',
            dataIndex: 'positionSort',
            hideInSearch: true,
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
                      let newVar = await updateSysPositionStatus({
                        "positionId": record.positionId,
                        "status": record.status
                      })
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
            if (selectedRows[0].positionId) {
              setSelectedRowKeys(selectedRowKeys)
              return;
            }
          },
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              if (selectedRowKeys.includes(record.positionId)) {
                setSelectedRowKeys([])
              } else {
                setSelectedRowKeys([record.positionId])
              }
            },
          };
        }}
        tableAlertRender={({}) => {
          if (selectedRowKeys.length === 1) {
            return [
              <EditPositionModalForm key={"EditPositionModalForm"} actionRef={actionRef}
                                     positionId={selectedRowKeys[0]}/>,
            ]
          }
          return []
        }}
        tableAlertOptionRender={() => {
          if (selectedRowKeys.length === 1) {
            return [
              <DelPositionPopConfirm key={"DelPositionPopConfirm"} actionRef={actionRef} positionId={selectedRowKeys[0]}/>
            ]
          }
          return []
        }}
        actionRef={actionRef}
        request={
          async (params) => {
            const result = await getSysPositionListPage(params);
            return {
              data: result.data.rows,
              success: result.success,
              total: result.data.totalRows,
            };
          }
        }
        rowKey={(record) => record.positionId}
        toolBarRender={() => [
          <AddPositionModalForm key={"AddPositionModalForm"} actionRef={actionRef}/>
        ]}
      />
    </PageContainer>
  );
};
