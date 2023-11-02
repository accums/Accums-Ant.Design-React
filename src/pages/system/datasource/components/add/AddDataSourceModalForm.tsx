import {
    ActionType, ModalForm,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-components';
import {Alert, Button, message} from 'antd';
import React, {} from "react";
import {PlusOutlined} from "@ant-design/icons";

import {addSysDataSource} from "@/pages/system/datasource/api/DataSourceApi";

export default (props: { actionRef: React.MutableRefObject<ActionType | undefined> }) => {

    return (
        <ModalForm<any>
            {...{
                labelCol: {span: 5},
                wrapperCol: {span: 14},
            }}
            layout={"horizontal"}
            title="新建数据源"
            trigger={<Button type="primary" icon={<PlusOutlined/>}>新建数据源</Button>}
            autoFocusFirstInput
            modalProps={{
                destroyOnClose: true,
            }}
            onFinish={async (values) => {
                let newVar = await addSysDataSource(values);
                if (newVar.data) {
                    message.success('新建数据源成功');
                    props.actionRef.current?.reload()
                    return true;
                } else {
                    message.error('新建数据源失败，请重试');
                    return false;
                }
            }}
        >
            <ProFormText width="xl" name="dataSourceName" label="数据源名称"
                         tooltip={"数据源别名，不可重复，用于区分动态数据源，下划线会对数据源进行分组"}
                         rules={[{required: true}]}/>
            <ProFormText width="xl" name="dataSourceUrl" label="数据源地址"
                         tooltip={"例如：jdbc:mysql://127.0.0.1:3306/name"}
                         rules={[{required: true}]}/>
            <ProFormText width="xl" name="dataSourceUser" label="地址账号" rules={[{required: true}]}/>
            <ProFormText.Password width="xl" name="dataSourcePassword" label="地址密码" rules={[{required: true}]}/>
            <ProFormText width="xl" name="driverClassName" label="数据源驱动" tooltip={"按需填写"}/>
            <ProFormTextArea width="xl" name="remark" label="备注"/>

            <Alert message="请填写真实数据 提交时将对数据源进行连接测试" type="info" closable  showIcon />

        </ModalForm>
    );
};
