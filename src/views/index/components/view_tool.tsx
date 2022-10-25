
import { ReactElement, ReactNode, useState, useContext } from 'react';
import { IBPay } from '../../../App';
import TutorialBox from './tutorial';
import { useLocation } from 'react-router-dom';
import { Button } from 'antd';
import { useEffect } from 'react';

interface Props {
    updateMenu: (val: number) => void
}

const ViewTool = (props: Props): ReactElement<ReactNode> => {
    const [iconStatus, setIconStatus] = useState<number>(1);
    const { state } = useContext(IBPay);
    const [visible,setVisible] = useState<boolean>(false);
    const [tuType,setTuType] = useState<number>(1);
    const location = useLocation();
    useEffect(() => {
        console.log(location)
    },[])
    return (
        <div className='view-tool'>
            <div className='left-oper'>
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
            <TutorialBox resetModal={(val: boolean) => {
                setVisible(val)
            }} type={tuType} value={visible}/>
            <div className='right-step-btn'>
                {location.pathname === '/asset/merchan-withdraw' && <Button type='primary' onClick={() => {
                    setVisible(true);
                    setTuType(2);
                }}>
                    <span className='iconfont icon-shiyongjiaocheng'></span>
                    提币教程
                </Button>}
                {location.pathname === '/asset' && <Button type='primary' onClick={() => {
                    setVisible(true);
                    setTuType(1);
                }}>
                    <span className='iconfont icon-shiyongjiaocheng'></span>
                    充币教程
                </Button>}
            </div>
        </div>
    )
};

export default ViewTool;