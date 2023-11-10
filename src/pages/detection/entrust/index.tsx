import {ActionType, PageContainer, ProTable} from '@ant-design/pro-components';
import React, {useState} from 'react';
import {Tag} from "antd";
import AddEntrustContractModalForm from './components/AddEntrustContractModalForm';
import {getDetectionEntrustContractListPage} from "@/pages/detection/entrust/api/EntrustContractApi";
import {getSysDictListByDictTypeCode} from "@/pages/system/dict/api/DictApi";
import DetailEntrustContractDrawerForm from './components/DetailEntrustContractDrawerForm';
import AddEntrustSampleModalForm from './components/AddEntrustSampleModalForm';

export default () => {
  const actionRef = React.useRef<ActionType>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  return (
    <PageContainer>
      <ProTable<any>
        columns={[
          {
            title: '序号',
            dataIndex: 'entrustContractId',
            valueType: "indexBorder",
            width: 50,
          },

          {
            title: '检测分类',
            dataIndex: 'detectionType',
            valueType: "select",
            width: 120,
            request: async () => {
              const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "detectionType"});
              newVar.data.forEach((item: any) => {
                item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
              })
              return newVar.data
            }
          },
          {
            title: '委托合同编号',
            dataIndex: 'entrustCode',
            ellipsis: true,
            width: 150,
            render: (dom, entity) => {
              return <DetailEntrustContractDrawerForm entity={entity}/>
            },
          },
          {
            title: '检测单位',
            dataIndex: 'detectionUnit',
            ellipsis: true,
            width: 150,
          },
          {
            title: '委托单位',
            dataIndex: 'entrustUnit',
            width: 150,
            ellipsis: true
          },
          {
            title: '委托人',
            dataIndex: 'entrustClient',
            width: 80,
            ellipsis: true
          },
          {
            title: '委托人手机号',
            dataIndex: 'entrustClientPhone',
            width: 100,
            ellipsis: true
          },

          {
            title: '报告要求时间',
            dataIndex: 'reportRequiredTime',
            hideInSearch: true,
            width: 100,
            ellipsis: true
          },
          {
            title: '报告交付方式',
            dataIndex: 'reportDeliverWay',
            hideInSearch: true,
            width: 100,
            valueType: "select",
            request: async () => {
              const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "reportDeliverWay"});
              newVar.data.forEach((item: any) => {
                item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
              })
              return newVar.data
            }
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            hideInSearch: true,
            width: 100,
            ellipsis: true,
          },
          {
            title: '备注',
            dataIndex: 'remark',
            hideInSearch: true,
            width: 100,
            ellipsis: true,
          },
        ]}
        rowSelection={{
          type: "radio",
          selectedRowKeys: selectedRowKeys,
          onChange: function (selectedRowKeys, selectedRows) {
            if (selectedRows[0].entrustContractId) {
              setSelectedRowKeys(selectedRowKeys)
              return;
            }
          },
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              if (selectedRowKeys.includes(record.entrustContractId)) {
                setSelectedRowKeys([])
              } else {
                setSelectedRowKeys([record.entrustContractId])
              }
            },
          };
        }}
        tableAlertRender={({selectedRows}) => {
          if (selectedRowKeys.length === 1) {
            return [
              <AddEntrustSampleModalForm selectedRows={selectedRows[0]} key={"AddEntrustSampleModalForm"}
                                         actionRef={actionRef}/>,
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
            const result = await getDetectionEntrustContractListPage(params);
            return {
              data: result.data.rows,
              success: result.success,
              total: result.data.totalRows
            };
          }
        }
        search={{labelWidth: "auto"}}
        rowKey={
          (record) => record.entrustContractId
        }
        toolBarRender={
          () => [
            <AddEntrustContractModalForm key={"AddEntrustContractModalForm"} actionRef={actionRef}/>,
          ]
        }
      />
    </PageContainer>
  )
    ;
}

