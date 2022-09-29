
import { Popover } from 'antd';
import { ReactElement, ReactNode } from 'react';
import OrderFilter from '../components/order_filter';

const MerchantDepositList = (): ReactElement<ReactNode> => {
    return (
        <div className='merchant-deposit-list'>
            <p>商家充币列表</p>
            <Popover placement="right" content="123" trigger="hover">
                <p style={{fontSize:'22px',width:'22px'}} className='iconfont icon-a-fuzhi-22'></p>
            </Popover>
            <OrderFilter />
        </div>
    )
};

export default MerchantDepositList;