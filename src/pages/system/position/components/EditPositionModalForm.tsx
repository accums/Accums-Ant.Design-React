import {
    ModalForm, ProFormDigit,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-components';
import {message, Tag} from 'antd';
import React, {} from "react";
import {editSysPosition, getSysPositionById} from "@/pages/system/position/api/PositionApi";

export default (props: { actionRef: any, positionId: any }) => {

    return (
        <ModalForm<any>
            {...{
                labelCol: {span: 5},
                wrapperCol: {span: 14},
            }}
            layout={"horizontal"}
            title="编辑职位"
            trigger={<a>编辑</a>}
            autoFocusFirstInput
            modalProps={{
                destroyOnClose: true,
            }}
            params={{positionId: props.positionId}}
            request={async (params) => {
                const newVar = await getSysPositionById(params);
                return newVar.data;
            }}
            onFinish={async (values) => {
                let newVar = await editSysPosition(values);
                if (newVar.data) {
                    message.success('编辑成功');
                    props.actionRef.current?.reload()
                    return true;
                } else {
                    message.error('编辑失败，请重试');
                    return false;
                }
            }}
        >
            <ProFormText hidden={true} name="positionId" label="职位ID" rules={[{required: true}]}/>
            <ProFormText disabled name="version" label="版本号" rules={[{required: true}]}/>
            <ProFormText name="positionName" label="职位名称" rules={[{required: true}]}/>
            <ProFormSelect name="positionType" label="职位类型" rules={[{required: true}]}
                           options={[
                               {value: '0', label: <Tag color='blue'> 系统职位 </Tag>},
                               {value: '1', label: <Tag color='green'> 业务职位 </Tag>},
                           ]}
            />
            <ProFormDigit name="positionSort" label="数据排序" rules={[{required: true}]}/>
            <ProFormTextArea name="remark" label="备注"/>
        </ModalForm>
    );
};
