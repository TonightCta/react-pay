
import { Button, Input } from 'antd';
import { ReactElement, ReactNode, useState } from 'react';
import FaileFee from './components/faile_fee';
import WithDrawBox from './components/withdraw_box';
import './index.scss'
import { useEffect } from 'react';
import { CheckFeeApi } from '../../../request/api'


export interface Withdraw {
    amount: number,
    coin: string,
    work_fee: number,
    fee: number,
    address: string,
};

export const sourceWithdraw: Withdraw = {
    amount: 0,
    coin: '',
    work_fee: 0,
    fee: 0,
    address: '',
}

const MerchantWithdraw = (): ReactElement<ReactNode> => {
    const [activeCoin, setActiveCoin] = useState<string>('TRX');
    // 币种列表
    const [coin, setCoin] = useState<string[]>([]);
    //下一步
    const [withDrawBox, setWithdrawBox] = useState<{
        withdraw: boolean,
        fee: boolean
    }>({
        withdraw: false,
        fee: false
    });
    //提币地址
    const [withdrawAddress, setWithdrawAddress] = useState<string>('');
    //提币金额
    const [withdrawNum, setWithdrawNum] = useState<number>(0);
    //手续费信息
    const [balance, setBalance] = useState<{
        withdrawMinerFee: number,
        withdrawFee: number,
        mainAsset: string,
        userAvailable: string,
        userFeeAvailable: string,
        mchAvailable: string,
        mchFeeAvailable: string,
        withdraw_service_fee_rate: number
    }>({
        withdrawMinerFee: 0,
        withdrawFee: 0,
        mainAsset: '',
        userAvailable: '0',
        userFeeAvailable: '0',
        mchAvailable: '0',
        mchFeeAvailable: '0',
        withdraw_service_fee_rate: 0,
    });
    useEffect(() => {
        setBalance({
            ...balance,
            withdrawFee: withdrawNum * balance.withdraw_service_fee_rate
        })
    }, [withdrawNum])
    //选择币种
    const setRechargeMsg = (_index?: number) => {
        setWithdrawNum(0);
        const coins = JSON.parse(sessionStorage.getItem('account') || '{}')?.coinStatementList;
        if (!_index) {
            setCoin(coins.map((item: { asset: string }) => {
                return item.asset
            }));
        };
        if(coins.length < 1){
            return
        }
        setBalance({
            ...balance,
            withdrawMinerFee: coins[_index ? _index : 0].withdrawMinerFee,
            userAvailable: coins[_index ? _index : 0].userAvailable,
            mainAsset: coins[_index ? _index : 0].mainAsset,
            userFeeAvailable: coins[_index ? _index : 0].userFeeAvailable,
            mchAvailable: coins[_index ? _index : 0].mchAvailable,
            mchFeeAvailable: coins[_index ? _index : 0].mchFeeAvailable,
            withdraw_service_fee_rate: coins[_index ? _index : 0].withdraw_service_fee_rate,
        });
    };
    useEffect(() => {
        setRechargeMsg();
    }, []);
    const [withDrawMsg, setWithdrawMsg] = useState<Withdraw>(sourceWithdraw);
    //提交提币
    const submitWithdraw = async () => {
        const check = await CheckFeeApi({
            coin: activeCoin,
            amount: withdrawNum
        });
        const { code, data } = check;
        if (code !== 200) {
            setWithdrawBox({
                ...withDrawBox,
                fee: true
            });
            return
        };
        const draw_num = activeCoin === balance.mainAsset ? withdrawNum - data.totalPoolFee : withdrawNum;
        setWithdrawMsg({
            amount: draw_num - draw_num / 100,
            address: withdrawAddress,
            coin: activeCoin,
            work_fee: data.totalToolFee,
            fee: (draw_num - draw_num / 100) / 100
        });
        setWithdrawBox({
            ...withDrawBox,
            withdraw: true
        });
    }
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
                <div className='select-address'>
                    <p className='select-label'>
                        选择提币账户
                    </p>
                    <div className='inp-address'>
                        <Input type="text" placeholder='请输入提币地址' value={withdrawAddress} onChange={(e) => {
                            setWithdrawAddress(e.target.value)
                        }} />
                        <p>使用任何除<span>{activeCoin}</span>之外的其他地址都会造成永久的提币损失。</p>
                    </div>
                </div>
                <div className='select-address inp-amount'>
                    <p className='select-label'>
                        <span>提币数量&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span>最低提币数量：1</span>
                    </p>
                    <div className={`inp-address ${withdrawNum > Number(balance.userAvailable) ? 'faile-inp' : ''}`}>
                        {withdrawNum > Number(balance.userAvailable) && <div className='error-amount'>
                            <p><span className='iconfont icon-tixing'></span>不能大于可用提币金额</p>
                        </div>}
                        <Input type="number" value={withdrawNum} onChange={(e) => {
                            setWithdrawNum(Number(e.target.value));
                        }} placeholder='请输入提币数量' />
                        <p className='auto-inp-all' onClick={() => {
                            setWithdrawNum(Number(balance.userAvailable))
                        }}>
                            全部
                        </p>
                        <div className='inp-amount-remark'>
                            <p>矿工费<strong>{balance.withdrawMinerFee}&nbsp;{balance.mainAsset}</strong></p>
                            <p>提币手续费<strong>{balance.withdrawFee}&nbsp;{activeCoin}</strong></p>
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
                                <p>{balance.userAvailable}</p>
                                <p>可提现</p>
                            </li>
                            <li>
                                <p>{balance.userFeeAvailable}</p>
                                <p>提现矿工费</p>
                            </li>
                            <li>
                                <p>{balance.mchAvailable}</p>
                                <p>可代付</p>
                            </li>
                            <li>
                                <p>{balance.mchFeeAvailable}</p>
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
                        <Button disabled={!withdrawAddress || !withdrawNum || withdrawNum > Number(balance.userAvailable)} type='primary' onClick={() => {
                            submitWithdraw()
                        }}>下一步</Button>
                    </div>
                </div>
            </div>
            {/* 矿工费不足 */}
            <FaileFee value={withDrawBox.fee} resetModal={(val: boolean): void => {
                setWithdrawBox({
                    ...withDrawBox,
                    fee: val
                })
            }} />
            {/* 提币 */}
            <WithDrawBox resetValue={() => {
                setWithdrawAddress('');
                setWithdrawNum(0);
                setTimeout(() => {
                    setRechargeMsg(coin.indexOf(activeCoin));
                }, 300)
            }} drawMsg={withDrawMsg} value={withDrawBox.withdraw} resetModal={(val: boolean): void => {
                setWithdrawBox({
                    ...withDrawBox,
                    withdraw: val
                });
            }} />
        </div>
    )
};

export default MerchantWithdraw;