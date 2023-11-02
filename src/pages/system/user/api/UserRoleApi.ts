import {request} from "@@/plugin-request/request";
import {CheckboxValueType} from "antd/es/checkbox/Group";

/**
 * 获取当前用户所属的角色
 * @param params
 * @param options
 * @constructor
 */
export async function getSystemUserRoleIdsByUserId(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<Array<CheckboxValueType>>>('/api/system/user/role/getSystemUserRoleIdsByUserId',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${localStorage.getItem('Token')}`
            },
            data: params,
            ...(options || {}),
        });
}


/**
 * 提交选中的角色
 * @param params
 * @param options
 */
export async function BindSystemUserRoles(params: any, options?: { [key: string]: any }) {
    return request<API.BaseResult<Boolean>>('/api/system/user/role/BindSystemUserRoles',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${localStorage.getItem('Token')}`
            },
            data: params,
            ...(options || {}),
        });
}
