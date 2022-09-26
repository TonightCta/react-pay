
import { ReactElement, ReactNode } from 'react';
import OrderFilter from '../components/order_filter';
import OrderTable from '../components/order_table';

const UserDepositList = () : ReactElement<ReactNode> => {
    return (
        <div className='user-deposit-list'>
            用户充币列表
            <OrderFilter/>
            <OrderTable/>
        </div>
    )
};

export default UserDepositList;