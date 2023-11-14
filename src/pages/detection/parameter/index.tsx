import {ActionType, PageContainer, ProTable} from '@ant-design/pro-components';
import React from 'react';
import {Space, Tag} from "antd";
import {getDetectionParameterListPage} from "@/pages/detection/parameter/api/ParameterApi";
import AddParameterModalForm from './components/AddParameterModalForm';
import {getDetectionCategorizeList} from "@/pages/detection/categorize/api/Categorize";

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
            dataIndex: 'parameterId',
            valueType: "indexBorder",
            width: 50,
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
            width: 180,
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
          },
          {
            title: '检测参数名称',
            dataIndex: 'parameterName',
            width: 150,
            ellipsis: true
          },
          {
            title: '判定依据',
            dataIndex: 'parameterJudge',
            hideInSearch: true,
            width: 260,
            render: (dom) => {
              if (dom === null || dom === undefined) {
                return (<>-</>)
              }
              if (dom === "-") {
                return (<>-</>)
              }
              return (
                <Space wrap>
                  {dom.toString().split("，").map((item) => (
                    <Tag color={"blue"} key={item}>
                      {item}
                    </Tag>
                  ))}
                </Space>
              )
            }
          },
          {
            title: '试验依据',
            dataIndex: 'parameterProb',
            hideInSearch: true,
            width: 260,
            render: (dom) => {
              if (dom === null || dom === undefined) {
                return (<>-</>)
              }
              if (dom === "-") {
                return (<>-</>)
              }
              return (
                <Space wrap>
                  {dom.toString().split("，").map((item) => (
                    <Tag color={"blue"} key={item}>
                      {item}
                    </Tag>
                  ))}
                </Space>
              )
            }
          },
        ]}
        actionRef={
          actionRef
        }
        request={
          async (params) => {
            const result = await getDetectionParameterListPage(params);
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
          (record) => record.parameterId
        }
        toolBarRender={
          () => [
            <AddParameterModalForm key={"AddParameterModalForm"} actionRef={actionRef}/>,
          ]
        }
      />
    </PageContainer>
  )
    ;
}

