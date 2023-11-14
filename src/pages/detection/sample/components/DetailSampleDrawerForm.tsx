import {ModalForm, ProDescriptions,} from '@ant-design/pro-components';
import React from "react";
import {getSysDictListByDictTypeCode} from "@/pages/system/dict/api/DictApi";
import {Tag} from "antd";
import {getDetectionSampleById} from "@/pages/detection/sample/api/SampleApi";

const DetailOpLogDrawerForm: React.FC<any> = ({entity}) => {
  return (
    <ModalForm
      width={1000}
      size={"middle"}
      trigger={<a>{entity.sampleCode}</a>}
      submitter={false}
      modalProps={{
        closeIcon: false,
        destroyOnClose: true,
      }}
    >
      <ProDescriptions labelStyle={{fontWeight: "bold", color: 'black'}}
                       layout="vertical"
                       bordered
                       column={3}
                       params={{sampleId: entity.sampleId}}
                       request={async (params) => {
                         const result = await getDetectionSampleById(params);
                         return {
                           success: result.success,
                           data: result.data
                         }
                       }}
      >
        <ProDescriptions.Item label="委托合同编号" dataIndex="entrustCode" span={3}/>
        <ProDescriptions.Item label="样品编号" dataIndex="sampleCode"/>
        <ProDescriptions.Item label="样品分类" dataIndex="categorizeId"/>

        <ProDescriptions.Item label="样品状态" dataIndex={"sampleStatus"}
                              request={async () => {
                                const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "sampleStatus"});
                                newVar.data.forEach((item: any) => {
                                  item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                                })
                                return newVar.data
                              }}
        />

        <ProDescriptions.Item label="样品名称" dataIndex="sampleName"/>

        <ProDescriptions.Item label="样品数量" dataIndex="sampleQuantity"/>
        <ProDescriptions.Item label="计量单位" dataIndex={"sampleQuantityUnit"}
                              request={async () => {
                                const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "sampleQuantityUnit"});
                                newVar.data.forEach((item: any) => {
                                  item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                                })
                                return newVar.data
                              }}
        />
        <ProDescriptions.Item label="取样人" dataIndex={"samplePeople"}/>
        <ProDescriptions.Item label="样品来源" dataIndex={"sampleSource"}
                              request={async () => {
                                const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "sampleSource"});
                                newVar.data.forEach((item: any) => {
                                  item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                                })
                                return newVar.data
                              }}
        />
        <ProDescriptions.Item label="样品处置方式" dataIndex={"sampleDispose"}
                              request={async () => {
                                const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "sampleDispose"});
                                newVar.data.forEach((item: any) => {
                                  item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                                })
                                return newVar.data
                              }}
        />
        <ProDescriptions.Item label="取样地点" dataIndex={"sampleLocation"}/>
        <ProDescriptions.Item label="样品室" dataIndex={"sampleRoom"}/>
        <ProDescriptions.Item label="样品描述" span={3} dataIndex={"sampleDescribe"}/>
        <ProDescriptions.Item label="备注" span={3} dataIndex={"remark"}/>
      </ProDescriptions>
    </ModalForm>
  );
};
export default DetailOpLogDrawerForm;


