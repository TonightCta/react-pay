
import { ReactElement, ReactNode } from 'react';
import OrderFilter from '../components/order_filter';
import OrderTable from '../components/order_table';

const UserWithdrawList = () : ReactElement<ReactNode> => {
    return (
        <div className='user-withdraw-list'>
            用户提币列表
            <OrderFilter/>
            <OrderTable/>
        </div>
    )
};

export default UserWithdrawList;