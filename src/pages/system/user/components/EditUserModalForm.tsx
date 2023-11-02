import {
    ModalForm,
    ProFormSelect,
    ProFormText,
    ProFormTreeSelect,
} from '@ant-design/pro-components';
import {Button, message, Tag} from 'antd';
import React, {} from "react";
import {EditOutlined} from "@ant-design/icons";
import {getSysOrganizationTreeList} from "@/pages/system/organization/api/OrgApi";
import {getSysPositionList} from "@/pages/system/position/api/PositionApi";
import {getSysDictListByDictTypeCode} from "@/pages/system/dict/api/DictApi";
import {editSysUser, getSysUserResultById} from "@/pages/system/user/api/UserApi";


export default (props: { actionRef: any, userId: any }) => {

    return (
        <ModalForm<any>
            {...{
                labelCol: {span: 5},
                wrapperCol: {span: 14},
            }}
            layout={"horizontal"}
            title="编辑用户"
            trigger={<Button type="primary" style={{marginRight: '10px'}} size={"small"}
                             icon={<EditOutlined/>}>编辑</Button>}
            autoFocusFirstInput
            modalProps={{
                destroyOnClose: true,
            }}
            params={{userId: props.userId}}
            request={async (params) => {
                const newVar = await getSysUserResultById(params);
                return newVar.data;
            }}
            onFinish={async (values) => {
                let newVar = await editSysUser(values);
                if (newVar.data) {
                    message.success('编辑用户成功');
                    props.actionRef.current?.reload()
                    return true;
                } else {
                    message.error('编辑用户失败，请重试');
                    return false;
                }
            }}
        >
            <ProFormText width="xl" hidden={true} name="userId" label="用户ID"/>
            <ProFormText width="xl" disabled name="version" label="版本号"/>
            <ProFormText width="xl" name="account" label="登录账号"
                         rules={[{required: true}]}/>
            <ProFormText.Password width="xl" name="password" label="登录密码"/>
            <ProFormTreeSelect width="xl" name="orgId" label="所属机构" rules={[{required: true}]}
                               placeholder={"请选择"}
                               fieldProps={{
                                   showSearch: true,
                                   treeDefaultExpandAll: true,
                                   allowClear: true,
                               }}
                               request={async () => {
                                   const newVar = await getSysOrganizationTreeList({});
                                   return newVar.data;
                               }}
            />
            <ProFormText width="xl" name="nickName" label="系统昵称" rules={[{required: true}]}/>
            <ProFormText width="xl" name="phone" label="手机号码"/>
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