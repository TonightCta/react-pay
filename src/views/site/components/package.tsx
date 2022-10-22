
import { ReactElement, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import InnerTitle from './title';
import { useContext } from 'react';
import { IBPay } from '../../../App';

const PackageView = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const { state } = useContext(IBPay);
    const { language } = state;
    return (
        <div className='package-view' id='package-view'>
            {/* 套餐服务 */}
            <InnerTitle title={t('public.package')} />
            <img className='right-pic' src={require('../../../assets/images/site/package_right.png')} alt="" />
            <div className='package-inner'>
                <ul>
                    <li>
                        <div className='pack-name'>
                            <p className='name-line'></p>
                            <p>
                                {/* 月套餐 */}
                                {t('package.month')}
                            </p>
                        </div>
                        <div className={`pack-inner ${language === 'en' ? 'pack-inner-en' : ''}`}>
                            <div className='coin-type'>
                                <p>
                                    {/* 币种类型 */}
                                    {t('package.coin_type')}
                                </p>
                                <p>
                                    <img className='coin-icon' src={require('../../../assets/images/site/eth.png')} alt="" />
                                    <img className='coin-icon' src={require('../../../assets/images/site/btc.png')} alt="" />
                                    <img className='coin-icon' src={require('../../../assets/images/site/trx.png')} alt="" />
                                </p>
                            </div>
                            <div className='pack-address'>
                                <div>
                                    <p>
                                        {/* 地址数量 */}
                                        {t('package.address_amount')}
                                    </p>
                                    <p>1000</p>
                                </div>
                            </div>
                            <div className='pack-fee'>
                                <p>
                                    {/* 套餐收费 */}
                                    {t('package.fee')}
                                </p>
                                <p>1000U</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='pack-name'>
                            <p className='name-line'></p>
                            <p>
                                {/* 灵活套餐 */}
                                {t('package.fee')}
                            </p>
                        </div>
                        <div className={`pack-inner ${language === 'en' ? 'pack-inner-en' : ''}`}>
                            <div className='coin-type'>
                                <p>
                                    {/* 币种类型 */}
                                    {t('package.coin_type')}
                                </p>
                                <p>
                                    <img className='coin-icon' src={require('../../../assets/images/site/eth.png')} alt="" />
                                    <img className='coin-icon' src={require('../../../assets/images/site/btc.png')} alt="" />
                                    <img className='coin-icon' src={require('../../../assets/images/site/trx.png')} alt="" />
                                </p>
                            </div>
                            <div className='pack-address'>
                                <div className='no-limit'>
                                    <p>
                                        {/* 地址数量 */}
                                        {t('package.address_amount')}
                                    </p>
                                    <p>
                                        <img src={require('../../../assets/images/site/limit.png')} alt="" />
                                        {/* 无限制 */}
                                        {t('package.no_limit')}
                                    </p>
                                </div>
                            </div>
                            <div className='pack-fee'>
                                <p>
                                    {/* 套餐收费 */}
                                    {t('package.fee')}
                                </p>
                                <div className='no-limit'>
                                    <p>
                                        <span>
                                            <img src={require('../../../assets/images/site/down.png')} alt="" />
                                            {t('package.in')}1.5%
                                        </span>
                                        <span>
                                            <img src={require('../../../assets/images/site/up.png')} alt="" />
                                            {t('package.out')}1%
                                        </span>
                                    </p>
                                    <p className='iconfont icon-wenhao'></p>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
};

export default PackageView;