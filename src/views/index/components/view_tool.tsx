
import { ReactElement, ReactNode, useState, useContext } from 'react';
import { IBPay } from '../../../App';

interface Props {
    updateMenu: (val: number) => void
}

const ViewTool = (props: Props): ReactElement<ReactNode> => {
    const [iconStatus,setIconStatus] = useState<number>(1);
    const { state } = useContext(IBPay);
    return (
        <div className='view-tool'>
            <div className='oper-menu' onClick={() => {
                props.updateMenu(iconStatus === 1 ? 0 : 1);
                setIconStatus(iconStatus === 1 ? 0 : 1);
            }}>
                <p className={`iconfont icon-a-shouqi2 ${iconStatus === 0 ? 'hidden-menu' : ''}`}></p>
            </div>
            <p className='level-one-route level-text'>{JSON.parse(state.routeMsg || '{"level_one":"首页"}')?.level_one}</p>
            <p className='iconfont icon-shouqi'></p>
            <p className='level-two-route level-text'>{JSON.parse(state.routeMsg || '{"level_two":"概览"}')?.level_two}</p>
        </div>
    )
};

export default ViewTool;