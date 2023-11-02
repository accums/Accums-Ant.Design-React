import {
    ModalForm,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-components';
import {Alert,  message} from 'antd';
import React, {} from "react";

import {editSysDataSource, getSysDataSourceById} from "@/pages/system/datasource/api/DataSourceApi";

export default (props: { actionRef: any, dataSourceId: any }) => {

    return (
        <ModalForm<any>
            {...{
                labelCol: {span: 5},
                wrapperCol: {span: 14},
            }}
            layout={"horizontal"}
            title="编辑数据源"
            trigger={<a>编辑</a>}
            autoFocusFirstInput
            modalProps={{
                destroyOnClose: true,
            }}
            params={{dataSourceId: props.dataSourceId}}
            request={async (params) => {
                const newVar = await getSysDataSourceById(params);
                return newVar.data;
            }}
            onFinish={async (values) => {
                let newVar = await editSysDataSource(values);
                if (newVar.data) {
                    message.success('编辑数据源成功');
                    props.actionRef.current?.reload()
                    return true;
                } else {
                    message.error('编辑数据源失败，请重试');
                    return false;
                }
            }}
        >
            <ProFormText disabled name="version" label="版本号" rules={[{required: true}]}/>
            <ProFormText hidden={true} name="dataSourceId" label="数据源Id" rules={[{required: true}]}/>
            <ProFormText width="xl" name="dataSourceName" label="数据源名称"
                         tooltip={"数据源别名，不可重复，用于区分动态数据源。"}
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
