
import { ReactElement, ReactNode } from 'react';
import AdvView from './components/adv';
import FooterNav from './components/footer';
import FrameView from './components/frame';
import SiteNav from './components/nav';
import PackageView from './components/package';
import ScreenView from './components/screen';
import TeamView from './components/team';
import './index.scss'

const SiteIndex = () : ReactElement<ReactNode> => {
    return (
        <div className='site-index'>
            {/* <SiteNav/> */}
            {/* 首屏 */}
            <ScreenView/>
            {/* 功能框架 */}
            <FrameView/>
            {/* 产品优势 */}
            <AdvView/>
            {/* 套餐服务 */}
            <PackageView/>
            {/* 合作伙伴 */}
            <TeamView/>
            {/* 底部导航 */}
            <FooterNav/>
        </div>
    )
};

export default SiteIndex;