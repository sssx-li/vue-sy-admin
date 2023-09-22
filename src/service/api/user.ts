import type { UserLogin } from '../types';

// 登录
export function userLogin(data: UserLogin) {
  return ApiRequest.post({
    url: UserEnum.LOGIN,
    data,
  });
}

// 获取用户信息
export function userGetUserInfo() {
  return ApiRequest.get({
    url: UserEnum.INFO,
  });
}
