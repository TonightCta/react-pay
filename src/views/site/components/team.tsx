
import { ReactElement, ReactNode } from 'react';

const TeamView = (): ReactElement<ReactNode> => {
    return (
        <div className='team-view' id='team-view'>
            <div className='frame-title'>
                <p className='line-left line-public'></p>
                <p className='text'>合作伙伴</p>
                <p className='line-right line-public'></p>
            </div>
            <img className='team-bg' src={require('../../../assets/images/site/team_earth.png')} alt="" />
            <div className='team-inner'>
                <p className='inner-title'>目前已有1369+全球合作伙伴</p>
                <p className='inner-title'>选择HLWZC.COM支付</p>
                <div className='num-box'>
                    <div>
                        <p>5,031,187</p>
                        <p>服务用户</p>
                    </div>
                    <p className='num-line'></p>
                    <div>
                        <p>1369</p>
                        <p>服务商户</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default TeamView;