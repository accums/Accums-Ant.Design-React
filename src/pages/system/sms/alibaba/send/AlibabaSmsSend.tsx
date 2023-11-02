import {
    ProForm, ProFormSelect,
    ProFormText,
} from '@ant-design/pro-components';
import React from 'react';
import {Alert, message} from "antd";
import {alibabaCloudSendSms} from "@/pages/system/sms/alibaba/api/AlibabaSmsApi";

export default () => {

    return (
        <>
            <Alert
                banner
                showIcon={false}
                message={
                    <div>
                        <h4>1. 发送前确保套餐包余量或账户资金充足，以保证短信发送成功。</h4>
                        <h4>2. 只有使用经过审核的签名和模板才被允许发送短信，建议申请符合业务真实场景的签名、模板。</h4>
                        <h4>3. 手机号若未添加至白名单，会受到发送限制。被设置成黑名单的手机号将无法发送短信。</h4>
                    </div>}
            />
            <p></p>
            <ProForm
                layout={"vertical"}
                onFinish={async (params) => {
                    let newVar = await alibabaCloudSendSms(params);
                    if (newVar.data.code === "OK") {
                        message.success("发送成功 请注意查收！")
                    } else {
                        message.warning(newVar.data.message)
                    }
                }}
            >
                <ProFormSelect
                    width={"md"}
                    label="产品类型"
                    name={'type'}
                    rules={[{required: true}]}
                    tooltip={"根据自己配置的阿里云账户凭证来定义产品的类型，国际消息需要额外开通"}
                    initialValue={1}
                    options={[{label: "国内短信", value: 1}, {label: "国际短信", value: 2}]}
                />
                <ProFormSelect
                    width="md"
                    name="signName"
                    label="签名"
                    initialValue={"阿里云短信测试"}
                    rules={[{required: true}]}
                    options={[{label: "阿里云短信测试", value: "阿里云短信测试"}]}
                />
                <ProFormSelect
                    width="md"
                    name="templateCode"
                    label="模板"
                    initialValue={"SMS_154950909"}
                    rules={[{required: true}]}
                    options={[{label: "阿里云短信测试模板", value: "SMS_154950909"}]}
                />
                <ProFormText
                    width="md"
                    name="phoneNumbers"
                    label="接收手机号"
                    initialValue={'19822622620'}
                    rules={[{required: true}]}
                />
            </ProForm>
        </>
    );
};
