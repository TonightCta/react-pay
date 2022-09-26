
import { ReactElement, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

//资产中心

const AssetIndex = () : ReactElement<ReactNode> => {
    return (
        <div className='asset-index'>
            <Outlet/>
        </div>
    )
};

export default AssetIndex;