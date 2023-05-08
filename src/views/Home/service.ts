import request from '@daojia/vue3-cli-preset-config/boot/mService';
import type AppOrderOrderList from '../../declaration/AppOrderOrderList';

export function fetchOrderList (params: AppOrderOrderList.ReqQueryParams) {
  return request<AppOrderOrderList.ResData>({
    url: 'https://jz-amp.daojia-inc.com/mock/349/app/order/order-list',
    method: 'get',
    param: params
  })
}
