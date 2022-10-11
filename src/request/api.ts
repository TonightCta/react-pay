import { post } from './axios-mine';

type o = {};

//登录
export const LoginApi = (p: o) => post('/user/login/v2/loginToken', p);
//发送验证码
export const SendCodeApi = (p: o) => post('/user/sendEmailCode', p);
//修改登录密码
export const UpdatePassApi = (p: o) => post('/user/forgetPassword', p);
//商家信息
export const MerchantInfoApi = (p: o) => post('/assets/merchantAssetsInfo', p);
//登录日志
export const LoginlogApi = (p:o) => post('/analysis/loginLog',p);
//商户总览
export const MerchantViewApi = (p: o) => post('/analysis/countProfits', p);
//钱包总览
export const WalletViewApi = (p: o) => post('/analysis/wallet', p);
//账单总览
export const BillViewApi = (p: o) => post('/analysis/deposit2Withdraw', p);
//订单流水
export const OrderListApi = (p: o) => post('/assetsFlow/queryWalletAssetsFlow', p);
//提币流水
export const WithdrawListApi = (p: o) => post('/userWithdraw/queryUserWithdrawHistory', p);
//商家列表
export const MerchantListApi = (p: o) => post('/assets/merchants', p);
//填写交易HASH
export const SetHashApi = (p: o) => post('/userWithdraw/pass', p);
//拒绝提币
export const RejectWithdrawApi = (p: o) => post('/userWithdraw/reject', p);
//清算历史
export const ButtlistApi = (p:o) => post('/analysis/profitHistory',p);
//币种统计
export const CoinlogApi = (p:o) => post('/analysis/coinCounts',p);
//重新回调
export const RebackApi = (p:o) => post('/assetsFlow/notify',p);

