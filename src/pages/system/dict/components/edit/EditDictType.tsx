import {ModalForm, ProFormDigit, ProFormSelect, ProFormText, ProFormTextArea,} from '@ant-design/pro-components';
import {Button, message, Tag} from 'antd';
import React from "react";
import {getSysDictTypeById, updateSysDictType} from '../../api/DictTypeApi';
import {getSysDictListByDictTypeCode} from "@/pages/system/dict/api/DictApi";
import {EditOutlined} from "@ant-design/icons";


const EditDictType: React.FC<any> = ({actionRef, dictTypeId}) => {
    return (
        <ModalForm
          {...{
                labelCol: {span: 5},
                wrapperCol: {span: 14},
            }}
          key={"EditDictType"}
          layout={"horizontal"}
          title="编辑字典类型"
          trigger={<Button ghost type="primary" icon={<EditOutlined/>}></Button>}
          params={{dictTypeId: dictTypeId}}
          request={async (params) => {
                const newVar = await getSysDictTypeById(params);
                return newVar.data;
            }}
          modalProps={{
                destroyOnClose: true,
            }}
          onFinish={async (values) => {
                const newVar = await updateSysDictType(values);
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
            <ProFormText width="md" name="dictTypeId" label="字典类型UID" hidden={true} rules={[{required: true}]}/>
            <ProFormText width="md" name="dictTypeCode" label="类型编码" disabled rules={[{required: true}]}/>
            <ProFormText width="md" name="version" label="版本号" disabled rules={[{required: true}]}/>
            <ProFormText width="md" name="dictTypeName" label="类型名称" rules={[{required: true}]}/>
            <ProFormSelect width="md" name="dataType" label="数据类型" tooltip={"系统数据将会限制修改和删除"}
                           request={
                               async () => {
                                   const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "dataType"});
                                   newVar.data.forEach((item: any) => {
                                       item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                                   })
                                   return newVar.data;
                               }
                           }
            />
            <ProFormDigit width="md" name="dictTypeSort" label="排序" tooltip="影响数据列表的上下顺序"/>
            <ProFormTextArea width="md" name="remark" label="备注"/>
        </ModalForm>
    );
};
export default EditDictType;
