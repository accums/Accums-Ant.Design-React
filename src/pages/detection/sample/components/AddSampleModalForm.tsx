import {PlusOutlined} from '@ant-design/icons';
import {ModalForm, ProFormDependency, ProFormSelect, ProFormText, ProFormTextArea,} from '@ant-design/pro-components';
import {Button, Divider, message, Tag} from 'antd';
import React from "react";
import {getDetectionCategorizeList,} from "@/pages/detection/categorize/api/Categorize";
import {getDetectionParameterList} from "@/pages/detection/parameter/api/ParameterApi";
import {addDetectionSample} from "@/pages/detection/sample/api/SampleApi";
import {getSysDictListByDictTypeCode} from "@/pages/system/dict/api/DictApi";

export default (props: { actionRef: any, entrustContractId: any }) => {
  return (
    <ModalForm
      title="新建样品"
      layout={'vertical'}
      grid={true}
      trigger={
        <Button type="primary"><PlusOutlined/>新建样品</Button>
      }
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
      }}
      rowProps={{
        gutter: [16, 0],
      }}
      onFinish={async (values) => {
        let newVar = await addDetectionSample(values);
        if (newVar.data) {
          message.success('新建样品成功');
          props.actionRef.current?.reload()
          return true;
        } else {
          message.error('新建样品失败，请重试');
          return false;
        }
      }}
    >
      <Divider></Divider>
      <ProFormText colProps={{xl: 16}} name="entrustContractId" label="委托合同ID" hidden
                   initialValue={props.entrustContractId} rules={[{required: true}]}/>
      <ProFormSelect colProps={{xl: 16}} name="categorizeId" label="样品分类"
                     tooltip={"在已创建的试验检测分类中选择单个或多个"} rules={[{required: true}]}
                     fieldProps={{
                       showSearch: true,
                     }}
                     request={async () => {
                       const newVar = await getDetectionCategorizeList({});
                       return newVar.data;
                     }}
      />
      <ProFormDependency name={['categorizeId']}>
        {({categorizeId}) => {
          if (categorizeId) {
            return (
              <ProFormSelect
                colProps={{xl: 24}} name="parameterId" label="样品参数"
                tooltip={"在已创建的试验检测样品参数中选择单个或多个"} rules={[{required: true}]}
                fieldProps={{
                  mode: 'multiple',
                }}
                params={{categorizeParent: categorizeId}}
                request={async (params) => {
                  const newVar = await getDetectionParameterList(params);
                  return newVar.data;
                }}
              />
            );
          } else {

          }
        }}
      </ProFormDependency>

      <Divider></Divider>

      <ProFormText colProps={{md: 12, xl: 8}} name="sampleName" label="样品名称" rules={[{required: true}]}/>
      <ProFormSelect colProps={{md: 12, xl: 8}} name="sampleSource" label="样品来源" rules={[{required: true}]}
                     initialValue={"1"}
                     request={async () => {
                       const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "sampleSource"});
                       newVar.data.forEach((item: any) => {
                         item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                       })
                       return newVar.data
                     }}
      />

      <ProFormSelect colProps={{md: 12, xl: 8}} name="sampleDispose" label="样品处置" initialValue={"2"}
                     request={async () => {
                       const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "sampleDispose"});
                       newVar.data.forEach((item: any) => {
                         item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                       })
                       return newVar.data
                     }}
      />
      <ProFormText colProps={{md: 12, xl: 8}} name="samplePeople" label="收样人" rules={[{required: true}]}/>
      <ProFormText colProps={{md: 12, xl: 8}} name="sampleLocation" label="取样地点"/>
      <ProFormText colProps={{md: 12, xl: 8}} name="sampleRoom" label="归属样品室"/>
      <ProFormTextArea colProps={{md: 12, xl: 12}} name="sampleDescribe" label="样品描述"/>
      <ProFormTextArea colProps={{md: 12, xl: 12}} name="remark" label="备注"/>

    </ModalForm>
  );
};
