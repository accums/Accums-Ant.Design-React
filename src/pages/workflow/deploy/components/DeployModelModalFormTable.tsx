import {ModalForm, ProTable,} from '@ant-design/pro-components';
import {Button,} from 'antd';
import React from "react";
import {UnorderedListOutlined} from "@ant-design/icons";
import {selectActReDefineListPage} from "@/pages/workflow/define/api/defineApi";

export default (props: { model: any }) => {

  return (
    <ModalForm
      title={"部署记录"}
      width={1000}
      trigger={<Button ghost size={"small"} style={{marginRight: '10px'}} type="primary"
                       icon={<UnorderedListOutlined/>}>部署记录</Button>}
      modalProps={{
        destroyOnClose: true,
      }}
      submitter={false}
    >
      <ProTable<any>
        columns={[
          {
            title: '部署时间',
            dataIndex: 'deploymentTime',
            align: "center",
            ellipsis: true,
            width: 150
          },
          {
            title: '部署ID_',
            dataIndex: 'deploymentId',
            ellipsis: true,
            align: "center",
            copyable: true,
            width: 150
          },
          {
            title: 'KEY',
            align: "center",
            dataIndex: 'key',
            width: 150
          },
          {
            title: '部署名称',
            align: "center",
            dataIndex: 'name',
            width: 150
          },
          {
            title: '部署描述',
            align: "center",
            dataIndex: 'description',
            ellipsis: true,
            width: 150
          },
        ]}
        request={
          async (params) => {
            const key = {key: props.model.modelKey};
            Object.assign(params, key)
            const result = await selectActReDefineListPage(params);
            return {
              data: result.data.rows,
              success: result.success,
              total: result.data.totalRows,
            };
          }
        }
        rowKey={(record) => record.deploymentId}
        search={false}
      />
    </ModalForm>
  );
};
