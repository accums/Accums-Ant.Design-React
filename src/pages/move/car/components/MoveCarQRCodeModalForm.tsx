import {ModalForm,} from '@ant-design/pro-components';
import {Card, Divider, Tag} from 'antd';
import React from "react";

export default (props: { entity: any }) => {

  return (
    <ModalForm
      title="挪车界面"
      trigger={<a>预览</a>}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: false,
      }}
    >
      <Divider></Divider>
      <div style={{textAlign: "center"}}>
        <h2 style={{fontWeight: "bold"}}>无意挡路，敬请理解</h2>
        <h3>临时停靠，请多关照</h3>
        <br/>
        <Tag color={"blue"} style={{fontSize: '17px'}}>蓝牌</Tag>
        <Tag color={"blue"} style={{fontSize: '17px'}}>苏AU7Z56</Tag>
        <br/>
        <br/>
        <Card style={{textAlign: "left"}}>
          <h3 style={{fontWeight: "bold"}}>第一步：请确认车牌号是否正确</h3>
          <p>一、请核实上方展示的车牌信息是否和需挪车车辆一致。</p>
          <h3 style={{fontWeight: "bold"}}>第二步：选择联系方式与我联系</h3>
          <p>一、点击发送短信，将会弹出短信发送界面手机号码自动填充，短信内容自动填充，点击发送按钮即可。</p>
          <p>二、点击拨打电话，将会弹出电话拨打界面手机号码自动填充，直接拨打电话即可</p>
          <p>三、短信费与电话费，均由运营商收取。</p>
          <h3 style={{fontWeight: "bold"}}>第三步：联系成功 等待车主挪车</h3>
          <p>一、您的短信已经发送成功，或者电话联系上了车主，请稍等片刻。</p>
          <p>二、非常抱歉，请耐心等待，车主正在速速赶来。</p>
        </Card>
      </div>
    </ModalForm>
  );
};
