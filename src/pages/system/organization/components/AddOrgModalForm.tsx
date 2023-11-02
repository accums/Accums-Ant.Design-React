import {
   ModalForm, ProFormDigit,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
    ProFormTreeSelect,
} from '@ant-design/pro-components';
import {Button, message, Tag} from 'antd';
import React, {} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {getSysDictListByDictTypeCode} from "@/pages/system/dict/api/DictApi";
import {addSysOrganization, getSysOrganizationTreeList} from "@/pages/system/organization/api/OrgApi";

export default (props: any) => {

    return (
        <ModalForm<any>
            {...{
                labelCol: {span: 5},
                wrapperCol: {span: 14},
            }}
            layout={"horizontal"}
            title="新建机构"
            trigger={<Button type="primary" icon={<PlusOutlined/>}>{props.trigger}</Button>}
            autoFocusFirstInput
            modalProps={{
                destroyOnClose: true,
            }}
            onFinish={async (values) => {
                let newVar = await addSysOrganization(values);
                if (newVar.data) {
                    message.success('新增成功');
                    props.actionRef.current?.reload()
                    return true;
                } else {
                    message.error('新增失败，请重试');
                    return false;
                }
            }}
        >
            <ProFormTreeSelect width="xl" name="orgParentId" label="上级机构" tooltip="最上级则不填"
                               fieldProps={{
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
            <ProFormText width="xl" name="orgName" label="机构名称" rules={[{required: true}]}/>
            <ProFormText width="xl" name="orgCode" label="机构编码" rules={[{required: true}]}/>
            <ProFormSelect width="xl" name="orgType" label="机构类型" rules={[{required: true}]}
                           request={async () => {
                               const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "orgType"});
                               newVar.data.forEach((item: any) => {
                                   item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                               })
                               return newVar.data
                           }}
            />
            <ProFormDigit width="xl" name="orgSort" label="排序" initialValue={99} rules={[{required: true}]}/>
            <ProFormTextArea width="xl" name="remark" label="备注"/>
        </ModalForm>
    );
};
