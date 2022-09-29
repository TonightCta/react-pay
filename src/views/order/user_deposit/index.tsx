
import { ReactElement, ReactNode } from 'react';
import OrderFilter from '../components/order_filter';

const UserDepositList = () : ReactElement<ReactNode> => {
    return (
        <div className='user-deposit-list'>
            用户充币列表
            <OrderFilter/>
        </div>
    )
};

export default UserDepositList;