import {ActionType, PageContainer, ProTable} from '@ant-design/pro-components';
import React from 'react';
import {getDetectionDeviceListPage} from "@/pages/detection/device/api/DeviceContractApi";

export default () => {
  const actionRef = React.useRef<ActionType>();
  return (
    <PageContainer>
      <ProTable<any>
        columns={[
          {
            title: '序号',
            dataIndex: 'deviceId',
            valueType: "indexBorder",
            width: 50,
          },
          {
            title: '设备编号',
            dataIndex: 'deviceCode',
            width: 100,
            ellipsis: true
          },
          {
            title: '设备名称',
            dataIndex: 'deviceName',
            ellipsis: true,
            width: 100,
          },
          {
            title: '型号规格',
            dataIndex: 'deviceModel',
            width: 100,
            ellipsis: true
          },
          {
            title: '制造厂商',
            dataIndex: 'manufacturer',
            width: 100,
            ellipsis: true
          },
          {
            title: '引用规范',
            dataIndex: 'according',
            width: 100,
            ellipsis: true
          },
          {
            title: '所属科室',
            dataIndex: 'department',
            width: 100,
            ellipsis: true
          },
          {
            title: '所属项目',
            dataIndex: 'project',
            width: 100,
            ellipsis: true
          },
          {
            title: '启用日期',
            dataIndex: 'activationDate',
            width: 100,
            ellipsis: true
          },
        ]}
        actionRef={actionRef}
        request={
          async (params) => {
            const result = await getDetectionDeviceListPage(params);
            return {
              data: result.data.rows,
              success: result.success,
              total: result.data.totalRows
            };
          }
        }
        search={{labelWidth: "auto"}}
        rowKey={(record) => record.deviceId}
        toolBarRender={
          () => []
        }
      />
    </PageContainer>
  )
    ;
}

