import {
    ActionType, ModalForm,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-components';
import {Button, message, } from 'antd';
import React, {} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {addSysTenant} from "@/pages/system/tenant/api/TenantApi";

export default (props: { actionRef: React.MutableRefObject<ActionType | undefined> }) => {

    return (
        <ModalForm<any>
            {...{
                labelCol: {span: 5},
                wrapperCol: {span: 14},
            }}
            layout={"horizontal"}
            title="新建租户"
            trigger={<Button type="primary" icon={<PlusOutlined/>}>新建租户</Button>}
            autoFocusFirstInput
            modalProps={{
                destroyOnClose: true,
            }}
            onFinish={async (values) => {
                let newVar = await addSysTenant(values);
                if (newVar.data) {
                    message.success('新建租户成功');
                    props.actionRef.current?.reload()
                    return true;
                } else {
                    message.error('新建租户失败，请重试');
                    return false;
                }
            }}
        >
            <ProFormText width="xl" name="tenantName" label="租户名称" rules={[{required: true}]}/>
            <ProFormText width="xl" name="tenantCode" label="租户编码" rules={[{required: true}]}/>
            <ProFormText width="xl" name="tenantLogo" label="租户图标" tooltip={"显示在登录页和主页左上角"}/>
            <ProFormTextArea width="xl" name="remark" label="备注"/>
        </ModalForm>
    );
};
