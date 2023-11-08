import {ModalForm, ProFormDigit, ProFormSelect, ProFormText, ProFormTextArea,} from '@ant-design/pro-components';
import {Button, message, Tag} from 'antd';
import React from "react";
import {getSysDictById, getSysDictListByDictTypeCode, updateSysDict} from "@/pages/system/dict/api/DictApi";
import {EditOutlined} from "@ant-design/icons";


const EditDict: React.FC<any> = ({actionRef, dictId}) => {

  if (dictId === null || dictId === undefined) {
    return (<></>);
  }

  return (
    <ModalForm<any>
      {...{
        labelCol: {span: 5},
        wrapperCol: {span: 14},
      }}
      layout={"horizontal"}
      title="编辑字典"
      trigger={<Button ghost type="primary" icon={<EditOutlined/>}></Button>}
      params={{dictId: dictId}}
      request={async (dictId) => {
        const newVar = await getSysDictById(dictId);
        return newVar.data;
      }}
      modalProps={{
        destroyOnClose: true,
      }}
      onFinish={async (values) => {

        values.antDesignTagColor = values.antDesignTagColor === undefined ? "" : values.antDesignTagColor
        const newVar = await updateSysDict(values);
        if (newVar.data) {
          message.success('修改成功');
          actionRef.current?.reload()
          return true;
        } else {
          message.error('修改失败，请重试');
          return false;
        }
      }}
    >
      <ProFormText width="md" name="dictId" hidden={true}/>
      <ProFormText width="md" name="dictTypeCode" label="类型编码" disabled rules={[{required: true}]}/>
      <ProFormText width="md" name="version" label="版本号" disabled rules={[{required: true}]}/>
      <ProFormText width="md" name="dictCode" label="字典编码" disabled={true} rules={[{required: true}]}/>
      <ProFormText width="md" name="dictName" label="字典名称" rules={[{required: true}]}/>
      <ProFormText width="md" name="dictValue" label="字典值" rules={[{required: true}]}/>
      <ProFormSelect width="md" name="antDesignTagColor" label="color" tooltip={"Ant_design中Tag标签中的color属性值"}
                     request={async () => {
                       const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "antDesignTagColor"});
                       newVar.data.forEach((item: any) => {
                         item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                       })
                       return newVar.data
                     }}

      />
      <ProFormDigit width="md" name="dictSort" label="排序"/>
      <ProFormTextArea label="备注" width="md" name="remark"/>
    </ModalForm>
  );
};
export default EditDict;
