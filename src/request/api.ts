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
//地址管理
export const WalletsApi = (p:o) => post('/assets/wallets',p);
//操作商户账号状态
export const OperMerchantAPi = (p:o) => post('/manager/merchantStatus',p);
//删除商户
export const DeleteMerchantApi = (p:o) => post('/manager/merchantDelete',p);
//新增商户
export const AddMerchantApi = (p:o) => post('/manager/createMerchant',p);
//商户配置
export const MerchantConfigApi = (p:o) => post('/manager/merchantCoins',p);
//更新商户币种配置
export const UpdateMerchantCoinsApi = (p:o) => post('/manager/saveMerchantCoins',p);
//谷歌验证码
export const GoogleAuthApi = (p:o) => post('/user/getGoogleAuth',p);
//绑定谷歌验证码
export const GoogleAuthBindApi = (p:o) => post('/user/bindGoogleAuth',p);
//获取API Key
export const QueryKeyApi = (p:o) => post('/user/info/queryUserApiKey',p);
//设置白名单地址
export const SetWhiteApi = (p:o) => post('/user/info/setServerIp',p);
//获取网关服务器
export const GetNetworkIP = (p:o) => post('/assets/gatewayList',p);
//获取商家设置信息
export const QueryMerchantApi = (p:o) => post('/user/info/queryMerchantVerifyInfo',p);
//编辑商户信息
export const EditMerchantApi = (p:o) => post('/manager/updateMerchantName',p);
//编辑密码
export const EditPassApi = (p:o) => post('/user/info/updatePwd',p);
//检查手续费
export const CheckFeeApi = (p:o) => post('/userWithdraw/beforeMerchantWithdraw',p);
//提币发起
export const WithdrawApi = (p:o) => post('/userWithdraw/merchantWithdraw',p);
