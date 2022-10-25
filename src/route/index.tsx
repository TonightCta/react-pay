
import { ReactElement, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import * as View from '../views/view';
import { IBPay } from '../App';

const RouterConfig = (): ReactElement => {
    const { state } = useContext(IBPay);
    const { account } = state;
    return (
        <Routes>
            <Route path="/" element={<View.IndexView />}>
                <Route index element={<View.OverviewIndex />} />
                <Route path="/order" element={<View.OrderIndex />}>
                    <Route index element={<View.UserDepositList />} />
                    <Route path="/order/user-withdraw-list" element={<View.UserWithdrawList />} />
                    <Route path="/order/merchant-deposit-list" element={<View.MerchantDepositList />} />
                    <Route path="/order/merchant-withdraw-list" element={<View.MerchantWithdrawList />} />
                </Route>
                <Route path="/asset" element={<View.AssetIndex />}>
                    <Route index element={<View.MerchantDeposit />} />
                    <Route path="/asset/merchan-withdraw" element={<View.MerchantWithdraw />} />
                    <Route path="/asset/addresses-list" element={<View.AddressesList />} />
                </Route>
                {JSON.parse(account || '{}')?.merchantInfo?.is_admin
                    ? <Route path="/account" element={<View.AccountIndex />}>
                        <Route index element={<View.MerchantList />} />
                        <Route path="/account/merchant-config" element={<View.MerchantConfig />} />
                        <Route path="/account/merchant-information" element={<View.MerchantInformation />} />
                    </Route>
                    : <Route path="/account" element={<View.AccountIndex />}>
                        <Route index element={<View.MerchantInformation />} />
                    </Route>}
            </Route>
            <Route path="/login" element={<View.LoginIndex />} />
            {/* <Route path="/" element={<View.SiteIndex/>}></Route>
            <Route path="/demo" element={<View.DemoIndex/>}></Route>
            <Route path="/development" element={<View.DevelopmentIndex />}></Route> */}
        </Routes>
    )
};

export default RouterConfig;