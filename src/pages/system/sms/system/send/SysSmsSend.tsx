import {
  ProForm, ProFormDateTimePicker, ProFormSelect,
  ProFormText, ProFormTextArea,
} from '@ant-design/pro-components';
import React, {useState} from 'react';
import {Alert, message, Spin} from "antd";
import {alibabaSms, getSendAlibabaSmsResult} from "@/pages/system/sms/system/api/SmsSendApi";

export default () => {

  //控制Loading的执行与结束
  const [spinning, setSpinning] = useState<boolean | undefined>(false);

  //发送阶段
  const [sendingStage, setSendingStage] = useState("调用第三方API发送中...");


  async function run() {
    for (let i = 0; i < 1; i++) {
      // 在这里编写每一段代码的逻辑
      await new Promise(resolve => {
        setTimeout(resolve, 1000);
      }); // 等待2秒钟
    }
  }

  return (
    <>
      <Spin size="large" tip={sendingStage} spinning={spinning}>
        <Alert
          banner
          showIcon={false}
          message={
            <div>
              <h4>1. 发送前确保套餐包余量或账户资金充足，以保证短信发送成功。</h4>
              <h4>2.
                只有使用经过审核的签名和模板才被允许发送短信，建议申请符合业务真实场景的签名、模板。</h4>
              <h4>3. 手机号若未添加至白名单，会受到发送限制。被设置成黑名单的手机号将无法发送短信。</h4>
            </div>}
        />
        <p></p>
        <ProForm
          layout={"vertical"}
          onFinish={async (params) => {
            //1 - 转动
            setSpinning(true)
            try {
              const result = await alibabaSms(params);
              if (result.data && result.data.bizId) {
                //1 - 最少要转2秒
                await run()
                //1 - 第一次转动期间 更换等待时显示的内容 需要第二次转动生效
                setSendingStage("调用第三方API发送成功，发送回执为：" + result.data.bizId);
                //1 - 停止
                setSpinning(false)
                //2 - 转动 内容已经修改
                setSpinning(true)
                //2 - 最少要转2秒
                await run()
                //2 第二次转动期间 更换等待时显示的内容 需要第三次转动生效
                setSendingStage("正在查询发送回执. 等待返回发送结果...");
                //2 - 停止
                setSpinning(false)
                //3 - 转动
                setSpinning(true)
                //3- 最少要转2秒
                await run()
                const smsResult = await getSendAlibabaSmsResult({smsSendRecordId: result.data.smsSendRecordId})
                if (smsResult.data) {
                  message.success("发送成功")
                  //3 - 停止
                  setSpinning(false)
                } else {
                  message.warning("发送失败")
                }
              } else {
                message.warning(result.data.message)
              }
            } catch (e) {
              setSpinning(false)
              setSendingStage("调用第三方API发送中...")
            } finally {
              setSpinning(false)
              setSendingStage("调用第三方API发送中...")
            }
          }}
        >

          <ProForm.Group>
            <ProFormSelect
              width={"md"}
              label="短信服务商"
              name={'type'}
              rules={[{required: true}]}
              tooltip={"提供短信服务的第三方平台  例如阿里云 腾讯云等"}
              initialValue={'阿里云'}
              options={[{label: "阿里云", value: '阿里云'}, {label: "腾讯云", value: '腾讯云'}]}
            />

            <ProFormSelect
              width="md"
              name="signName"
              label="短信签名"
              initialValue={"阿里云短信测试"}
              rules={[{required: true}]}
              options={[{label: "阿里云短信测试", value: "阿里云短信测试"}]}
            />
            <ProFormSelect
              width="md"
              name="templateCode"
              label="短信模板"
              initialValue={"SMS_154950909"}
              rules={[{required: true}]}
              options={[{label: "阿里云短信测试模板", value: "SMS_154950909"}]}
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormTextArea
              disabled={true}
              width="md"
              name="templateContent"
              label="模板内容"
              initialValue={"您正在使用阿里云短信测试服务，体验验证码是：${code}，如非本人操作，请忽略本短信！"}
              rules={[{required: true}]}
            />
            <ProFormTextArea
              width="md"
              name="templateParam"
              label="模板参数"
              initialValue={"{\"code\":\"1234\"}"}
              rules={[{required: true}]}
            />
          </ProForm.Group>
          <ProFormDateTimePicker
            fieldProps={{
              showTime: true,
            }}
            width="md"
            label="过期时间"
          />
          <ProFormText
            width="md"
            name="phoneNumbers"
            label="接收手机号"
            initialValue={'19822622620'}
            rules={[{required: true}]}
          />
        </ProForm>
      </Spin>
    </>
  );
};
