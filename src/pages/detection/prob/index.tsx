import {ActionType, PageContainer, ProTable} from '@ant-design/pro-components';
import React from "react";
import {Tag} from "antd";
import {getDetectionSampleListPage} from "@/pages/detection/sample/api/SampleApi";
import DetailSampleDrawerForm from "@/pages/detection/sample/components/DetailSampleDrawerForm";
import {getSysDictListByDictTypeCode} from "@/pages/system/dict/api/DictApi";


export default () => {

  const actionRef = React.useRef<ActionType>();

  return (
    <PageContainer>
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
          {
            title: '创建时间',
            dataIndex: 'createTime',
            width: 150,
            ellipsis: true
          },
        ]}
        actionRef={
          actionRef
        }
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
      />
    </PageContainer>
  );
};
