
import { Button } from 'antd';
import { ReactElement, ReactNode, useState } from 'react';
import './index.scss'


const coin: string[] = ['TRX', 'USDT-TRC20']

const MerchantDeposit = (): ReactElement<ReactNode> => {
    const [activeCoin, setActiveCoin] = useState<string>('TRX');
    return (
        <div className='merchan-deposit'>
            <div className='assets-oper-remark'>
                <p className='iconfont icon-tixing'></p>
                <p>到账时间说明：1-5分钟，快慢取决于链上区块拥堵情况</p>
            </div>
            <div className='deposit-content'>
                <div className='select-coin'>
                    <p className='select-label'>选择充币账户</p>
                    <ul>
                        {
                            coin.map((item: string, index: number): ReactElement => {
                                return (
                                    <li key={index} className={`${activeCoin === item ? 'active-coin' : ''}`} onClick={() => {
                                        setActiveCoin(item)
                                    }}>
                                        {item}
                                        <div className='active-label'></div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                {/* 充值帐户 */}
                <div className='recharge-account public-account'>
                    <div className='account-remark'>
                        <p className='remark-title'>
                            充币账户&nbsp;{activeCoin}
                            <span className='iconfont icon-wenhao'></span>
                        </p>
                        <p className='remark-text'>
                            发送任何除<span>{activeCoin}</span>之外的货币至这一地址都会造成永久的提币损失。
                        </p>
                    </div>
                    <div className='address-qr'>
                        <img src={require('../../../assets/images/qr.png')} alt="" />
                    </div>
                    <div className='address-msg'>
                        <div className='fee-amount msg-public'>
                            <p className='msg-title'>可代付手续费</p>
                            <p>0</p>
                        </div>
                        <div className='address-text msg-public'>
                            <p className='msg-title'>充值地址</p>
                            <p className='text'>3GJieAP9YuGK89bXohtZWog9P4rhBvnRst</p>
                            <p>
                                <Button type='primary' size='small'>复制</Button>
                            </p>
                        </div>
                    </div>
                </div>
                {/* 手续费账户 */}
                <div className='fee-account public-account'>
                    <div className='account-remark'>
                        <p className='remark-title'>
                            手续费账户&nbsp;{activeCoin}
                            <span className='iconfont icon-wenhao'></span>
                        </p>
                        <p className='remark-text'>
                            发送任何除<span>{activeCoin}</span>之外的货币至这一地址都会造成永久的提币损失。
                        </p>
                    </div>
                    <div className='address-qr'>
                        <img src={require('../../../assets/images/qr.png')} alt="" />
                    </div>
                    <div className='address-msg'>
                        <div className='fee-amount msg-public'>
                            <p className='msg-title'>可提现手续费</p>
                            <p>0</p>
                        </div>
                        <div className='address-text msg-public'>
                            <p className='msg-title'>充值地址</p>
                            <p className='text'>3GJieAP9YuGK89bXohtZWog9P4rhBvnRst</p>
                            <p>
                                <Button type='primary' size='small'>复制</Button>
                            </p>
                        </div>
                    </div>
                </div>
                {/* 购买加密货币 */}
                <div className='coin-market-outside'>
                    <div className='market-remark'>
                        <p>去购买加密货币</p>
                        <p>支付方式根据您当前所在的位置有所不同</p>
                    </div>
                    <ul>
                        <li>
                            <img src={require('../../../assets/images/okex_icon.png')} alt="" />
                        </li>
                        <li>
                            <img src={require('../../../assets/images/gate_icon.png')} alt="" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default MerchantDeposit;