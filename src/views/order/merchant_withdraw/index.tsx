
import { ReactElement, ReactNode } from 'react';
import OrderFilter from '../components/order_filter';
import OrderTable from '../components/order_table';

const MerchantWithdrawList = () : ReactElement<ReactNode> => {
    return (
        <div className='merchant-withdraw-list'>
            商家提币列表
            <OrderFilter/>
            <OrderTable/>
        </div>
    )
};

export default MerchantWithdrawList;