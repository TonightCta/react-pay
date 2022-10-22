
import { ReactElement, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

const TeamView = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    return (
        <div className='team-view' id='team-view'>
            <div className='frame-title'>
                <p className='line-left line-public'></p>
                <p className='text'>
                    {/* 合作伙伴 */}
                    {t('public.team')}
                </p>
                <p className='line-right line-public'></p>
            </div>
            <img className='team-bg' src={require('../../../assets/images/site/team_earth.png')} alt="" />
            <div className='team-inner'>
                <p className='inner-title'>
                    {/* 目前已有1369+全球合作伙伴 */}
                    {t('team.remark_1')}
                </p>
                <p className='inner-title'>
                    {/* 选择HLWZC.COM支付 */}
                    {t('team.remark_2')}
                </p>
                <div className='num-box'>
                    <div>
                        <p>5,031,187</p>
                        <p>
                            {/* 服务用户 */}
                            {t('team.user')}
                        </p>
                    </div>
                    <p className='num-line'></p>
                    <div>
                        <p>1369</p>
                        <p>
                            {/* 服务商户 */}
                            {t('team.merchant')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default TeamView;