import {FormatPainterOutlined} from '@ant-design/icons';
import {ModalForm, ProDescriptions,} from '@ant-design/pro-components';
import {Button, Divider, QRCode,} from 'antd';
import React, {useRef} from "react";
import {useReactToPrint} from "react-to-print";
import {getDetectionSampleById} from "@/pages/detection/sample/api/SampleApi";
import {getSysDictListByDictTypeCode} from "@/pages/system/dict/api/DictApi";

export default (props: { actionRef: any, selectedRows: any }) => {

  const componentRef = useRef<any>();
  const handlePrint = useReactToPrint({
    content: () => (componentRef.current !== undefined) ? componentRef.current : null,
  });

  return (
    <ModalForm
      width={400}
      title="样品标签打印"
      trigger={<Button ghost size={"small"} type="primary"><FormatPainterOutlined/>标签打印</Button>
      }
      modalProps={{okText: "打印"}}
      onFinish={async () => {
        handlePrint();
      }}
    >
      <Divider></Divider>
      <div ref={componentRef}>
        <ProDescriptions
          column={2}
          size={"small"}
          bordered={false}
          title={
            <div style={{paddingLeft: '10px'}}>
              <QRCode
                style={{float: "left", border: "none"}}
                errorLevel={'H'}
                size={80}
                iconSize={80 / 6}
                value="https://ant.design/"
                icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              />
              <div style={{lineHeight: '70px'}}>苏交科检测研究院</div>
            </div>
          }
          labelStyle={{fontSize: 11, fontWeight: "bold", color: "black"}}
          params={{sampleId: props.selectedRows.sampleId}}
          request={async (params) => {
            const result = await getDetectionSampleById(params);
            return {
              success: result.success,
              data: result.data
            }
          }}
        >
          <ProDescriptions.Item contentStyle={{textAlign: "left", fontSize: 11}} label="样品编号"
                                dataIndex="sampleCode"/>
          <ProDescriptions.Item contentStyle={{textAlign: "left", fontSize: 11}} label="样品名称"
                                dataIndex="sampleName"/>

          <ProDescriptions.Item contentStyle={{textAlign: "left", fontSize: 11}} label="送样日期"
                                dataIndex="createTime"/>

          <ProDescriptions.Item contentStyle={{textAlign: "left", fontSize: 11}} label="处置方式"
                                dataIndex={"sampleDispose"}
                                request={async () => {
                                  const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "sampleDispose"});
                                  return newVar.data
                                }}
          />
          <ProDescriptions.Item contentStyle={{textAlign: "left", fontSize: 11}} label="取样人员"
                                dataIndex={"samplePeople"}/>
          <ProDescriptions.Item contentStyle={{textAlign: "left", fontSize: 11}} label="样品状态"
                                dataIndex={"sampleStatus"}
                                request={async () => {
                                  const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "sampleStatus"});
                                  return newVar.data
                                }}
          />
        </ProDescriptions>
      </div>
    </ModalForm>
  );
};

