
import { ReactElement, ReactNode } from 'react';
import AdminView from './components/admin_view';
import './index.scss'
import AccountLog from './components/account_log';
import BillCharts from './components/bill_charts';
import SettlementList from './components/settlement_list';

const OverviewIndex = () : ReactElement<ReactNode> => {
    return (
        <div className='overview-index'>
            {/* 收益总览 */}
            <AdminView/>
            <div className='flex-left-1'>
                <div className='left-box'>
                    <AccountLog/>
                </div>
                <div className='right-box'>
                    <BillCharts/>
                    <SettlementList/>
                </div>
            </div>
        </div>
    )
};

export default OverviewIndex;