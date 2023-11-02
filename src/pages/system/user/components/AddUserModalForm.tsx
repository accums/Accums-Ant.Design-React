import {
    ActionType, ModalForm,
    ProFormSelect,
    ProFormText,
    ProFormTreeSelect,
} from '@ant-design/pro-components';
import {Button, message, Tag} from 'antd';
import React, {} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {getSysPositionList} from "@/pages/system/position/api/PositionApi";
import {addSysUser} from "@/pages/system/user/api/UserApi";
import {getSysOrganizationTreeList} from "@/pages/system/organization/api/OrgApi";
import {getSysDictListByDictTypeCode} from "@/pages/system/dict/api/DictApi";

export default (props: { actionRef: React.MutableRefObject<ActionType | undefined> }) => {

    return (
        <ModalForm<any>{...{
            labelCol: {span: 5},
            wrapperCol: {span: 14},
        }}
                       layout={"horizontal"}
                       title="新建用户"
                       trigger={<Button type="primary" icon={<PlusOutlined/>}>新建</Button>}
                       modalProps={{
                           destroyOnClose: true,
                       }}
                       onFinish={async (values) => {
                           let newVar = await addSysUser(values);
                           if (newVar.data) {
                               message.success('新增用户成功');
                               props.actionRef.current?.reload()
                               return true;
                           } else {
                               message.error('新增用户失败，请重试');
                               return false;
                           }
                       }}
        >
            <ProFormTreeSelect width="xl" name="orgId" label="所属机构" rules={[{required: true}]}
                               placeholder={"请选择"}
                               fieldProps={{
                                   showSearch: true,
                                   //默认展开
                                   treeDefaultExpandAll: true,
                                   //显示清除按钮
                                   allowClear: true,
                               }}
                               request={async () => {
                                   const newVar = await getSysOrganizationTreeList({});
                                   return newVar.data;
                               }}
            />
            <ProFormText width="xl" name="account" label="登录账号"
                         rules={[{required: true}]}/>
            <ProFormText.Password width="xl" name="password" label="登录密码"
                         rules={[{required: true}]}/>
            <ProFormText width="xl" name="nickName" label="系统昵称"
                         rules={[{required: true}]}/>
            <ProFormText validateStatus={"success"} width="xl" name="phone" label="手机号码"/>
            <ProFormSelect width="xl" name="positionId" label="职位"
                           placeholder={"请选择"}
                           fieldProps={{
                               showSearch: true,
                               allowClear: true,
                           }}
                           request={async () => {
                               const newVar = await getSysPositionList({});
                               return newVar.data;
                           }}
            />
            <ProFormSelect width="xl" name="gender" label="性别"
                           request={async () => {
                               const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "gender"});
                               newVar.data.forEach((item: any) => {
                                   item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                               })
                               return newVar.data
                           }}
            />
            <ProFormText width="xl" name="email" label="邮箱"/>
        </ModalForm>
    );
};