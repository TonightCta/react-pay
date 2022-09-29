
import { ReactElement, ReactNode } from 'react';
import OrderFilter from '../components/order_filter';

const MerchantWithdrawList = () : ReactElement<ReactNode> => {
    return (
        <div className='merchant-withdraw-list'>
            商家提币列表
            <OrderFilter/>
        </div>
    )
};

export default MerchantWithdrawList;