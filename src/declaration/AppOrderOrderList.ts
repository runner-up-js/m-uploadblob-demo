/* eslint-disable */
/**
 * 订单列表
 * @path /app/order/order-list
 * @method GET
 * @see https://jz-amp.daojia-inc.com/project/349/interface/api/35912
 * @updateTime 1628495588
 */
declare namespace AppOrderOrderList {
  /** query参数 */
  export interface ReqQueryParams {
    appCate: string;
    userId?: string;
    rows: string;
    page: string;
  }
  /** 返回值 */
  export interface Res {
    status: number;
    message: string;
    data: ResData;
  }
  /** 返回值Data */
  export interface ResData {
    pageNumber: number;
    totalElements: number;
    content: Content[];
  }
  interface Content {
    orderId: number;
    orderState: string;
    shopIconUrl: string;
    shopName: string;
    productImg: string;
    serviceName: string;
    serviceAddress: string;
    serviceTimes: string[];
  }
}

export default AppOrderOrderList;
