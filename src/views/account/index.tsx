
import { ReactElement, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import './index.scss'

// 账户中心


const AccountIndex = (): ReactElement<ReactNode> => {
    return (
        <div className='account-index'>
            <Outlet />
        </div>
    )
};

export default AccountIndex;