import IndexView from "./index"
import LoginIndex from "./login";
import OverviewIndex from "./overview/overview";
import OrderIndex from "./order";
import MerchantDepositList from "./order/merchant_deposit";
import MerchantWithdrawList from "./order/merchant_withdraw";
import UserDepositList from "./order/user_deposit";
import UserWithdrawList from "./order/user_withdraw";
import AssetIndex from "./asset";
import MerchantDeposit from "./asset/merchant_deposist";
import MerchantWithdraw from "./asset/merchant_withdraw";
import AddressesList from "./asset/addresses_list";
import AccountIndex from "./account";
import MerchantConfig from "./account/merchant_config";
import MerchantInformation from "./account/merchant_information";
import MerchantList from "./account/merchant_list";
import SiteIndex from "./site";
import DemoIndex from "./demo";
import DevelopmentIndex from "./development";

export {
    LoginIndex,//登录
    IndexView,
    OverviewIndex,//概览
    OrderIndex,
    MerchantDepositList,//商家充币列表
    MerchantWithdrawList,//商家提币列表
    UserDepositList,//用户充币列表
    UserWithdrawList,//用户提币列表
    AssetIndex,
    MerchantDeposit,//商家充币
    MerchantWithdraw,//商家提币
    AddressesList,//地址管理
    AccountIndex,
    MerchantConfig,//商家配置
    MerchantInformation,//商家信息
    MerchantList,//商家列表
    SiteIndex,//官网
    DemoIndex,//demo
    DevelopmentIndex,//开发者中心
}