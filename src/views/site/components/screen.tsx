
import { Button } from 'antd';
import { ReactElement, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { IBPay } from '../../../App';

const ScreenView = (): ReactElement<ReactNode> => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { state } = useContext(IBPay);
    const { language } = state;
    return (
        <div className='screen-view' id='screen-view'>
            <img className='left-pic' src={require('../../../assets/images/site/screen_1.png')} alt="" />
            <img className='right-pic' src={require('../../../assets/images/site/screen_2.png')} alt="" />
            <div className={`screen-inner ${language === 'en' && 'screen-inner-en' || language === 'zh_TW' && 'screen-inner-tw' || ''}`}>
                <img className='text-img' src={require(`../../../assets/images/site/title_${language}.png`)} alt="" />
                <p className='text-con'>
                    {/* 快速集成加密货币支付到您的网站或APP */}
                    {t('public.screen_title')}
                </p>
                <p>
                    <Button type='primary' className='demo-btn' onClick={() => {
                        navigate('/demo')
                    }}>DEMO</Button>
                    <Button type='primary'>
                        {/* 联系我们 */}
                        {t('public.contact_us')}
                        <img src={require('../../../assets/images/site/right_arrow.png')} alt="" />
                    </Button>
                </p>
            </div>
        </div>
    )
};

export default ScreenView;