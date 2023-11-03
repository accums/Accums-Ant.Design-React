import {ActionType, PageContainer, ProTable} from '@ant-design/pro-components';
import React, {useState} from 'react';
import EditOrgModalForm from './EditOrgModalForm';
import DelOrgPopConfirm from './DelOrgPopConfirm';
import AddOrgModalForm from './AddOrgModalForm';
import {getSysDictListByDictTypeCode} from "@/pages/system/dict/api/DictApi";
import {Button, Tag} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

export default (props: { dataSource: any }) => {
  const actionRef = React.useRef<ActionType>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  return (
    <PageContainer>
      <ProTable<any>
        columns={[
          {
            title: '机构名称',
            dataIndex: 'orgName',
            width: 100
          },
          {
            title: '机构编码',
            dataIndex: 'orgCode',
            width: 100
          },
          {
            title: '机构类型',
            dataIndex: 'orgType',
            width: 100,
            valueType: 'select',
            request: async () => {
              const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "orgType"});
              newVar.data.forEach((item: any) => {
                item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
              })
              return newVar.data
            }
          },
          {
            title: '排序',
            dataIndex: 'orgSort',
            hideInSearch: true,
            width: 100,
            sorter: (a, b) => a.orgSort - b.orgSort,
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            hideInSearch: true,
            ellipsis: true,
            width: 150
          },
          {
            title: '更新时间',
            dataIndex: 'updateTime',
            hideInSearch: true,
            ellipsis: true,
            width: 150
          },
          {
            title: '备注',
            dataIndex: 'remark',
            hideInSearch: true,
            ellipsis: true,
            width: 150

          },
        ]}
        rowSelection={{
          type: "radio",
          selectedRowKeys: selectedRowKeys,
          onChange: function (selectedRowKeys, selectedRows) {
              if (selectedRows[0].orgId) {
                setSelectedRowKeys(selectedRowKeys)
                return;
              }
          },
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              if (selectedRowKeys.includes(record.orgId)) {
                setSelectedRowKeys([])
              } else {
                setSelectedRowKeys([record.orgId])
              }
            },
          };
        }}
        tableAlertRender={({selectedRowKeys}) => {
          if (selectedRowKeys.length === 1) {
            return [
              <EditOrgModalForm key={"EditOrgModalForm"}
                                trigger={<Button ghost size={"small"} style={{marginRight: '10px'}} type="primary"
                                                 icon={<EditOutlined/>}>更新</Button>}
                                actionRef={actionRef}
                                orgId={selectedRowKeys[0]}/>,

            ]
          }
          return []
        }}
        tableAlertOptionRender={({}) => {
          if (selectedRowKeys.length === 1) {
            return [
              <DelOrgPopConfirm key={"DelOrgPopConfirm"}
                                trigger={<Button ghost danger type="primary" style={{marginRight: '10px'}}
                                                 size={"small"} icon={<DeleteOutlined/>}>删除</Button>}
                                actionRef={actionRef}
                                setSelectedRowKeys={setSelectedRowKeys}
                                orgId={selectedRowKeys[0]}/>,
            ]
          }
          return []
        }}
        actionRef={actionRef}
        rowKey={(record) => record.orgId}
        pagination={false}
        expandable={{
          defaultExpandAllRows: false,
          expandRowByClick: false
        }}
        request={props.dataSource}
        toolbar={{
          actions: [
            <AddOrgModalForm key={"AddOrgModalForm"} trigger={"新建机构"} actionRef={actionRef}/>,
          ],
        }}
      />
    </PageContainer>
  )
}
