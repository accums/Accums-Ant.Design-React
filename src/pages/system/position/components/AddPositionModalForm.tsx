import {
    ActionType, ModalForm, ProFormDigit,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-components';
import {Button, message, Tag} from 'antd';
import React, {} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {addSysPosition} from "@/pages/system/position/api/PositionApi";

export default (props: { actionRef: React.MutableRefObject<ActionType | undefined> }) => {

    return (
        <ModalForm<any>
            {...{
                labelCol: {span: 5},
                wrapperCol: {span: 14},
            }}
            layout={"horizontal"}
            title="新建职位"
            trigger={<Button type="primary" icon={<PlusOutlined/>}>新建职位</Button>}
            autoFocusFirstInput
            modalProps={{
                destroyOnClose: true,
            }}
            onFinish={async (values) => {
                let newVar = await addSysPosition(values);
                if (newVar.data) {
                    message.success('新增成功');
                    props.actionRef.current?.reload()
                    return true;
                } else {
                    message.error('新增失败，请重试');
                    return false;
                }
            }}
        >
            <ProFormText width="xl" name="positionName" label="职位名称" rules={[{required: true}]}/>
            <ProFormSelect width="xl" name="positionType" label="职位类型"  rules={[{required: true}]}
                           options={[
                               {value: '0', label: <Tag color='blue'> 系统职位 </Tag>},
                               {value: '1', label: <Tag color='green'> 业务职位 </Tag>},
                           ]}
            />
            <ProFormDigit width="xl" name="positionSort" label="数据排序" rules={[{required: true}]}/>
            <ProFormTextArea width="xl" name="remark" label="备注信息"/>
        </ModalForm>
    );
};
