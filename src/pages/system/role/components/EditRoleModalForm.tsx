import {
    ModalForm, ProFormDigit,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-components';
import {Button, message, Tag} from 'antd';
import React from "react";
import {getSysDictListByDictTypeCode} from "@/pages/system/dict/api/DictApi";
import {editSysRole, getSysRoleByRoleId} from "@/pages/system/role/api/RoleApi";
import {EditOutlined} from "@ant-design/icons";

export default (props: { actionRef: any, roleId: any }) => {
    return (
        <ModalForm
            {...{
                labelCol: {span: 5},
                wrapperCol: {span: 14},
            }}
            layout={"horizontal"}
            title="编辑角色"
            trigger={<Button ghost size={"small"} style={{marginRight: '10px'}} type="primary"
                             icon={<EditOutlined/>}>更新</Button>}
            autoFocusFirstInput
            modalProps={{
                destroyOnClose: true,
            }}
            params={{roleId: props.roleId}}
            request={async (params) => {
                const newVar = await getSysRoleByRoleId(params);
                return newVar.data;
            }}
            onFinish={async (values) => {
                let newVar = await editSysRole(values);
                if (newVar.data) {
                    message.success('角色编辑成功');
                    props.actionRef.current?.reload()
                    return true;
                } else {
                    message.error('角色编辑失败，请重试');
                    return false;
                }
            }}
        >
            <ProFormText hidden={true} width="xl" name="roleId" label="角色ID"
                         rules={[{required: true}]}/>
            <ProFormText disabled width="xl" name="version" label="版本号"
                         rules={[{required: true}]}/>
            <ProFormText width="xl" name="roleName" label="角色名称" rules={[{required: true}]}/>
            <ProFormSelect width="xl" name="dataScopeType" label="数据范围" rules={[{required: true}]}
                           request={async () => {
                               const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "dataScopeType"});
                               newVar.data.forEach((item: any) => {
                                   item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                               })
                               return newVar.data
                           }}
            />
            <ProFormSelect width="xl" name="dataType" label="角色类型" rules={[{required: true}]}
                           request={async () => {
                               const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "dataType"});
                               newVar.data.forEach((item: any) => {
                                   item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                               })
                               return newVar.data
                           }}
            />
            <ProFormDigit width="xl" name="roleSort" label="排序" initialValue={99} rules={[{required: true}]}/>
            <ProFormTextArea width="xl" name="remark" label="备注"/>
        </ModalForm>
    );
};
