
import { Popover } from 'antd';
import { ReactElement, useState } from 'react';

interface Inner {
    name: string,
    list: { coin: string, total: number | string }[]
}

interface Card {
    icon: string,
    title: string,
    count: number,
    background: string,
    more: Inner[],
    more_icon?: string,
    icon_bg: string,
    uint?: string,
    icon_color: string,
}

const source = [
    {
        icon: 'icon-a-bianzu554',
        title: '商户数:',
        count: 0,
        background: '#F7F5FF',
        icon_bg: '#EBE6FF',
        more: [],
        icon_color: '#7C61FF',
    },
    {
        icon: 'icon-a-bianzu553',
        title: '总充值:',
        count: 0,
        background: '#F5FFF1',
        icon_bg: '#E2FCE2',
        more: [
            {
                name: '商户',
                list: [
                    {
                        coin: 'ETH',
                        total: 0
                    }
                ],
            },
            {
                name: '用户',
                list: [
                    {
                        coin: 'DOGE',
                        total: 0
                    }
                ],
            }
        ],
        uint: 'U',
        more_icon: 'icon-xialajiantouxiaobeifen',
        icon_color: '#5DA95A',
    },
    {
        icon: 'icon-a-bianzu552',
        title: '总提币:',
        count: 0,
        background: '#FEF8F6',
        icon_bg: '#FFECE6',
        more: [
            {
                name: '商户',
                list: [
                    {
                        coin: 'TRX',
                        total: 0
                    }
                ],
            },
            {
                name: '用户',
                list: [
                    {
                        coin: 'USDT-TRC20',
                        total: 0
                    }
                ],
            }
        ],
        uint: 'U',
        more_icon: 'icon-xialajiantouxiaobeifen',
        icon_color: '#FF7F53',
    },
    {
        icon: 'icon-zongshouxufei',
        title: '总手续费:',
        count: 0,
        icon_bg: '#FFF8CF',
        background: '#FFFDF2',
        more: [
            {
                name: '充值手续费',
                list: [
                    {
                        coin: 'BTC',
                        total: 0
                    }
                ],
            },
            {
                name: '提现手续费',
                list: [
                    {
                        coin: 'AAVE',
                        total: 0
                    }
                ],
            },
            {
                name: '矿工费',
                list: [
                    {
                        coin: 'AAVE',
                        total: 0
                    }
                ],
            },
        ],
        uint: 'U',
        more_icon: 'icon-xialajiantouxiaobeifen',
        icon_color: '#F2A724',
    }
]

const AdminView = (): ReactElement => {
    const [list, setList] = useState<Card[]>(source);
    const MoreContent = (props:{list:Inner[]}) : ReactElement => {
        return (
            <div className='more-content'>
                {
                    props.list.map((item:Inner,index:number) : ReactElement => {
                        return (
                            <div key={index}>
                                <p className='inner-title'>{item.name}</p>
                                <ul>
                                    {
                                        item.list.map((inner,indexInner) : ReactElement => {
                                            return (
                                                <li key={indexInner}>
                                                    <p>{inner.coin}</p>
                                                    <p>{inner.total}</p>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    return (
        <div className='admin-view'>
            <ul>
                {
                    list.map((item: Card, index: number): ReactElement => {
                        return (
                            <li key={index} style={{ background: item.background }}>
                                <div className='icon-box' style={{ background: item.icon_bg }}>
                                    <p style={{ color: item.icon_color }} className={`iconfont ${item.icon}`}></p>
                                </div>
                                <div className='card-msg'>
                                    <p>{item.title}</p>
                                    <p>{item.count}</p>
                                </div>
                                {
                                    item.more.length > 0 && <div className='more-detail'>
                                        <Popover content={<MoreContent list={item.more}/>} trigger="hover" placement="bottomRight">
                                            <div className='more-inner'>
                                                <p>明细</p>
                                                <p><span className='iconfont icon-bizhongmingxi'></span></p>
                                            </div>
                                        </Popover>
                                    </div>
                                }
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
};

export default AdminView;