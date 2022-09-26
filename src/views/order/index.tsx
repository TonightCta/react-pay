
import { ReactElement, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import './index.scss'
// 订单
const OrderIndex = () : ReactElement<ReactNode> => {
    return (
        <div className='order-index'>
            <Outlet/>
        </div>
    )
};

export default OrderIndex;