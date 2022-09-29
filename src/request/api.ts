import { get, post } from './axios-mine';
import { IResponse } from '../utils/types'

type o = {};

//登录
export const LoginApi = (p: o) => post<IResponse>('/user/login/v2/loginToken', p);
//发送验证码
export const SendCodeApi = (p: o) => post<IResponse>('/user/sendEmailCode', p);
//修改登录密码
export const UpdatePassApi = (p: o) => post<IResponse>('/user/forgetPassword', p);
//商家信息
export const MerchantInfoApi = (p: o) => post<IResponse>('/assets/merchantAssetsInfo', p);
//商户总览
export const MerchantViewApi = (p: o) => post<IResponse>('/analysis/countProfits', p);
//钱包总览
export const WalletViewApi = (p: o) => post<IResponse>('/analysis/wallet', p);
//账单总览
export const BillViewApi = (p: o) => post<IResponse>('/analysis/deposit2Withdraw', p);
//订单流水
export const OrderListApi = (p: o) => post<IResponse>('/assetsFlow/queryWalletAssetsFlow', p);
//提币流水
export const WithdrawListApi = (p: o) => post<IResponse>('/userWithdraw/queryUserWithdrawHistory', p);
//商家列表
export const MerchantListApi = (p: o) => post<IResponse>('/assets/merchants', p);
//填写交易HASH
export const SetHashApi = (p: o) => post<IResponse>('/userWithdraw/pass', p);
//拒绝提币
export const RejectWithdrawApi = (p: o) => post<IResponse>('/userWithdraw/reject', p);

