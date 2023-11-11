import {ModalForm, ProDescriptions,} from '@ant-design/pro-components';
import React from "react";
import {getSysDictListByDictTypeCode} from "@/pages/system/dict/api/DictApi";
import {Tag} from "antd";
import {getDetectionEntrustContractById} from "@/pages/detection/entrust/api/EntrustContractApi";


const DetailOpLogDrawerForm: React.FC<any> = ({entity}) => {
  return (
    <ModalForm
      width={1000}
      trigger={<a>{entity.entrustCode}</a>}
      submitter={false}
      modalProps={{
        closeIcon: false,
      }}
    >
      <ProDescriptions labelStyle={{fontWeight: "bold", color: 'black'}}
                       size={"middle"}
                       layout="vertical"
                       bordered
                       column={2}
                       params={{entrustContractId: entity.entrustContractId}}
                       request={async (params) => {
                         const result = await getDetectionEntrustContractById(params);
                         return {
                           success: result.success,
                           data: result.data
                         }
                       }}
      >
        <ProDescriptions.Item label="委托合同编号" dataIndex="entrustCode" span={1}/>
        <ProDescriptions.Item label="委托状态" dataIndex={"entrustStatus"} span={1}
                              request={async () => {
                                const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "entrustStatus"});
                                newVar.data.forEach((item: any) => {
                                  item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                                })
                                return newVar.data
                              }}
        />
        <ProDescriptions.Item label="检测类别" dataIndex={"detectionType"}
                              request={async () => {
                                const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "detectionType"});
                                newVar.data.forEach((item: any) => {
                                  item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                                })
                                return newVar.data
                              }}
        />
        <ProDescriptions.Item label="检测单位" dataIndex={"detectionUnit"}/>

        <ProDescriptions.Item label="委托人" dataIndex={"entrustClient"}/>
        <ProDescriptions.Item label="委托人手机号" dataIndex={"entrustClientPhone"}/>
        <ProDescriptions.Item label="委托单位" dataIndex={"entrustUnit"}/>
        <ProDescriptions.Item label="委托单位地址" dataIndex={"entrustUnitAddress"}/>

        <ProDescriptions.Item label="工程名称" dataIndex={"engineeringName"}/>
        <ProDescriptions.Item label="工程部位/用途" dataIndex={"engineeringPositionPurpose"}/>
        <ProDescriptions.Item label="建设单位" dataIndex={"projectUnit"}/>
        <ProDescriptions.Item label="施工单位" dataIndex={"constructionUnit"}/>
        <ProDescriptions.Item label="监理单位" dataIndex={"supervisionUnit"}/>
        <ProDescriptions.Item label="见证人" dataIndex={"witness"}/>

        <ProDescriptions.Item label="报告要求时间" span={1} dataIndex={"reportRequiredTime"}/>
        <ProDescriptions.Item label="报告交付方式" span={1} dataIndex={"reportDeliverWay"}
                              request={async () => {
                                const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "reportDeliverWay"});
                                newVar.data.forEach((item: any) => {
                                  item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                                })
                                return newVar.data
                              }}
        />
        <ProDescriptions.Item label="报告接收邮箱" span={1} dataIndex={"reportReceiveEmail"}/>
        <ProDescriptions.Item label="报告邮寄地址" span={1} dataIndex={"reportMailAddress"}/>
        <ProDescriptions.Item label="备注" span={2} dataIndex={"remark"}/>
      </ProDescriptions>
    </ModalForm>
  );
};
export default DetailOpLogDrawerForm;


