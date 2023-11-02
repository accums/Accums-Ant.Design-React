import {PlusOutlined} from '@ant-design/icons';
import {
    ActionType, ModalForm, ProFormDigit,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-components';
import {Button, message, Tag} from 'antd';
import React from "react";
import {addSysDictType} from '../../api/DictTypeApi';
import {getSysDictListByDictTypeCode} from "@/pages/system/dict/api/DictApi";

interface AddDictTypeModalForm {
    actionRef: React.MutableRefObject<ActionType | undefined>
}

const AddDictTypeModalForm: React.FC<AddDictTypeModalForm> = ({actionRef}) => {
    return (
        <ModalForm<any>
            {...{
                labelCol: {span: 5},
                wrapperCol: {span: 14},
            }}
            layout={"horizontal"}
            title="新增字典类型"
            trigger={<Button type="primary" icon={<PlusOutlined/>}></Button>}
            modalProps={{
                destroyOnClose: true,
            }}
            onFinish={async (values) => {
                let newVar = await addSysDictType(values);
                if (newVar.data) {
                    message.success('新增成功');
                    actionRef.current?.reload()
                    return true;
                } else {
                    message.error('新增失败，请重试');
                    return false
                }
            }}
        >
            <ProFormText width="md" name="dictTypeCode" label="字典类型编码" tooltip={"不可重复"} rules={[{required: true}]}/>
            <ProFormText width="md" name="dictTypeName" label="字典类型名称" rules={[{required: true}]}/>
            <ProFormSelect width="md" name="dataType" label="数据类型："  tooltip={"系统数据将会限制修改和删除"}  rules={[{required: true}]}
                           request={async ()=>{
                               const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "dataType"});
                               newVar.data.forEach((item: any) => {
                                   item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                               })
                               return newVar.data
                           }}
            />
            <ProFormDigit width="md" name="dictTypeSort" label="排序" initialValue={99} rules={[{required: true}]}/>
            <ProFormTextArea width="md" name="remark" label="备注"/>
        </ModalForm>
    );
};
export default AddDictTypeModalForm;
