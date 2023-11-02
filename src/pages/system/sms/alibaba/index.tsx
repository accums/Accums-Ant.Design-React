import {
    PageContainer,
    ProCard,
} from '@ant-design/pro-components';
import React from 'react';
import AlibabaSmsSend from "@/pages/system/sms/alibaba/send/AlibabaSmsSend";
import AlibabaSmsSendRecord from "@/pages/system/sms/alibaba/record/AlibabaSmsSendRecord";
import AlibabaSmsTemplateProTable from './template/AlibabaSmsTemplateProTable';

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
                        <AlibabaSmsTemplateProTable key={'AlibabaSmsTemplateTable'} />
                    </ProCard>
                </ProCard.TabPane>


                <ProCard.TabPane key="SmsSend" tab="发送短信">
                    <ProCard layout={"center"} bordered={false} tabs={{type: 'line',}}>
                        <ProCard.TabPane key="SendSms" tab="单次发送短信">
                            <ProCard>
                                <AlibabaSmsSend/>
                            </ProCard>
                        </ProCard.TabPane>
                        <ProCard.TabPane key="SendSmsB" tab="批量发送短信">
                            <ProCard>
                                待开发.....
                            </ProCard>
                        </ProCard.TabPane>
                    </ProCard>
                </ProCard.TabPane>


                <ProCard.TabPane key="SmsSendRecord" tab="发送记录">
                    <ProCard>
                        <AlibabaSmsSendRecord/>
                    </ProCard>
                </ProCard.TabPane>


            </ProCard>
        </PageContainer>
    );
};
