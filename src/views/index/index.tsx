
import { ReactElement, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import './index.scss';
import { IBPay } from '../../App';
import { useContext } from 'react';

const IndexView = (): ReactElement<ReactNode> => {
    const { state } = useContext(IBPay);
    return (
        <div className='index-view'>
            <div className='left-menu'>
                <div className='menu-inner'>
                    左侧菜单
                </div>
            </div>
            <div className='right-view'>
                <Outlet />
                {state.test}
            </div>
        </div>
    )
};

export default IndexView;