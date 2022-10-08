
import { Button, Input } from 'antd';
import { ReactElement, ReactNode, useState } from 'react';
import './index.scss'

const coin: string[] = ['TRX', 'USDT-TRC20']

const MerchantWithdraw = (): ReactElement<ReactNode> => {
    const [activeCoin, setActiveCoin] = useState<string>('TRX');
    return (
        <div className='merchant-withdraw'>
            <div className='assets-oper-remark'>
                <p className='iconfont icon-tixing'></p>
                <p>到账时间说明：1-5分钟，快慢取决于链上区块拥堵情况</p>
            </div>
            <div className='withdraw-content'>
                <div className='select-coin'>
                    <p className='select-label'>选择提币账户</p>
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
                <div className='select-address'>
                    <p className='select-label'>
                        选择提币账户
                    </p>
                    <div className='inp-address'>
                        <Input type="text" placeholder='请输入提币地址' />
                        <p>使用任何除<span>{activeCoin}</span>之外的其他地址都会造成永久的提币损失。</p>
                    </div>
                </div>
                <div className='select-address inp-amount'>
                    <p className='select-label'>
                        <span>提币数量&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span>最低提币数量：1</span>
                    </p>
                    <div className='inp-address'>
                        <div className='error-amount'>
                            <p><span className='iconfont icon-tixing'></span>不能大于可用提币金额</p>
                        </div>
                        <Input type="number" placeholder='请输入提币数量' />
                        <p className='auto-inp-all'>
                            全部
                        </p>
                        <div className='inp-amount-remark'>
                            <p>矿工费<strong>0</strong></p>
                            <p>提币手续费<strong>0</strong></p>
                        </div>
                    </div>
                </div>
                <div className='select-address balance-msg'>
                    <p className='select-label'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </p>
                    <div className='inp-address'>
                        <ul>
                            <li>
                                <p>0.89999999</p>
                                <p>可提现</p>
                            </li>
                            <li>
                                <p>0</p>
                                <p>提现矿工费</p>
                            </li>
                            <li>
                                <p>0.89999999</p>
                                <p>可代付</p>
                            </li>
                            <li>
                                <p>0.89999999</p>
                                <p>代付矿工费</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='select-address next-btn'>
                    <p className='select-label'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </p>
                    <div className='inp-address'>
                        <Button type='primary'>下一步</Button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default MerchantWithdraw;