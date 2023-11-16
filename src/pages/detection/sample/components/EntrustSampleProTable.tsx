import {ActionType, ProTable} from '@ant-design/pro-components';
import React from 'react';
import {getDetectionSampleListPage} from "@/pages/detection/sample/api/SampleApi";
import AddSampleModalForm from "@/pages/detection/sample/components/AddSampleModalForm";
import {getSysDictListByDictTypeCode} from "@/pages/system/dict/api/DictApi";
import {Tag} from "antd";
import DetailSampleDrawerForm from "@/pages/detection/sample/components/DetailSampleDrawerForm";

export default (props: { entrustContractId: any }) => {
  const actionRef = React.useRef<ActionType>();
  return (
    <ProTable<any>
      columns={[
        {
          title: '序号',
          dataIndex: 'sampleId',
          valueType: "indexBorder",
          width: 50,
        },
        {
          title: '样品编号',
          dataIndex: 'sampleCode',
          width: 150,
          ellipsis: true,
          render: (dom, entity) => {
            return <DetailSampleDrawerForm entity={entity}/>
          },
        },
        {
          title: '样品分类',
          dataIndex: 'categorizeId',
          width: 100,
          ellipsis: true
        },
        {
          title: '样品名称',
          dataIndex: 'sampleName',
          width: 100,
          ellipsis: true
        },
        {
          title: '样品来源',
          dataIndex: 'sampleSource',
          valueType: "select",
          width: 100,
          request: async () => {
            const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "sampleSource"});
            newVar.data.forEach((item: any) => {
              item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
            })
            return newVar.data
          }
        },
        {
          title: '样品处置',
          dataIndex: 'sampleDispose',
          width: 100,
          valueType: "select",
          request: async () => {
            const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "sampleDispose"});
            newVar.data.forEach((item: any) => {
              item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
            })
            return newVar.data
          }
        },
        {
          title: '样品状态',
          dataIndex: 'sampleStatus',
          width: 100,
          valueType: "select",
          request: async () => {
            const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "sampleStatus"});
            newVar.data.forEach((item: any) => {
              item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
            })
            return newVar.data
          }
        },
      ]}
      actionRef={actionRef}
      params={{entrustContractId: props.entrustContractId}}
      request={
        async (params) => {
          const result = await getDetectionSampleListPage(params);
          return {
            data: result.data.rows,
            success: result.success,
            total: result.data.totalRows
          };
        }
      }
      search={false}
      rowKey={(record) => record.sampleId}
      toolBarRender={() => [
        <AddSampleModalForm key={"AddSampleModalForm"} entrustContractId={props.entrustContractId}
                            actionRef={actionRef}/>,
      ]}
    />
  )
}

