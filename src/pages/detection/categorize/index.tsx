import {ActionType, PageContainer, ProTable} from '@ant-design/pro-components';
import React from 'react';
import AddCategorizeModalForm from "@/pages/detection/categorize/components/AddCategorizeModalForm";
import {getDetectionCategorizeListPage} from "@/pages/detection/categorize/api/Categorize";
import {Space, Tag} from "antd";

export default () => {
  const actionRef = React.useRef<ActionType>();
  return (
    <PageContainer>
      <ProTable<any>
        columns={[
          {
            title: '主键',
            dataIndex: 'categorizeId',
            valueType: "indexBorder",
            width: 50,
          },
          {
            title: '所属检测分类',
            dataIndex: 'categorizeParent',
            hideInSearch: true,
            width: 200,
            render: (dom) => {
              if (dom === null || dom === undefined) {
                return (<>-</>)
              }
              if (dom === "-") {
                return (<>-</>)
              }
              const strings = dom.toString().split(",");
              console.log(strings)
              return (
                <Space>
                  {dom.toString().split(",").map((item) => (
                    <Tag color={"blue"} key={item}>
                      {item}
                    </Tag>
                  ))}
                </Space>
              )
            }
          },
          {
            title: '检测分类代码',
            dataIndex: 'categorizeCode',
            width: 100,
          },
          {
            title: '检测分类名称',
            dataIndex: 'categorizeName',
            width: 150,
          },
          {
            title: '检测分类英文',
            dataIndex: 'categorizeTranslate',
            hideInSearch: true,
            width: 150,
            ellipsis: true,
          },
          {
            title: '排序',
            dataIndex: 'categorizeSort',
            hideInSearch: true,
            width: 100,
            sorter: (a, b) => a.menuSort - b.menuSort,
          },
          {
            title: '备注',
            dataIndex: 'remark',
            hideInSearch: true,
            width: 200,
            ellipsis: true,
          },
        ]}
        actionRef={actionRef}
        request={
          async (params) => {
            const result = await getDetectionCategorizeListPage(params);
            return {
              data: result.data.rows,
              success: result.success,
              total: result.data.totalRows
            };
          }
        }
        search={{labelWidth: "auto"}}
        rowKey={(record) => record.categorizeId}
        toolBarRender={() => [
          <AddCategorizeModalForm key={"AddCategorizeModalForm"} actionRef={actionRef}/>,
        ]}
      />
    </PageContainer>
  );
};

