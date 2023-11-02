import {
    ModalForm, ProDescriptions,

} from '@ant-design/pro-components';
import React from "react";
import {getSysDictListByDictTypeCode} from "@/pages/system/dict/api/DictApi";
import {Tag} from "antd";


const DetailOpLogDrawerForm: React.FC<any> = ({entity}) => {
    return (
        <ModalForm
            width={1000}
            readonly={true}
            title="日志信息"
            trigger={<a>{entity.logName}</a>}
            submitter={false}
            layout={'vertical'}
        >
            <ProDescriptions layout="horizontal" bordered column={2}>
                <ProDescriptions.Item label="日志名称">{entity.logName}</ProDescriptions.Item>
                <ProDescriptions.Item label="方法名称">{entity.methodName}</ProDescriptions.Item>
                <ProDescriptions.Item label="请求接口" span={2}>{entity.requestUrl}</ProDescriptions.Item>
                <ProDescriptions.Item label="类名称" span={2}>{entity.className}</ProDescriptions.Item>
                <ProDescriptions.Item copyable label="请求参数" span={2}>{entity.requestParam}</ProDescriptions.Item>
                <ProDescriptions.Item label="请求结果" span={2}>{entity.requestResult}</ProDescriptions.Item>
                <ProDescriptions.Item label="请求消息" span={2}>{entity.message}</ProDescriptions.Item>
                <ProDescriptions.Item label="请求方式">{entity.requestMethod}
                </ProDescriptions.Item>
                <ProDescriptions.Item label="操作结果"
                                      request={async () => {
                                          const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "opStatus"});
                                          newVar.data.forEach((item: any) => {
                                              item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                                          })
                                          return newVar.data
                                      }}>{entity.opStatus}
                </ProDescriptions.Item>
                <ProDescriptions.Item label="客户端IP">{entity.clientIp}</ProDescriptions.Item>

                <ProDescriptions.Item label="操作类型"
                                      request={async () => {
                                          const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "opType"});
                                          newVar.data.forEach((item: any) => {
                                              item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                                          })
                                          return newVar.data
                                      }}>{entity.opType}
                </ProDescriptions.Item>
                <ProDescriptions.Item label="操作用户">{entity.createUser}</ProDescriptions.Item>

                <ProDescriptions.Item label="客户端浏览器">{entity.clientBrowser}</ProDescriptions.Item>
                <ProDescriptions.Item label="客户端操作系统" >{entity.clientOs}</ProDescriptions.Item>
                <ProDescriptions.Item label="操作时间">{entity.createTime}</ProDescriptions.Item>
                <ProDescriptions.Item label="备注">{entity.remark}</ProDescriptions.Item>
            </ProDescriptions>
        </ModalForm>
    );
};
export default DetailOpLogDrawerForm;


