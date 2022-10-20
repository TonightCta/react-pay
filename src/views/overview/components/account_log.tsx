
import { Button, Popover, message } from 'antd';
import { ReactElement, useState, useContext, useRef, RefObject } from 'react';
import BalanceCard from './balance_card';
import LoginLog from './login_log';
import SettlementBox from './settlement_box';
import { IBPay } from '../../../App';
import { useEffect } from 'react';
import { Type } from '../../../utils/interface';
import LoadingView from './loading';
import { CheckProfitApi, CheckBalanceApi } from '../../../request/api';
import { useNavigate } from 'react-router-dom';

export interface Profit {
    trx: number,
    usdt: number,
    mch_id: string
}

export interface Balance {
    trx: number,
    trx2: number,
    usdt: number,
    mch_id: string
}

type HTML = any;


interface Account {
    email: string,
    ga: number,
    is_admin: boolean,
    last_login_time: string,
    mch_id: string,
    name: string,
}

const sourceAccount: Account = {
    email: '',
    ga: 0,
    is_admin: false,
    last_login_time: '',
    mch_id: '',
    name: '',
}

const AccountLog = (): ReactElement => {
    const { state, dispatch } = useContext(IBPay);
    //商家列表
    const [merchantList, setMerchantList] = useState<any[]>([]);
    //商户信息
    const [account, setAccount] = useState<Account>(sourceAccount);
    //admin view merchant info
    const [selectAccount, setSelecyAccount] = useState<Account>(sourceAccount);
    useEffect(() => {
        setMerchantList(state.merchant_list as []);
        setAccount(JSON.parse(state.account || '{}')?.merchantInfo);
        setSelecyAccount(JSON.parse(state.other_merchant || '{}'));
    }, [state.merchant_list]);
    //选择商家
    const [selectMerchantPopup, setSelectMerchantPopup] = useState<boolean>(false);
    //利润清算 & 余额提取
    const [visible, setVisible] = useState<boolean>(false);
    //操作类型
    const [boxType, setBoxType] = useState<number>(1);
    //查询检查
    const [query, setQuery] = useState<boolean>(false);
    const SelectMerchant = (): ReactElement => {
        return (
            <div className='select-merchant'>
                <ul>
                    {
                        merchantList.map((item, index): ReactElement => {
                            return (
                                <li key={index} onClick={() => {
                                    setSelectMerchantPopup(false);
                                    setSelecyAccount(item.mch_id === account.mch_id ? sourceAccount : item)
                                    dispatch({
                                        type: Type.SET_OTHER_MERCHANT,
                                        payload: {
                                            other_merchant: JSON.stringify(item.mch_id === account.mch_id ? sourceAccount : item)
                                        }
                                    });
                                    dispatch({
                                        type: Type.SET_MERCHANT_ID,
                                        payload: {
                                            merchant_id: item.mch_id
                                        }
                                    });
                                }}>{item.email}({item.name})</li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    };
    //利润信息
    const [settleMsg, setSettleMsg] = useState<Profit>({
        trx: 0,
        usdt: 0,
        mch_id: '',
    });
    //余额信息
    const [balanceMsg, setBalanceMsg] = useState<Balance>({
        trx: 0,
        trx2: 0,
        usdt: 0,
        mch_id: '',
    });
    const handleOpenChange = (newOpen: boolean) => {
        setSelectMerchantPopup(newOpen);
    };

    const balanceCard: RefObject<HTML> = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    return (
        <div className='account-log'>
            {/* 账户信息概览 */}
            <div className='account-card'>
                <div className='avatar-box'>
                    <img src={require('../../../assets/images/test.png')} alt="test" />
                </div>
                <div className='name-msg'>
                    <p className='account-name'>{selectAccount.name ? selectAccount.name : account.name}</p>
                    {account.is_admin && <Popover placement="bottomRight" onOpenChange={handleOpenChange} arrowPointAtCenter open={selectMerchantPopup} content={<SelectMerchant />} trigger="hover">
                        <div className='view-other-account'>
                            <p className='iconfont icon-xiala'></p>
                        </div>
                    </Popover>}
                </div>
                <div className='bg-shadow'>
                    <img src={require('../../../assets/images/box_shadow.png')} alt="" />
                </div>
            </div>
            {/* 账户操作 */}
            {account.is_admin && <div className='bind-msg'>
                <div className={`auth-btn ${account.ga === 1 ? 'has-bind' : ''}`}>
                    <p onClick={account.ga === 0 ? () => {
                        navigate('/account/merchant-information')
                    } : () => { }}>
                        {
                            account.ga === 0 ? '未绑定' : '已绑定'
                        }
                    </p>
                </div>
                <p className='mask-line'></p>
                <div className='oper-box-btn'>
                    <Button type="default" className='oper-btn' onClick={async () => {
                        setQuery(true);
                        const result = await CheckProfitApi({
                            mchId: selectAccount.mch_id ? selectAccount.mch_id : account.mch_id
                        });
                        const { code, data } = result;
                        setQuery(false);
                        if (code !== 200) {
                            message.error(result.message);
                            return
                        }
                        if (!data.needCheckout) {
                            message.error(`最少结算数量为 ${data.minUsdtProfit} USDT`);
                            return
                        };
                        setSettleMsg({
                            trx: data.trxProfit,
                            usdt: data.usdtProfit,
                            mch_id: selectAccount.mch_id ? selectAccount.mch_id : account.mch_id
                        });
                        setBoxType(1)
                        setVisible(true)
                    }}>利润结算</Button>
                    <Button type="default" className='oper-btn' onClick={async () => {
                        setQuery(true);
                        const result = await CheckBalanceApi({
                            mchId: selectAccount.mch_id ? selectAccount.mch_id : account.mch_id
                        });
                        const { code, data } = result;
                        setQuery(false);
                        if (code !== 200) {
                            message.error(result.message);
                            return
                        }
                        setBalanceMsg({
                            trx: data.mchFeeAvailableTotal,
                            trx2: data.userFeeAvailableTotal,
                            usdt: data.mchAvailableTotal,
                            mch_id: selectAccount.mch_id ? selectAccount.mch_id : account.mch_id
                        });
                        setBoxType(2)
                        setVisible(true)
                    }}>提取余额</Button>
                </div>
            </div>}
            {/* 账户信息 */}
            <div className='account-card-msg'>
                <ul>
                    <li>
                        <p>商户号</p>
                        <p>{selectAccount.mch_id ? selectAccount.mch_id : account.mch_id}</p>
                    </li>
                    <li>
                        <p>邮箱</p>
                        <p>{selectAccount.email ? selectAccount.email : account.email}</p>
                    </li>
                    <li>
                        <p>上次登录时间</p>
                        <p>{selectAccount.last_login_time ? selectAccount.last_login_time : account.last_login_time}</p>
                    </li>
                </ul>
            </div>
            {/* 余额信息 */}
            <BalanceCard ref={balanceCard} />
            {/* 登录日志 */}
            <LoginLog />
            {/* 利润结算 */}
            <SettlementBox reloadBalance={() => {
                balanceCard.current.upBalance();
            }} value={visible} profit={settleMsg} balance={balanceMsg} type={boxType} resetModal={(val: boolean): void => {
                setVisible(false)
            }} />
            {/* 加载 */}
            {query && <LoadingView />}
        </div>
    )
};

export default AccountLog;