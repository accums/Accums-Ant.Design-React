import {SendOutlined} from '@ant-design/icons';
import {ActionType, EditableProTable, ModalForm,} from '@ant-design/pro-components';
import {Alert, Button, Divider,} from 'antd';
import React, {useState} from "react";
import DetailSampleDrawerForm from "@/pages/detection/sample/components/DetailSampleDrawerForm";
import {getDetectionSampleListPage} from "@/pages/detection/sample/api/SampleApi";

export default (props: { actionRef: any, selectedRows: any }) => {
  const actionRef = React.useRef<ActionType>();

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>();
  const [dataSource, setDataSource] = useState<any>();

  return (
    <ModalForm title="提交委托合同"
               trigger={<Button ghost size={"small"} type="primary"><SendOutlined/>提交</Button>}
               onFinish={async () => {
                 alert(dataSource)
               }}
               modalProps={{
                 destroyOnClose: true,
               }}
    >
      <Alert showIcon
             message={"请注意：委托合同数据提交后，将无法二次【提交】，且不可【配置样品】和【更新】委托合同数据。"}></Alert>
      <Divider></Divider>
      <EditableProTable
        columns={[
          {
            title: '样品编号',
            align: 'center',
            dataIndex: 'sampleCode',
            readonly: true,
            width: 150,
            render: (dom, entity) => {
              return <DetailSampleDrawerForm entity={entity}/>
            },
          },
          {
            title: '样品分类',
            dataIndex: 'categorizeId',
            align: 'center',
            width: 100,
            readonly: true,
            ellipsis: true
          },
          {
            title: '样品名称',
            dataIndex: 'sampleName',
            align: 'center',
            width: 100,
            readonly: true,
            ellipsis: true
          },
          {
            title: '试验人员',
            dataIndex: '123',
            align: 'center',
            valueType: 'select',
            width: 100,
            valueEnum: {
              all: {text: '试验员-001', status: 'Default'},
              open: {
                text: '试验员-002',
                status: 'Error',
              },
              closed: {
                text: '试验员-003',
                status: 'Success',
              },
            },
            formItemProps: {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: '请选择试验人员',
                }
              ]
            },
            ellipsis: true
          },
        ]}
        bordered={false}
        size={"small"}
        ghost={true}
        search={false}
        rowKey={(record) => record.sampleId}
        recordCreatorProps={false}
        actionRef={actionRef}
        editable={{
          type: 'multiple',
          editableKeys,
          onValuesChange: (record, recordList) => {
            setDataSource(recordList);
          },
        }}
        params={{entrustContractId: props.selectedRows.entrustContractId}}
        request={
          async (params) => {
            const result = await getDetectionSampleListPage(params);
            setEditableRowKeys(result.data.rows.map((item: { sampleId: any; }) => item.sampleId),)
            return {
              data: result.data.rows,
              success: result.success,
              total: result.data.totalRows
            };
          }
        }
      />
      <Divider></Divider>
    </ModalForm>
  );
};
