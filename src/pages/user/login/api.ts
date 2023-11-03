import {request} from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{data: any;}>('/api/system/login/getLoginUserInfoByToken', {
    method: 'GET',
    ...(options || {}),
  });
}


export async function getFakeCaptcha(options?: { [key: string]: any }) {
  return request<{data: any;}>('/api/system/login/getFakeCaptcha', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<any>('/api/system/login/loginByAccountPassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      account: body.username,
      password: body.password
    },
    ...(options || {}),
  });
}

/**
 * 获取登录用户所属的菜单数据
 * @param options
 */
export async function getSysUserRoleMenuAntDesignTreeByToken(options?: { [key: string]: any }) {
  return request<any>('/api/system/menu/getSysUserRoleMenuAntDesignTreeByToken', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Token': `${localStorage.getItem('Token')}`
    },
    ...(options || {}),
  });
}
