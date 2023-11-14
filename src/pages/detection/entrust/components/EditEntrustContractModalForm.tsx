import {EditOutlined} from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import {Button, Divider, message, Tag} from 'antd';
import React from "react";
import {getSysDictListByDictTypeCode} from "@/pages/system/dict/api/DictApi";
import {
  getDetectionEntrustContractById,
  updateDetectionEntrustContractById
} from "@/pages/detection/entrust/api/EntrustContractApi";

export default (props: { actionRef: any, selectedRows: any }) => {
  return (
    <ModalForm
      title="更新委托合同数据"
      trigger={<Button disabled={props.selectedRows.entrustStatus !== "1"}
                       ghost size={"small"} type="primary" style={{marginRight: '10px'}}><EditOutlined/>更新</Button>}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
      }}
      request={async () => {
        const result = await getDetectionEntrustContractById({entrustContractId: props.selectedRows.entrustContractId});
        return result.data
      }}
      onFinish={async (values) => {
        let newVar = await updateDetectionEntrustContractById(values);
        if (newVar.data) {
          message.success('更新委托合同数据成功');
          props.actionRef.current?.reload()
          return true;
        } else {
          message.error('更新委托合同数据失败，请重试');
          return false;
        }
      }}
    >
      <br/>
      <ProForm.Group title={"基本信息"}>
        <ProFormText width="md" name="entrustContractId" hidden={true} rules={[{required: true}]}/>
        <ProFormText width="md" name="entrustCode" label="委托合同编号" disabled={true} rules={[{required: true}]}/>
        <ProFormSelect width="md" name="entrustStatus" label="委托状态" disabled={true}
                       rules={[{required: true}]}
                       request={async () => {
                         const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "entrustStatus"});
                         newVar.data.forEach((item: any) => {
                           item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                         })
                         return newVar.data
                       }}/>

        <ProFormSelect width="md" name="detectionType" label="检测类别" initialValue={"1"} rules={[{required: true}]}
                       request={async () => {
                         const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "detectionType"});
                         newVar.data.forEach((item: any) => {
                           item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                         })
                         return newVar.data
                       }}
        />
        <ProFormText width="md" name="detectionUnit" label="检测单位" disabled={true}
                     initialValue={`${localStorage.getItem('tenantName')}`}
                     tooltip={{
                       title: "（a）当检测单位为检测机构时,应填写等级证书中的机构名称,可附加等级证书的编号。" +
                         "（b）当检测单位为工地试验室时,应填写其授权文件上的工地试验室名称。" +
                         "（c）根据《关于进一步加强公路水运工程工地试验室管理工作的意见》(厅质监字[2009]183 号)的规定,工地试验室名称为“母体试验检测机构名称 +建设项目标段名称 +工地试验室“。"
                     }}
                     rules={[{required: true}]}/>

      </ProForm.Group>

      <Divider></Divider>
      <ProForm.Group title={"委托信息"}>
        <ProFormText width="md" name="entrustClient" label="委托人" rules={[{required: true}]}/>
        <ProFormText width="md" name="entrustClientPhone" label="委托人手机号" rules={[{required: true}]}/>
        <ProFormText width="md" name="entrustUnit" label="委托单位" rules={[{required: true}]}/>
        <ProFormText width="md" name="entrustUnitAddress" label="委托单位地址" rules={[{required: true}]}/>
      </ProForm.Group>

      <Divider></Divider>
      <ProForm.Group title={"工程信息"}>
        <ProFormText width="md" name="engineeringName" label="工程名称"
                     tooltip={"工程名称应为检测对象所属工程项目的名称。当检测机构进行盲样管理时,工程名称可不填写。当为工地试验室时,可填写对应的工程项目名称"}/>
        <ProFormText width="md" name="engineeringPositionPurpose" label="工程部位/用途"
                     tooltip={"为二选一填写项。当涉及盲样时可不填写，编制要求如下：\n" +
                       "a) 当可以明确被检对象在工程中的具体位置时，宜填写工程部位名称及起止桩号;\n" +
                       "b) 当被检对象为独立结构物时，宜填写结构物及其构件名称、编号等信息;"}/>
        <ProFormText width="md" name="projectUnit" label="建设单位"/>
        <ProFormText width="md" name="constructionUnit" label="施工单位"/>
        <ProFormText width="md" name="supervisionUnit" label="监理单位"/>
        <ProFormText width="md" name="witness" label="见证人"/>
      </ProForm.Group>

      <Divider></Divider>
      <ProForm.Group title={"报告交付信息"}>
        <ProFormDatePicker width="md" name="reportRequiredTime" label="报告要求时间" rules={[{required: true}]}/>
        <ProFormSelect width="md" name="reportDeliverWay" label="报告交付方式" rules={[{required: true}]}
                       request={async () => {
                         const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "reportDeliverWay"});
                         newVar.data.forEach((item: any) => {
                           item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                         })
                         return newVar.data
                       }}
        />
        <ProFormText width="md" name="reportReceiveEmail" label="报告接收邮箱"/>
        <ProFormText width="md" name="reportMailAddress" label="报告邮寄地址"/>
        <ProFormTextArea width="md" name="remark" label="备注"/>
      </ProForm.Group>
    </ModalForm>
  );
};
