
import { ReactElement, ReactNode, useState, useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import './index.scss';
import Menu from './components/menu';
import ViewTool from './components/view_tool';
import { IBPay } from '../../App';


const IndexView = (): ReactElement<ReactNode> => {
    const [menuStatus, setMenuStatus] = useState<number>(1);
    const { state } = useContext(IBPay);
    return (
        <div className={`index-view ${menuStatus === 0 ? 'hidden-view-menu' : ''}`}>
            <div className='left-menu'>
                <Menu menuStatus={menuStatus}/>
            </div>
            <div className='right-view'>
                <div className='view-tool-box'>
                    <ViewTool updateMenu={(val:number) : void => {
                        setMenuStatus(val)
                    }}/>
                </div>
                <div className='view-box'>
                    {
                        state.token_new 
                            ? <Outlet />
                            : <Navigate to='/login' />
                    }
                </div>
            </div>
        </div>
    )
};

export default IndexView;