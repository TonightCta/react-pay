
import { Button, Popover } from 'antd';
import { ReactElement, useState, useContext } from 'react';
import BalanceCard from './balance_card';
import LoginLog from './login_log';
import SettlementBox from './settlement_box';
import { IBPay } from '../../../App';
import { useEffect } from 'react';
import { Type } from '../../../utils/interface';


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
    // const merchant: string[] = ['s9756382730@outlook.com', 's9756382730@outlook.com', 's9756382730@outlook.com'];
    const [merchantList, setMerchantList] = useState<any[]>([]);
    const [account, setAccount] = useState<Account>(sourceAccount);
    const [selectAccount, setSelecyAccount] = useState<Account>(sourceAccount);
    useEffect(() => {
        setMerchantList(state.merchant_list as []);
        setAccount(JSON.parse(state.account || '{}')?.merchantInfo);
        setSelecyAccount(JSON.parse(state.other_merchant || '{}'));
    }, [state.merchant_list]);
    const [visible, setVisible] = useState<boolean>(false);
    const [boxType, setBoxType] = useState<number>(1);
    const [selectMerchantPopup, setSelectMerchantPopup] = useState<boolean>(false);
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
                                        type:Type.SET_OTHER_MERCHANT,
                                        payload:{
                                            other_merchant:JSON.stringify(item.mch_id === account.mch_id ? sourceAccount : item)
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
    }
    const handleOpenChange = (newOpen: boolean) => {
        setSelectMerchantPopup(newOpen);
    };
    return (
        <div className='account-log'>
            {/* 账户信息概览 */}
            <div className='account-card'>
                <div className='avatar-box'>
                    <img src={require('../../../assets/images/test.png')} alt="" />
                </div>
                <div className='name-msg'>
                    <p className='account-name'>{selectAccount.name ? selectAccount.name : account.name}</p>
                    <Popover placement="bottomRight" onOpenChange={handleOpenChange} open={selectMerchantPopup} arrowPointAtCenter content={<SelectMerchant />} trigger="hover">
                        <div className='view-other-account'>
                            <p className='iconfont icon-xiala'></p>
                        </div>
                    </Popover>
                </div>
                <div className='bg-shadow'>
                    <img src={require('../../../assets/images/box_shadow.png')} alt="" />
                </div>
            </div>
            {/* 账户操作 */}
            <div className='bind-msg'>
                <div className='auth-btn'>
                    <p>
                        {
                            (selectAccount.ga ? selectAccount.ga : account.ga) === 0 ? '未绑定' : '已绑定'
                        }
                    </p>
                </div>
                <p className='mask-line'></p>
                <div className='oper-box-btn'>
                    <Button type="default" className='oper-btn' onClick={() => {
                        setBoxType(1)
                        setVisible(true)
                    }}>利润结算</Button>
                    <Button type="default" className='oper-btn' onClick={() => {
                        setBoxType(2)
                        setVisible(true)
                    }}>提取余额</Button>
                </div>
            </div>
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
            <BalanceCard />
            {/* 登录日志 */}
            <LoginLog />
            {/* 利润结算 */}
            <SettlementBox value={visible} type={boxType} resetModal={(val: boolean): void => {
                setVisible(false)
            }} />
        </div>
    )
};

export default AccountLog;