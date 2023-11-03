import React, {useState} from 'react';
import {message, Button,} from 'antd';
import {ModalForm, ProFormCheckbox} from "@ant-design/pro-components";
import {getSysRoleList} from "@/pages/system/role/api/RoleApi";
import {CheckboxValueType} from "antd/lib/checkbox/Group";
import {getSysUserBindRolesByUserId, userBindRoles} from "@/pages/system/role/api/RoleUserApi";
import {SkinOutlined } from '@ant-design/icons';


export default (props: { actionRef: any, userId: any }) => {

    const [selectedValue, setSelectedValue] = useState<CheckboxValueType[] | undefined>();
    const showModal = () => {
        const getUserBindRolesConst = async () => {
            const states = await getSysUserBindRolesByUserId({userId: props.userId});
            setSelectedValue(states.data)
            return states.data;
        };
        getUserBindRolesConst().then()
    };

    const onChange = (checkedValues: CheckboxValueType[]) => {
        setSelectedValue(checkedValues);
    };

    return (
        <ModalForm
            width={400}
            title={"为用户配置角色"}
            trigger={<Button icon={<SkinOutlined />} ghost onClick={showModal} type="primary" size={"small"}
                             style={{marginRight: '10px'}}>配置角色</Button>}
            modalProps={{
                destroyOnClose: true,
            }}
            onFinish={async () => {
                let newVar = await userBindRoles({userId: props.userId, roleIds: selectedValue});
                if (newVar.data) {
                    message.success('配置成功');
                    props.actionRef.current?.reload()
                    return true;
                } else {
                    message.error('配置失败，请重试');
                    return false;
                }
            }}
        >
            <ProFormCheckbox.Group
                layout="vertical"
                fieldProps={{
                    value: selectedValue,
                    onChange: onChange
                }}
                request={async () => {
                    let newVar = await getSysRoleList({});
                    return newVar.data;
                }}/>
        </ModalForm>
    )
};

