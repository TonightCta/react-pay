
import { ReactElement, ReactNode, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './index.scss';
import Menu from './components/menu';
import ViewTool from './components/view_tool';


const IndexView = (): ReactElement<ReactNode> => {
    const [menuStatus, setMenuStatus] = useState<number>(1);
    return (
        <div className={`index-view ${menuStatus === 0 ? 'hidden-view-menu' : ''}`}>
            <div className='left-menu'>
                <Menu />
            </div>
            <div className='right-view'>
                <div className='view-tool-box'>
                    <ViewTool updateMenu={(val:number) => {
                        setMenuStatus(val)
                    }}/>
                </div>
                <div className='view-box'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
};

export default IndexView;