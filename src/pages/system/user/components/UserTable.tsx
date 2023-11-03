import {ActionType} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import {Spin, Switch, Tag} from 'antd';
import AddUserModalForm from "@/pages/system/user/components/AddUserModalForm";
import {getSysUserListPage, updateSysUserStatus} from "@/pages/system/user/api/UserApi";
import EditUserModalForm from '@/pages/system/user/components/EditUserModalForm';
import DelUserPopConfirm from "@/pages/system/user/components/DelUserPopConfirm";
import {getSysDictListByDictTypeCode} from "@/pages/system/dict/api/DictApi";
import UserBindRoleModal from "@/pages/system/role/components/UserBindRoleModal";


export default (props: { orgId: any }) => {
  const actionRef = React.useRef<ActionType>();
  const [spinning, setSpinning] = useState<boolean | undefined>(false);
  const [tableListDataSource, setTableListDataSource] = useState<any>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  useEffect(() => {
    if (props.orgId) {
      SysUserList().then()
    }
  }, [props.orgId]);

  const SysUserList = async () => {

    try {
      setSpinning(true)
      const states = await getSysUserListPage(() => {
      }, props.orgId, undefined);
      setTableListDataSource(states.data.rows)
      setSpinning(false)
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <Spin key={"UserTable"} size="large" spinning={spinning}>
      <ProTable<any>
        columns={
          [
            {
              title: '账号',
              dataIndex: 'account',
              width: 100,
              align: "center"
            },
            {
              title: '姓名',
              dataIndex: 'nickName',
              width: 100,
              align: "center"
            },
            {
              title: '头像',
              dataIndex: 'avatar',
              valueType: "image",
              hideInSearch: true,
              width: 100,
              align: "center"
            },
            {
              title: '性别',
              dataIndex: 'gender',
              valueType: "select",
              hideInSearch: true,
              width: 100,
              align: 'center',
              request: async () => {
                const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "gender"});
                newVar.data.forEach((item: any) => {
                  item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                })
                return newVar.data
              }
            },
            {
              title: '权限类型',
              dataIndex: 'superAdmin',
              hideInSearch: true,
              valueType: "select",
              width: 100,
              align: "center",
              request: async () => {
                const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "superAdmin"});
                newVar.data.forEach((item: any) => {
                  item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                })
                return newVar.data
              }
            },
            {
              title: '机构',
              dataIndex: 'orgName',
              hideInSearch: true,
              width: 100,
              align: "center"
            },
            {
              title: '职位',
              dataIndex: 'positionName',
              width: 100,
              hideInSearch: true,
              align: "center",
            },
            {
              title: '邮箱',
              dataIndex: 'email',
              width: 100,
              hideInSearch: true,
              align: "center"
            },
            {
              title: '电话',
              dataIndex: 'phone',
              hideInSearch: true,
              width: 100,
              align: "center"
            },
            {
              title: '启用',
              dataIndex: 'status',
              valueType: "switch",
              hideInSearch: true,
              align: "center",
              width: 100,
              render: (text, record) => {
                return (
                  <>
                    <Switch
                      size={"small"}
                      key={"UserTableSwitch"}
                      checked={record.status === "0"}
                      onChange={async (value) => {
                        if (value) {
                          record.status = "0"
                        } else {
                          record.status = "1"
                        }
                        let newVar = await updateSysUserStatus({
                          "userId": record.userId,
                          "status": record.status
                        })
                        if (newVar.data) {
                          actionRef.current?.reload()
                        }
                      }}
                    />
                  </>
                )
              },
            },
          ]}
        rowSelection={{
          type: "radio",
          selectedRowKeys: selectedRowKeys,
          onChange: function (selectedRowKeys, selectedRows) {
            if (selectedRows[0].userId) {
              setSelectedRowKeys(selectedRowKeys)
              return;
            }
          },
        }}
        // onRow={(record) => {
        //   return {
        //     onClick: () => {
        //       if (selectedRowKeys.includes(record.userId)) {
        //         setSelectedRowKeys([])
        //       } else {
        //         setSelectedRowKeys([record.userId])
        //       }
        //     },
        //   };
        // }}
        tableAlertRender={({}) => {
          if (selectedRowKeys.length === 1) {
            return [
              <EditUserModalForm actionRef={actionRef} userId={selectedRowKeys[0]} key={"EditUserModalForm"}/>,
              <UserBindRoleModal actionRef={actionRef} userId={selectedRowKeys[0]} key={"UserBindRoleModal"}/>,
            ]
          }
          return []
        }}
        tableAlertOptionRender={() => {
          if (selectedRowKeys.length === 1) {
            return [
              <DelUserPopConfirm actionRef={actionRef} userId={selectedRowKeys[0]} key={"DelUserPopConfirm"}
                                 setSelectedRowKeys={setSelectedRowKeys}/>,
            ]
          }
          return []
        }}
        actionRef={actionRef}
        request={async (params) => {
          if (props.orgId !== '' && props.orgId !== undefined) {
            const result = await getSysUserListPage(params, props.orgId);
            setTableListDataSource(result.data.rows)
            return {
              data: result.data,
              success: result.success,
              total: result.data.totalRows,
            };
          }
          return {
            data: undefined,
            success: false,
          };
        }}
        dataSource={tableListDataSource}
        rowKey={(record) => record.userId}
        toolBarRender={() => [
          <AddUserModalForm key={"AddUserModalForm"} actionRef={actionRef}/>
        ]}
      />
    </Spin>
  );
};
