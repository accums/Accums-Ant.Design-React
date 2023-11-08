import {ActionType, PageContainer, ProTable} from '@ant-design/pro-components';
import React from 'react';
import {Space, Tag} from "antd";
import {getDetectionCategorizeList} from "@/pages/detection/categorize/api/Categorize";
import AddEntrustContractModalForm from './components/AddEntrustContractModalForm';
import {getDetectionEntrustContractListPage} from "@/pages/detection/entrust/api/EntrustContractApi";

export default () => {
  const actionRef = React.useRef<ActionType>();
  return (
    <PageContainer>
      <ProTable<any>
        form={{
          ignoreRules: false,
        }}
        columns={[
          {
            title: '主键',
            dataIndex: 'entrustContractId',
            valueType: "indexBorder",
            width: 50,
          },
          {
            title: '委托合同编号',
            dataIndex: 'entrustCode',
            width: 100,
          },
          {
            title: '所属检测分类',
            dataIndex: 'categorizeParent',
            valueType: "select",
            hideInTable: true,
            width: 100,
            fieldProps: {
              showSearch: true
            },
            formItemProps: {
              rules: [{
                required: true,
                message: '请选择检测分类',
              },],
            },
            request: async () => {
              const newVar = await getDetectionCategorizeList({});
              return newVar.data;
            }
          },
          {
            title: '所属检测分类',
            dataIndex: 'categorizeParent',
            hideInSearch: true,
            width: 150,
            render: (dom) => {
              if (dom === null || dom === undefined) {
                return (<>-</>)
              }
              return (
                <Space>
                  <Tag color={"blue"} key={dom.toString()}>
                    {dom.toString()}
                  </Tag>
                </Space>
              )
            }
          },
          {
            title: '检测参数代码',
            dataIndex: 'parameterCode',
            width: 100,
          }
          ,
          {
            title: '检测参数名称',
            dataIndex: 'parameterName',
            width: 200,
            ellipsis: true
          }
          ,
          {
            title: '排序',
            dataIndex: 'parameterSort',
            hideInSearch: true,
            width: 100,
            sorter: (a, b) => a.menuSort - b.menuSort,
          }
          ,
          {
            title: '备注',
            dataIndex: 'remark',
            hideInSearch: true,
            width: 200,
            ellipsis: true,
          }
          ,
        ]}
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
        search={
          {
            labelWidth: "auto"
          }
        }
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

