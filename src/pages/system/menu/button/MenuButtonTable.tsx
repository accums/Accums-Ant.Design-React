import type {ActionType} from '@ant-design/pro-components';
import {ModalForm, ProTable} from '@ant-design/pro-components';
import React, {useState} from 'react';
import {getSysMenuButtonListPage} from "@/pages/system/menu/api/MenuButtonApi";
import AddMenuButtonForm from './AddMenuButtonForm';
import {getSysDictListByDictTypeCode} from "@/pages/system/dict/api/DictApi";
import {Button, Tag} from "antd";
import EditMenuButtonForm from './EditMenuButtonForm';
import DeleteMenuButtonPopConfirm from './DeleteMenuButtonPopConfirm';
import {EditOutlined} from "@ant-design/icons";

export default (param: { record: any }) => {

  if (!param.record) {
    return null;
  }

  const [buttonId, setButtonId] = useState<string>('');

  const actionRef = React.useRef<ActionType>();

  return (
    <ModalForm
      trigger={<Button ghost size={"small"} style={{marginRight: '10px'}} type="primary"
                       icon={<EditOutlined/>}>配置按钮</Button>}
      submitter={false}>
      <ProTable<any>
        headerTitle={"菜单【" + param.record.menuName + "】"}
        columns={[
          {
            title: '按钮名称',
            dataIndex: 'buttonName',
            width: 100,
            align: "center"
          },
          {
            title: '按钮编码',
            dataIndex: 'buttonCode',
            width: 100,
            align: "center"
          },

          {
            title: '按钮调用接口',
            dataIndex: 'buttonUrl',
            hideInSearch: true,
            width: 200,
            ellipsis: true,
            copyable: true,
            align: "center"
          },
          {
            title: '鉴权标识',
            dataIndex: 'urlAuthority',
            hideInSearch: true,
            valueType: "select",
            width: 100,
            align: "center",
            request: async () => {
              const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "yesOrNot"});
              newVar.data.forEach((item: any) => {
                item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
              })
              return newVar.data
            }
          },
          {
            title: '数据类型',
            dataIndex: 'dataType',
            hideInSearch: true,
            valueType: "select",
            width: 100,
            align: "center",
            request: async () => {
              const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "dataType"});
              newVar.data.forEach((item: any) => {
                item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
              })
              return newVar.data
            }
          },
        ]}
        search={false}
        rowSelection={{
          selectedRowKeys: [buttonId],
          type: "radio",
          onChange: function (selectedRowKeys, selectedRows,) {
            if (selectedRows[0].buttonId) {
              setButtonId(selectedRows[0].buttonId)
              return;
            }
          }
        }}
        tableAlertOptionRender={false}
        tableAlertRender={false}
        actionRef={actionRef}
        params={{"menuId": param.record.menuId}}
        request={
          async (params) => {
            const result = await getSysMenuButtonListPage(params);
            if (result.data.rows.length > 0) {
              setButtonId(result.data.rows[0].buttonId);
            } else {
              setButtonId('')
            }
            return {
              data: result.data.rows,
              success: result.success,
            };
          }
        }
        onRow={(record) => {
          return {
            onClick: () => {
              setButtonId(record.buttonId);
            },
          };
        }}
        rowKey={(record) => record.buttonId}
        toolBarRender={() => {
          return [
            <AddMenuButtonForm key={"AddMenuButtonForm"} menuId={param.record.menuId} actionRef={actionRef}/>,
            <EditMenuButtonForm key={"EditMenuButtonForm"} buttonId={buttonId} menuId={param.record.menuId}
                                actionRef={actionRef}/>,
            <DeleteMenuButtonPopConfirm key={"DeleteMenuButtonPopConfirm"} buttonId={buttonId} actionRef={actionRef}/>,
          ]
        }}
      />
    </ModalForm>
  );
};

