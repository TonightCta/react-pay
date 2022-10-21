
import { ReactElement, ReactNode } from 'react';
import InnerTitle from './title';

const PackageView = (): ReactElement<ReactNode> => {
    return (
        <div className='package-view' id='package-view'>
            <InnerTitle title='套餐服务' />
            <img className='right-pic' src={require('../../../assets/images/site/package_right.png')} alt="" />
            <div className='package-inner'>
                <ul>
                    <li>
                        <div className='pack-name'>
                            <p className='name-line'></p>
                            <p>月套餐</p>
                        </div>
                        <div className='pack-inner'>
                            <div className='coin-type'>
                                <p>币种类型</p>
                                <p>
                                    <img className='coin-icon' src={require('../../../assets/images/site/eth.png')} alt="" />
                                    <img className='coin-icon' src={require('../../../assets/images/site/btc.png')} alt="" />
                                    <img className='coin-icon' src={require('../../../assets/images/site/trx.png')} alt="" />
                                </p>
                            </div>
                            <div className='pack-address'>
                                <div>
                                    <p>地址数量</p>
                                    <p>1000</p>
                                </div>
                            </div>
                            <div className='pack-fee'>
                                <p>套餐收费</p>
                                <p>1000U</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='pack-name'>
                            <p className='name-line'></p>
                            <p>灵活套餐</p>
                        </div>
                        <div className='pack-inner'>
                            <div className='coin-type'>
                                <p>币种类型</p>
                                <p>
                                    <img className='coin-icon' src={require('../../../assets/images/site/eth.png')} alt="" />
                                    <img className='coin-icon' src={require('../../../assets/images/site/btc.png')} alt="" />
                                    <img className='coin-icon' src={require('../../../assets/images/site/trx.png')} alt="" />
                                </p>
                            </div>
                            <div className='pack-address'>
                                <div className='no-limit'>
                                    <p>地址数量</p>
                                    <p>
                                        <img src={require('../../../assets/images/site/limit.png')} alt="" />
                                        无限制
                                    </p>
                                </div>
                            </div>
                            <div className='pack-fee'>
                                <p>套餐收费</p>
                                <div className='no-limit'>
                                    <p>
                                        <span>
                                            <img src={require('../../../assets/images/site/down.png')} alt="" />
                                            进1.5%
                                        </span>
                                        <span>
                                            <img src={require('../../../assets/images/site/up.png')} alt="" />
                                            出1%
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