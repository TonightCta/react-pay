
import { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";
import * as View from '../views/view';

const RouterConfig = (): ReactElement => {
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
                <Route path="/account" element={<View.AccountIndex />}>
                    <Route index element={<View.MerchantList />} />
                    <Route path="/account/merchant-config" element={<View.MerchantConfig />} />
                    <Route path="/account/merchant-information" element={<View.MerchantInformation />} />
                </Route>
            </Route>
            <Route path="/login" element={<View.LoginIndex/>}/>
        </Routes>
    )
};

export default RouterConfig;