import {ActionType, PageContainer, ProTable} from '@ant-design/pro-components';
import React from "react";
import {getMoveCarContactListPage} from "@/pages/move/car/api/MoveCarContactApi";
import AddMoveCarContactModalForm from "@/pages/move/car/components/AddMoveCarContactModalForm";
import {Popover, QRCode} from "antd";
import MoveCarQRCodeModalForm from './components/MoveCarQRCodeModalForm';

export default () => {

  const actionRef = React.useRef<ActionType>();

  return (
    <PageContainer>
      <ProTable<any>
        columns={[
          {
            title: '序号',
            dataIndex: 'moveCarId',
            valueType: "indexBorder",
            width: 50,
          },
          {
            title: '车牌号',
            dataIndex: 'moveCarNumber',
            width: 100,
            ellipsis: true,
            align: "center",
          },
          {
            title: '车辆联系电话',
            dataIndex: 'moveCarPhone',
            width: 100,
            align: "center",
            ellipsis: true
          },
          {
            title: '挪车标语',
            dataIndex: 'moveCarTitle',
            width: 100,
            align: "center",
            ellipsis: true
          },
          {
            title: '个性图标',
            dataIndex: 'moveCarIconUrl',
            width: 100,
            align: "center",
            render: (dom, entity) => {
              return (
                <Popover overlayInnerStyle={{padding: 0}} content={
                  <QRCode errorLevel={'H'} value={entity} icon={entity.moveCarIconUrl}/>}>
                  <img width={30} height={30} src={entity.moveCarIconUrl} alt="icon"/>
                </Popover>
              )
            }
          },
          {
            title: '访问页面',
            dataIndex: 'moveCar',
            width: 100,
            align: "center",
            render: (dom, entity) => {
              return (<MoveCarQRCodeModalForm entity={entity}/>)
            }
          },
          {
            title: '更新时间',
            dataIndex: 'updateTime',
            hideInSearch: true,
            align: "center",
            width: 100,
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            hideInSearch: true,
            align: "center",
            width: 100,
            ellipsis: true
          },
        ]}
        actionRef={actionRef}
        request={
          async (params) => {
            const result = await getMoveCarContactListPage(params);
            return {
              data: result.data.rows,
              success: result.success,
              total: result.data.totalRows
            };
          }
        }
        search={{labelWidth: "auto"}}
        rowKey={(record) => record.moveCarId}
        toolBarRender={
          () => [
            <AddMoveCarContactModalForm key={"AddMoveCarContactModalForm"} actionRef={actionRef}/>,
          ]
        }
      />
    </PageContainer>
  );
};
