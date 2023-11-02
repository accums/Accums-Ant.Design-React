import {PlusOutlined} from '@ant-design/icons';
import {
    ActionType, ModalForm, ProFormDigit,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-components';
import {Button, message, Tag} from 'antd';
import React from "react";
import {getSysDictListByDictTypeCode} from "@/pages/system/dict/api/DictApi";
import {addSysRole} from "@/pages/system/role/api/RoleApi";

export default (props: { actionRef: React.MutableRefObject<ActionType | undefined> }) => {
    return (
        <ModalForm
            {...{
                labelCol: {span: 5},
                wrapperCol: {span: 14},
            }}
            layout={"horizontal"}
            title="新建角色"
            trigger={
                <Button type="primary"><PlusOutlined/>新建角色</Button>
            }
            autoFocusFirstInput
            modalProps={{
                destroyOnClose: true,
            }}
            onFinish={async (values) => {
                let newVar = await addSysRole(values);
                if (newVar.data) {
                    message.success('角色添加成功');
                    props.actionRef.current?.reload()
                    return true;
                } else {
                    message.error('角色添加失败，请重试');
                    return false;
                }
            }}
        >
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
            <ProFormDigit width="md" name="roleSort" label="排序" initialValue={99} rules={[{required: true}]}/>
            <ProFormTextArea width="xl" name="remark" label="备注"/>
        </ModalForm>
    );
};
