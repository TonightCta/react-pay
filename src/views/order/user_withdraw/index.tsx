
import { ReactElement, ReactNode } from 'react';
import OrderFilter from '../components/order_filter';

const UserWithdrawList = () : ReactElement<ReactNode> => {
    return (
        <div className='user-withdraw-list'>
            用户提币列表
            <OrderFilter/>
        </div>
    )
};

export default UserWithdrawList;