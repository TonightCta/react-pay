
import { Button, message } from 'antd';
import { ReactElement, ReactNode, useState } from 'react';
import copy from 'copy-to-clipboard';
import QRCode from 'qrcode.react';
import './index.scss'

interface Coin {
    name: string,
    icon: string,
    address: string
}

const coins: Coin[] = [
    {
        name: 'BTC',
        icon: require('../../assets/images/site/coin/btc.png'),
        address: 'unknow',
    },
    {
        name: 'USDT-TRC20',
        icon: require('../../assets/images/site/coin/trc20.png'),
        address: 'unknow',
    },
    {
        name: 'ETH',
        icon: require('../../assets/images/site/coin/eth.png'),
        address: 'unknow',
    },
    {
        name: 'USDT-ERC20',
        icon: require('../../assets/images/site/coin/erc20.png'),
        address: 'unknow',
    },
    {
        name: 'BCH',
        icon: require('../../assets/images/site/coin/bch.png'),
        address: 'unknow',
    },
    {
        name: 'DOGE',
        icon: require('../../assets/images/site/coin/doge.png'),
        address: 'unknow',
    },
    {
        name: 'USDC',
        icon: require('../../assets/images/site/coin/usdc.png'),
        address: 'unknow',
    },
    {
        name: 'LTC',
        icon: require('../../assets/images/site/coin/ltc.png'),
        address: 'unknow',
    },
    {
        name: 'TRX',
        icon: require('../../assets/images/site/coin/trx.png'),
        address: 'unknow',
    },
];

interface Exchange {
    icon: string,
    url: string
}

const exchange: Exchange[] = [
    {
        icon: require('../../assets/images/site/coin/coinbase.png'),
        url: 'unknow'
    },
    {
        icon: require('../../assets/images/site/coin/ftx.png'),
        url: 'unknow'
    },
    {
        icon: require('../../assets/images/site/coin/bian.png'),
        url: 'unknow'
    }
]

const DemoIndex = (): ReactElement<ReactNode> => {
    const [step, setStep] = useState<number>(1);
    const [selectCoin, setSelectCoin] = useState<Coin>(coins[0]);
    return (
        <div className='demo-index'>
            <img className='logo-pic' src={require('../../assets/images/site/logo.png')} alt="" />
            <p className='demo-title'>您可以在这体验充值流程</p>
            {step === 1
                ? <div className='demo-inner demo-before'>
                    <ul>
                        {
                            coins.map((item: Coin, index: number): ReactElement => {
                                return (
                                    <li key={index} onClick={() => {
                                        setSelectCoin(item);
                                        setStep(2);
                                    }}>
                                        <img src={item.icon} alt="" />
                                        <p>{item.name}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <p className='outside-exchange'>购买加密货币</p>
                    <img className='exchange-line' src={require('../../assets/images/site/demo_line.png')} alt="" />
                    <ul className='exchange-list'>
                        {
                            exchange.map((item: Exchange, index: number): ReactElement => {
                                return (
                                    <li key={index} onClick={() => {
                                        window.open(item.url)
                                    }}>
                                        <img src={item.icon} alt="" />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                : <div className='demo-inner demo-after'>
                    <div className='after-inner'>
                        <img src={selectCoin.icon} alt="" />
                        <p className='coin-name'>{selectCoin.name}</p>
                        <p className='reset-coin' onClick={() => { setStep(1) }}>变更</p>
                        <p className='coin-address'>
                            {selectCoin.address}
                            <span className='iconfont icon-a-fuzhi2' onClick={() => {
                                copy(selectCoin.address);
                                message.success('复制成功')
                            }}></span>
                        </p>
                        <div className='test-limit'>
                            <p>最低限额</p>
                            <p>0.001</p>
                        </div>
                    </div>
                    <p className='test-remark'>
                        <span className='iconfont icon-Attention'></span>
                        发送任何除ETH之外的货币至这一地址都会造成永久的充币损失。
                    </p>
                    <div className='qr-address'>
                        <QRCode value={selectCoin.address} size={282} id="qrCode" />
                    </div>
                </div>}
            <p className='oper-btn'>
                <Button type='primary'>咨询客服接入支付</Button>
            </p>
            <img className='img-bg' src={require('../../assets/images/site/demo_bg.png')} alt="" />
        </div>
    )
};

export default DemoIndex;