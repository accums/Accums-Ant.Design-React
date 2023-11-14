import {ActionType, ProTable} from '@ant-design/pro-components';
import React from 'react';
import {getDetectionSampleListPage} from "@/pages/detection/sample/api/SampleApi";
import {Alert, Tag} from "antd";
import {getSysDictListByDictTypeCode} from "@/pages/system/dict/api/DictApi";
import DetailEntrustContractDrawerForm from "@/pages/detection/entrust/components/DetailEntrustContractDrawerForm";
import DetailSampleDrawerForm from './DetailSampleDrawerForm';

export default () => {
  const actionRef = React.useRef<ActionType>();

  return (
    <ProTable<any>
      headerTitle={
        <Alert showIcon message={<a target={'_blank'} href={'/detection/registration/entrust'}
                                    rel="noreferrer">若新建样品请前往菜单【委托合同】中关联委托合同进行新建</a>}></Alert>
      }
      columns={[
        {
          title: '序号',
          dataIndex: 'sampleId',
          valueType: "indexBorder",
          width: 50,
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
          title: '取样地点',
          dataIndex: 'sampleLocation',
          width: 100,
          ellipsis: true
        },
        {
          title: '收样人',
          dataIndex: 'samplePeople',
          width: 100,
          ellipsis: true
        },
        {
          title: '样品室',
          dataIndex: 'sampleRoom',
          width: 100,
          ellipsis: true
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
        {
          title: '创建时间',
          dataIndex: 'createTime',
          width: 120,
          ellipsis: true
        },

      ]}
      actionRef={actionRef}
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
      search={{labelWidth: "auto"}}
      rowKey={(record) => record.sampleId}
      toolBarRender={() => []}
    />
  )
}

