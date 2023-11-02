import {
    ModalForm, ProFormDigit,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
    ProFormTreeSelect,
} from '@ant-design/pro-components';
import {message, Tag} from 'antd';
import React, {} from "react";
import {
    editSysOrganization,
    getSysOrganizationById, getSysOrganizationTreeList
} from "@/pages/system/organization/api/OrgApi";
import {getSysDictListByDictTypeCode} from "@/pages/system/dict/api/DictApi";

export default (props: any) => {

    return (
        <ModalForm<any>
            {...{
                labelCol: {span: 5},
                wrapperCol: {span: 14},
            }}
            layout={"horizontal"}
            title="编辑机构"
            trigger={props.trigger}
            autoFocusFirstInput
            modalProps={{
                destroyOnClose: true,
            }}
            params={{orgId: props.orgId}}
            request={async (params) => {
                const newVar = await getSysOrganizationById(params);
                return newVar.data;
            }}
            onFinish={async (values) => {
                let newVar = await editSysOrganization(values);
                if (newVar.data) {
                    message.success('编辑成功');
                    props.actionRef.current?.reload()
                    return true;
                } else {
                    message.error('编辑失败，请重试');
                    return false;
                }
            }}
        >
            <ProFormText disabled width="xl" name="version" label="版本号"/>
            <ProFormTreeSelect width="xl" name="orgParentId" label="上级机构"
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
            <ProFormText hidden={true} name="orgId" label="机构ID" rules={[{required: true}]}/>
            <ProFormText width="xl" name="orgName" label="机构名称" rules={[{required: true}]}/>
            <ProFormText width="xl" name="orgCode" label="机构编码" rules={[{required: true}]}/>
            <ProFormSelect width="xl" name="orgType" label="机构类型" rules={[{required: true}]}
                           request={async () => {
                               const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "orgType"});
                               newVar.data.forEach((item: any) => {
                                   item.label = <Tag color={item.antDesignTagColor}> {item.label.toString()} </Tag>
                               })
                               return newVar.data
                           }}
            />
            <ProFormDigit width="xl" name="orgSort" label="排序号" rules={[{required: true}]}/>
            <ProFormTextArea width="xl" name="remark" label="备注"/>
        </ModalForm>
    );
};
