import {PlusOutlined} from '@ant-design/icons';
import {
    ModalForm,
    ProForm,
    ProFormSelect,
    ProFormText,
} from '@ant-design/pro-components';
import {Alert, Button, message, Tag} from 'antd';
import React from 'react';
import {getSysDictListByDictTypeCode} from "@/pages/system/dict/api/DictApi";
import {addSysMenuButton} from "@/pages/system/menu/api/MenuButtonApi";

export default (props: { actionRef: any, menuId: any }) => {
    return (
        <ModalForm<any>
            title="新建菜单按钮"
            trigger={
                <Button type="primary" icon={<PlusOutlined/>}></Button>
            }
            modalProps={{
                destroyOnClose: true,
            }}
            onFinish={async (values) => {
                let newVar = await addSysMenuButton(values);
                if (newVar.data) {
                    message.success('添加成功');
                    props.actionRef.current?.reload()
                    return true;
                }
                message.error('添加失败，请重试');
                return false;
            }}
        >

            <ProFormText width="md" name="menuId" hidden={true} initialValue={props.menuId} label="菜单ID"
                         rules={[{required: true}]}/>
            <ProForm.Group>
                <ProFormText width="md" name="buttonName" label="按钮名称" rules={[{required: true}]}/>
                <ProFormText width="md" name="buttonCode" label="按钮编码" rules={[{required: true}]}/>
            </ProForm.Group>
            <ProForm.Group>
                <ProFormText width="md" name="buttonUrl" label="按钮接口"/>
                <ProFormSelect width="md" name="urlAuthority" label="接口鉴权"
                               request={async () => {
                                   const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "yesOrNot"});
                                   newVar.data.forEach((item: any) => {
                                       item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                                   })
                                   return newVar.data
                               }}
                />
                <ProFormSelect width="md" name="dataType" label="数据类型："  tooltip={"系统数据将会限制修改和删除"}  rules={[{required: true}]}
                               request={async ()=>{
                                   const newVar = await getSysDictListByDictTypeCode({"dictTypeCode": "dataType"});
                                   newVar.data.forEach((item: any) => {
                                       item.label = <Tag color={item.antDesignTagColor}> {item.label} </Tag>
                                   })
                                   return newVar.data
                               }}
                />
            </ProForm.Group>

            <Alert closable
                   message={"按钮接口：一般点击按钮会调用后台相应接口。若按钮有对应接口，则填写接口相对路径，没有则不填写。"}/>
            <br/>
            <Alert closable
                   message={"接口鉴权：此属性只在【按钮接口】属性不为空时生效。不论按钮是否被用户所属角色绑定，此属性为【否】时，用户可正常使用此按钮对应的接口，反之只有绑定了此按钮的用户才能正常访问接口。"}/>
        </ModalForm>
    );
};