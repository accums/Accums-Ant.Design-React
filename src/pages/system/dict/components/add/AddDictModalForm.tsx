import {
    ModalForm, ProFormDigit, ProFormSelect,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-components';
import {Button, message, Tag} from 'antd';
import React, {} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {addSysDict, getSysDictListByDictTypeCode} from "@/pages/system/dict/api/DictApi";

const AddDictModalForm: React.FC<any> = ({actionRef, dictTypeId}) => {
    if (dictTypeId === "" || dictTypeId === null || dictTypeId === undefined) {
        return null;
    }
    return (
        <ModalForm<any>
            {...{
                labelCol: {span: 5},
                wrapperCol: {span: 14},
            }}
            layout={"horizontal"}
            title="新增字典"
            trigger={<Button type="primary" icon={<PlusOutlined/>}></Button>}
            autoFocusFirstInput
            modalProps={{
                destroyOnClose: true,
            }}
            onFinish={async (values) => {
                values.dictParentId = dictTypeId;
                let newVar = await addSysDict(values);
                if (newVar.data) {
                    message.success('新增成功');
                    actionRef.current?.reload()
                    return true;
                } else {
                    message.error('新增失败，请重试');
                    return false;
                }
            }}
        >
            <ProFormText width="md" name="dictCode" label="字典编码" rules={[{required: true}]}/>
            <ProFormText width="md" name="dictName" label="字典名称" rules={[{required: true}]}/>
            <ProFormText width="md" name="dictValue" label="字典值" rules={[{required: true}]}/>
            <ProFormSelect width="md" name="antDesignTagColor" label="color" tooltip={"Ant_design中Tag标签中的color属性值"}
            request={async ()=>{
                const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "antDesignTagColor"});
                newVar.data.forEach((item: any) => {
                    item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                })
                return newVar.data
            }}

            />
            <ProFormDigit width="md" name="dictSort" label="排序" initialValue={99} rules={[{required: true}]}/>
            <ProFormTextArea width="md" name="remark" label="备注"/>
        </ModalForm>
    );
};
export default AddDictModalForm;
