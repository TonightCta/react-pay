
import { Popover, Tooltip } from 'antd';
import { ReactElement, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { WalletViewApi } from '../../../request/api';
import { IBPay } from '../../../App';

interface Balance {
    icon: string,
    uint: string,
    title: string,
    tootip?: string,
    bg: string,
    count: number,
    detail: Inner[],
    btn: string,
    url:string,
}

interface Inner {
    coin: string,
    amount: number,
    link?: string
}


const source: Balance[] = [
    {
        icon: require('../../../assets/images/balance_card_1.png'),
        uint: 'U',
        title: '代付',
        bg: '#F6FFF8',
        count: 0,
        btn: 'deposit',
        url:'/asset',
        detail: [
            {
                coin: 'USDT-TRC20',
                amount: 0
            }
        ]
    },
    {
        icon: require('../../../assets/images/balance_card_2.png'),
        uint: 'TRX',
        title: '代付矿工费',
        tootip: '商户代付时链上所需的矿工费',
        bg: '#F6F6FF',
        count: 0,
        url:'/asset',
        btn: 'deposit',
        detail: [
            {
                coin: 'USDT-TRC20',
                amount: 0
            }
        ]
    },
    {
        icon: require('../../../assets/images/balance_card_3.png'),
        uint: 'U',
        title: '提现',
        bg: '#FFFCF9',
        count: 0,
        url:'/asset/merchant-withdraw',
        btn: 'withdraw',
        detail: [
            {
                coin: 'USDT-TRC20',
                amount: 0
            }
        ]
    },
    {
        icon: require('../../../assets/images/balance_card_4.png'),
        uint: 'TRX',
        title: '提现矿工费',
        tootip: '商户提现时链上所需的矿工费',
        bg: '#FFF8F9',
        count: 0,
        btn: 'deposit',
        url:'/asset',
        detail: [
            {
                coin: 'USDT-TRC20',
                amount: 0
            },
            {
                coin: 'TRX',
                amount: 0
            }
        ]
    },
]

const BalanceCard = (): ReactElement => {
    const [list, setList] = useState<Balance[]>(source);
    const { state } = useContext(IBPay);
    const navigate = useNavigate();
    useEffect(() => {
        return () => {
            setList(source)
        }
    }, []);
    useEffect(() => {
        walletViewService();
    },[state.merchant_id])
    const walletViewService = async () => {
        const { merchant_id } = state;
        const reuslt = await WalletViewApi({
            mch_id: merchant_id
        });
        const list = source;
        const { data } = reuslt;
        list[0].count = data.mchAvailableTotal;
        list[0].detail = data.mchAvailable;
        list[1].count = data.mchFeeAvailableTotal;
        list[1].detail = data.mchFeeAvailable;
        list[2].count = data.userAvailableTotal;
        list[2].detail = data.userAvailable;
        list[3].count = data.userFeeAvailableTotal;
        list[3].detail = data.userFeeAvailable;
        setList([...list])
    }
    const DetailContent = (props: { list: Inner[] }): ReactElement => {
        return (
            <div className='balance-detail-popover'>
                <ul>
                    {
                        props.list.map((item: Inner, index: number): ReactElement => {
                            return (
                                <li key={index}>
                                    <p className='coin-name'>{item.coin}</p>
                                    <div className='count-link'>
                                        <p>{item.amount}</p>
                                        {/* {
                                            item.link && 
                                        } */}
                                        <p className='liquire-text'>
                                            查询<span className='iconfont icon-chaxun'></span>
                                        </p>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
    return (
        <div className='balance-card'>
            <ul>
                {
                    list.map((item: Balance, index: number): ReactElement => {
                        return (
                            <li key={index} style={{ background: item.bg }}>
                                <div className='oper-btn' onClick={() => {
                                    navigate(item.url)
                                }}>
                                    {item.btn === 'deposit' ? '去充值' : '去提现'}
                                </div>
                                <div className='card-icon'>
                                    <img src={item.icon} alt="" />
                                </div>
                                <div className='card-msg'>
                                    <div className='card-name'>
                                        <p>{item.title}</p>
                                        {
                                            item.tootip && <Tooltip placement="top" title={item.tootip}>
                                                <span className='iconfont icon-wenhao'></span>
                                            </Tooltip>
                                        }
                                    </div>
                                    <p className='balance-count'>{Number(item.count).toFixed(2)}&nbsp;{item.uint}</p>
                                    <Popover placement="bottomLeft" content={<DetailContent list={item.detail} />} trigger="click">
                                        <div className='balance-detail'>
                                            <p>币种明细</p>
                                            <img src={require('../../../assets/images/down_icon.png')} alt="" />
                                        </div>
                                    </Popover>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
};

export default BalanceCard;