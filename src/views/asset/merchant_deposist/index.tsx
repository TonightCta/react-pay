
import { Button, message } from 'antd';
import { ReactElement, ReactNode, useState, useContext } from 'react';
import './index.scss'
import { IBPay } from '../../../App';
import { useEffect } from 'react';
import copy from 'copy-to-clipboard';
import QRCode from 'qrcode.react';




const MerchantDeposit = (): ReactElement<ReactNode> => {
    const [coin, setCoin] = useState<string[]>([]);
    const [activeCoin, setActiveCoin] = useState<string>('TRX');
    const { state } = useContext(IBPay);
    const [address, setAddress] = useState<{ recharge: string, fee: string }>({
        recharge: '',
        fee: ''
    });
    const [balance,setBalance] = useState<{recharge:string,fee:string}>({
        recharge:'0',
        fee:'0'
    })
    const setRechargeMsg = (_index?: number) => {
        const { account } = state;
        const coins = JSON.parse(account || '{}')?.coinStatementList;
        const feeCoins = JSON.parse(account || '{}')?.feeCoinStatementList;
        if (!_index) {
            setCoin(coins.map((item: { asset: string }) => {
                return item.asset
            }));
        }
        setAddress({
            recharge:coins.length > 0 ?  coins[_index ? _index : 0].merchantDepositAddress : 'No address',
            fee: feeCoins.length > 0 ? feeCoins[_index ? _index : 0].merchantDepositAddress : 'No address'
        });
        setBalance({
            recharge:coins.length > 0 ? coins[_index ? _index : 0].mchFeeAvailable : '0',
            fee:feeCoins.length > 0 ? feeCoins[_index ? _index : 0].userFeeAvailable : '0'
        })
    }
    useEffect(() => {
        setRechargeMsg();
    }, [])
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
                                        setActiveCoin(item);
                                        setRechargeMsg(index);
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
                        <QRCode value={address.recharge} size={152} id="qrCode" />
                    </div>
                    <div className='address-msg'>
                        <div className='fee-amount msg-public'>
                            <p className='msg-title'>可代付手续费</p>
                            <p>{balance.recharge}</p>
                        </div>
                        <div className='address-text msg-public'>
                            <p className='msg-title'>充值地址</p>
                            <p className='text'>{address.recharge}</p>
                            <p>
                                <Button type='primary' size='small' onClick={() => {
                                    copy(address.recharge);
                                    message.success('复制成功');
                                }}>复制</Button>
                            </p>
                        </div>
                    </div>
                </div>
                {/* 手续费账户 */}
                {activeCoin !== 'USDT-TRC20' && <div className='fee-account public-account'>
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
                        <QRCode value={address.fee} size={152} id="qrCode" />
                    </div>
                    <div className='address-msg'>
                        <div className='fee-amount msg-public'>
                            <p className='msg-title'>可提现手续费</p>
                            <p>{balance.fee}</p>
                        </div>
                        <div className='address-text msg-public'>
                            <p className='msg-title'>充值地址</p>
                            <p className='text'>{address.fee}</p>
                            <p>
                                <Button type='primary' size='small' onClick={() => {
                                    copy(address.fee);
                                    message.success('复制成功');
                                }}>复制</Button>
                            </p>
                        </div>
                    </div>
                </div>}
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