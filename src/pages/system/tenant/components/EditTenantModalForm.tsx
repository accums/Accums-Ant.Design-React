import {
    ModalForm,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-components';
import { message} from 'antd';
import React, {} from "react";

import {editSysTenant, getSysTenantById} from "@/pages/system/tenant/api/TenantApi";

export default (props: { actionRef: any, tenantId: any }) => {

    return (
        <ModalForm<any>
            {...{
                labelCol: {span: 5},
                wrapperCol: {span: 14},
            }}
            layout={"horizontal"}
            title="编辑租户"
            trigger={<a>编辑</a>}
            autoFocusFirstInput
            modalProps={{
                destroyOnClose: true,
            }}
            params={{tenantId: props.tenantId}}
            request={async (params) => {
                const newVar = await getSysTenantById(params);
                return newVar.data;
            }}
            onFinish={async (values) => {
                let newVar = await editSysTenant(values);
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
            <ProFormText width="xl" disabled name="version" label="版本号" rules={[{required: true}]}/>
            <ProFormText hidden={true} width="xl" name="tenantId" label="租户编号" rules={[{required: true}]}/>
            <ProFormText width="xl" name="tenantName" label="租户名称" rules={[{required: true}]}/>
            <ProFormText width="xl" name="tenantCode" label="租户编码" rules={[{required: true}]}/>
            <ProFormText width="xl" name="tenantLogo" label="租户图标"/>
            <ProFormTextArea width="xl" name="remark" label="备注"/>
        </ModalForm>
    );
};
