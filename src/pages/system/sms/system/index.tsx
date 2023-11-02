import {
    PageContainer,
    ProCard,
} from '@ant-design/pro-components';
import React from 'react';
import SysSmsSend from "@/pages/system/sms/system/send/SysSmsSend";
import SysSmsSendRecord from "@/pages/system/sms/system/record/SysSmsSendRecord";
import SysSmsTemplateProTable from './template/SysSmsTemplateProTable';

export default () => {

    return (
        <PageContainer>
            <ProCard layout={"center"} bordered={true} tabs={{type: 'card',}}>

                <ProCard.TabPane key="signName" tab="短信签名">
                    <ProCard>
                        待开发...
                    </ProCard>
                </ProCard.TabPane>

                <ProCard.TabPane key="template" tab="短信模板">
                    <ProCard>
                        <SysSmsTemplateProTable />
                    </ProCard>
                </ProCard.TabPane>

                <ProCard.TabPane key="SmsSend" tab="发送短信">
                    <ProCard>
                        <SysSmsSend />
                    </ProCard>
                </ProCard.TabPane>

                <ProCard.TabPane key="SysSmsSendRecord" tab="发送记录">
                    <ProCard>
                        <SysSmsSendRecord />
                    </ProCard>
                </ProCard.TabPane>

            </ProCard>
        </PageContainer>
    );
};
