
import { Button, Input, Modal, message } from 'antd';
import { ReactElement, ReactNode, useState, useEffect } from 'react';
import { useCountdown } from '../../../utils/hooks';
import { Balance, Profit } from './account_log';
import { SendCodeApi, SettleProfitApi,ClearBalanceApi } from '../../../request/api'

interface Props {
    type: number,//1 ---> 利润结算  2 ---> 提取余额
    value: boolean,
    resetModal: (val: boolean) => void,
    profit: Profit,
    balance:Balance,
    reloadBalance:() => void
}

interface Submit {
    address: string,
    amount: number | string,
    code: number | string,
    trade: string,
    auth: number | string
};

const source: Submit = {
    address: '',
    amount: '',
    code: '',
    trade: '',
    auth: ''
}

const SettlementBox = (props: Props): ReactElement<ReactNode> => {
    const [visible, setVisible] = useState<boolean>(false);
    //利润结算恶毒
    const [profit, setProfit] = useState<Profit>(props.profit);
    //余额提取额度
    const [balance, setBalance] = useState<Balance>(props.balance);
    useEffect(() => {
        setVisible(props.value)
    }, [props.value]);
    useEffect(() => {
        setProfit(props.profit)
    }, [props.profit])
    useEffect(() => {
        setBalance(props.balance)
    }, [props.balance])
    const closeModal = (): void => {
        setVisible(false);
        props.resetModal(false);
        setSelectCoin([]);
        setSubmitMsg(source);
    };
    //倒计时
    const { count, startTimer } = useCountdown(60);
    //显示密码
    const [showPassword, setShowPassword] = useState<string>('password');
    //选择资产
    const [selectCoin, setSelectCoin] = useState<number[]>([]);
    // 提交信息
    const [submitMsg, setSubmitMsg] = useState<Submit>(source);
    //提交等待
    const [waitResult,setWaitResult] = useState<boolean>(false);
    // 发送验证码
    const sendCodeService = async () => {
        const result = await SendCodeApi({
            scene: 5,
        });
        const { code } = result;
        if(code !== 200){
            message.error(result.message);
            return;
        };
        message.success('验证码发送成功');
        startTimer();
    };
    //提交利润结算
    const submitProfit = async () => {
        if (selectCoin.length < 1) {
            message.error('请选结算资产');
            return;
        };
        const balance: number = selectCoin[0] === 2 ? props.profit.trx : props.profit.usdt;
        if (!submitMsg.address) {
            message.error('请输入结算地址');
            return
        };
        if (!submitMsg.amount) {
            message.error('请输入结算金额');
            return;
        };
        if (submitMsg.amount > balance) {
            message.error(`最大可操作 ${selectCoin[0] === 2 ? 'TRX' : 'USDT'} 利润为 ${balance}`);
            return
        };
        if (!submitMsg.code) {
            message.error('请输入邮箱验证码');
            return
        };
        if (!submitMsg.trade) {
            message.error('请输入交易密码');
            return;
        };
        if (!submitMsg.auth) {
            message.error('请输入谷歌验证码');
            return
        };
        setWaitResult(true)
        const result = await SettleProfitApi({
            mchId: props.profit.mch_id,
            address: submitMsg.address,
            pay_password: submitMsg.trade,
            email_code: submitMsg.code,
            ga_code: submitMsg.auth,
            checkOne: selectCoin[0],
            amount: submitMsg.amount
        });
        setWaitResult(false)
        const { code } = result;
        if (code !== 200) {
            message.error(result.message);
            return;
        };
        message.success('结算成功');
        closeModal();
    };
    //提交余额清算
    const submitBalance = async () => {
        if (selectCoin.length < 1) {
            message.error('请选结算资产');
            return;
        };
        const balance: number = selectCoin[0] === 1 && props.balance.trx2 || selectCoin[0] === 2 && props.balance.trx || props.balance.usdt;
        if (!submitMsg.address) {
            message.error('请输入结算地址');
            return
        };
        if (!submitMsg.amount) {
            message.error('请输入结算金额');
            return;
        };
        if (submitMsg.amount > balance) {
            message.error(`最大可操作 ${selectCoin[0] === 1 && 'TRX提现余额' || selectCoin[0] === 2 && 'TRX代付余额' || 'USDT-TRC20'} 余额为 ${balance}`);
            return
        };
        if (!submitMsg.code) {
            message.error('请输入邮箱验证码');
            return
        };
        if (!submitMsg.trade) {
            message.error('请输入交易密码');
            return;
        };
        if (!submitMsg.auth) {
            message.error('请输入谷歌验证码');
            return
        };
        setWaitResult(true)
        const result = await ClearBalanceApi({
            mchId: props.balance.mch_id,
            address: submitMsg.address,
            pay_password: submitMsg.trade,
            email_code: submitMsg.code,
            ga_code: submitMsg.auth,
            checkOne: selectCoin[0],
            amount: submitMsg.amount
        });
        setWaitResult(false)
        const { code } = result;
        if (code !== 200) {
            message.error(result.message);
            return;
        };
        message.success('提取成功');
        closeModal();
    }
    const BalanceSettle = (): ReactElement => {
        const [showEdit, setShowEdit] = useState<{ trx: boolean, usdt: boolean }>({
            trx: false,
            usdt: false
        });
        const switchCoin = (_type: number) => {
            const arr: number[] = [];
            selectCoin.indexOf(_type) > -1 ? arr.splice(selectCoin.indexOf(_type), 1) : arr.push(_type);
            setSelectCoin(arr);
            setSubmitMsg({
                ...submitMsg,
                amount: _type === 2 ? props.profit.trx : props.profit.usdt
            });
        }
        return (
            <div className='select-settlement'>
                <div className='settlement-title'>
                    <img src={require('../../../assets/images/settlement_icon.png')} alt="" />
                    <div className='text-msg'>
                        <p>利润详情</p>
                        <p>请选择余额类型</p>
                    </div>
                </div>
                <div className='mask-line'></div>
                <ul>
                    <li onClick={() => { switchCoin(2) }} className={`${selectCoin.indexOf(2) > -1 ? 'active-settlement' : ''}`}>
                        <div className='option-select'>
                            <div className='iconfont icon-duigou'></div>
                        </div>
                        <p className='option-title'>TRX收益</p>
                        {/* 2 */}
                        {
                            !showEdit.trx
                                ? <div className='show-amount'>
                                    <p>{profit.trx}</p>
                                    {/* <p className='iconfont icon-a-bianji-22' onClick={(e) => {
                                        e.stopPropagation();
                                        setShowEdit({
                                            ...showEdit,
                                            trx: true
                                        })
                                    }}></p> */}
                                </div>
                                : <div className='opern-amount' onClick={(e) => {
                                    e.stopPropagation();
                                }}>
                                    <input type="number" value={10.000000} onChange={() => { }} placeholder="请输入金额" />
                                    <p onClick={() => {
                                        setShowEdit({
                                            ...showEdit,
                                            trx: false
                                        })
                                    }}>全部</p>
                                    <p className='iconfont icon-a-xingzhuang2' onClick={() => {

                                    }}></p>
                                </div>
                        }
                    </li>
                    <li onClick={() => { switchCoin(1) }} className={`${selectCoin.indexOf(1) > -1 ? 'active-settlement' : ''}`}>
                        <div className='option-select'>
                            <div className='iconfont icon-duigou'></div>
                        </div>
                        <p className='option-title'>USDT-TRC20收益</p>
                        {/* 1 */}
                        {
                            !showEdit.usdt
                                ? <div className='show-amount'>
                                    <p>{profit.usdt}</p>
                                    {/* <p className='iconfont icon-a-bianji-22' onClick={(e) => {
                                        e.stopPropagation();
                                        setShowEdit({
                                            ...showEdit,
                                            usdt: true
                                        })
                                    }}></p> */}
                                </div>
                                : <div className='opern-amount' onClick={(e) => {
                                    e.stopPropagation();
                                }}>
                                    <input type="number" value={10.000000} onChange={() => { }} placeholder="请输入金额" />
                                    <p onClick={() => {
                                        setShowEdit({
                                            ...showEdit,
                                            usdt: false
                                        })
                                    }}>全部</p>
                                    <p className='iconfont icon-a-xingzhuang2' onClick={() => {

                                    }}></p>
                                </div>
                        }
                    </li>
                </ul>
            </div>
        )
    };
    const ProfitSettle = (): ReactElement => {
        const [showEdit, setShowEdit] = useState<{ trx: boolean, trx2: boolean, usdt: boolean }>({
            trx: false,
            trx2: false,
            usdt: false
        });
        const switchCoin = (_type: number) => {
            const arr: number[] = [];
            selectCoin.indexOf(_type) > -1 ? arr.splice(selectCoin.indexOf(_type), 1) : arr.push(_type);
            setSelectCoin(arr);
            setSubmitMsg({
                ...submitMsg,
                amount: _type === 1 && props.balance.trx2 || _type === 2 && props.balance.trx || props.balance.usdt
            });
        };
        return (
            <div className='select-settlement select-balance'>
                <ul>
                    <li onClick={() => { switchCoin(2) }} className={`${selectCoin.indexOf(2) > -1 ? 'active-settlement' : ''}`}>
                        <div className='option-select'>
                            <div className='iconfont icon-duigou'></div>
                        </div>
                        <p className='option-title'>TRX代付余额</p>
                        {/* 2 */}
                        {
                            !showEdit.trx
                                ? <div className='show-amount'>
                                    <p>{balance.trx}</p>
                                    {/* <p className='iconfont icon-a-bianji-22' onClick={(e) => {
                                        e.stopPropagation();
                                        setShowEdit({
                                            ...showEdit,
                                            trx: true
                                        })
                                    }}></p> */}
                                </div>
                                : <div className='opern-amount' onClick={(e) => {
                                    e.stopPropagation();
                                }}>
                                    <input type="number" value={10.000000} onChange={() => { }} placeholder="请输入金额" />
                                    <p onClick={() => {
                                        setShowEdit({
                                            ...showEdit,
                                            trx: false
                                        })
                                    }}>全部</p>
                                    <p className='iconfont icon-a-xingzhuang2' onClick={() => {

                                    }}></p>
                                </div>
                        }
                    </li>
                    <li onClick={() => { switchCoin(1) }} className={`${selectCoin.indexOf(1) > -1 ? 'active-settlement' : ''}`}>
                        <div className='option-select'>
                            <div className='iconfont icon-duigou'></div>
                        </div>
                        <p className='option-title'>TRX提现余额</p>
                        {/* 1 */}
                        {
                            !showEdit.trx2
                                ? <div className='show-amount'>
                                    <p>{balance.trx2}</p>
                                    {/* <p className='iconfont icon-a-bianji-22' onClick={(e) => {
                                        e.stopPropagation();
                                        setShowEdit({
                                            ...showEdit,
                                            trx2: true
                                        })
                                    }}></p> */}
                                </div>
                                : <div className='opern-amount' onClick={(e) => {
                                    e.stopPropagation();
                                }}>
                                    <input type="number" value={10.000000} onChange={() => { }} placeholder="请输入金额" />
                                    <p onClick={() => {
                                        setShowEdit({
                                            ...showEdit,
                                            trx2: false
                                        })
                                    }}>全部</p>
                                    <p className='iconfont icon-a-xingzhuang2' onClick={() => {

                                    }}></p>
                                </div>
                        }
                    </li>
                    <li onClick={() => { switchCoin(3) }} className={`${selectCoin.indexOf(3) > -1 ? 'active-settlement' : ''}`}>
                        <div className='option-select'>
                            <div className='iconfont icon-duigou'></div>
                        </div>
                        <p className='option-title'>USDT-TRC20余额</p>
                        {/* 3 */}
                        {
                            !showEdit.usdt
                                ? <div className='show-amount'>
                                    <p>{balance.usdt}</p>
                                    {/* <p className='iconfont icon-a-bianji-22' onClick={(e) => {
                                        e.stopPropagation();
                                        setShowEdit({
                                            ...showEdit,
                                            usdt: true
                                        })
                                    }}></p> */}
                                </div>
                                : <div className='opern-amount' onClick={(e) => {
                                    e.stopPropagation();
                                }}>
                                    <input type="number" value={10.000000} onChange={() => { }} placeholder="请输入金额" />
                                    <p onClick={() => {
                                        setShowEdit({
                                            ...showEdit,
                                            usdt: false
                                        })
                                    }}>全部</p>
                                    <p className='iconfont icon-a-xingzhuang2' onClick={() => {

                                    }}></p>
                                </div>
                        }
                    </li>
                </ul>
            </div>

        )
    }
    return (
        <div className='settlement-box'>
            <Modal title={null} width={634} open={visible} onCancel={() => {
                closeModal()
            }} closable={false} destroyOnClose={true} footer={null}>
                <div className='modal-header-mine'>
                    <p>{props.type === 1 ? '利润结算' : '提取余额'}</p>
                    <p className='iconfont icon-guanbitanchuang' onClick={() => {
                        closeModal()
                    }}></p>
                </div>
                <div className='settlement-inner'>
                    <div className='settlement-msg'>
                        {
                            props.type === 2 && <div className='balance-title'>
                                <img src={require('../../../assets/images/balance_icon.png')} alt="" />
                                <p>提取余额</p>
                                <p>提取完成后账户余额将会清空</p>
                            </div>
                        }
                        {
                            props.type === 1
                                ? <BalanceSettle />
                                : <ProfitSettle />
                        }
                    </div>
                    <div className='oper-amount'>
                        <p className='inner-label'>{props.type === 1 ? '结算' : ''}地址<sup>*</sup></p>
                        <Input type='text' value={submitMsg.address} onChange={(e) => {
                            setSubmitMsg({
                                ...submitMsg,
                                address: e.target.value
                            })
                        }} placeholder={`请输入${props.type === 1 ? '结算' : ''}地址`} />
                    </div>
                    <div className='inp-box'>
                        <div className='inp-inner'>
                            <p className='inner-label'>{props.type === 1 ? '结算' : '提取'}金额<sup>*</sup></p>
                            <Input type='number' value={submitMsg.amount} onChange={(e) => {
                                setSubmitMsg({
                                    ...submitMsg,
                                    amount: e.target.value
                                })
                            }} placeholder={`请输入${props.type === 1 ? '结算' : '提取'}金额`} />
                        </div>
                        <div className='inp-inner'>
                            <p className='inner-label'>邮箱验证码<sup>*</sup></p>
                            <Input type='number' value={submitMsg.code} onChange={(e) => {
                                setSubmitMsg({
                                    ...submitMsg,
                                    code: e.target.value
                                })
                            }} placeholder='请输入邮箱验证码' />
                            <p className={`send-code ${count < 60 ? 'un-touch' : ''}`} onClick={count === 60 ? () => { sendCodeService() } : () => { }}>{count === 60 ? '获取验证码' : `${count} s`}</p>
                        </div>
                        <div className='inp-inner'>
                            <p className='inner-label'>交易密码<sup>*</sup></p>
                            <Input type='password' value={submitMsg.trade} onChange={(e) => {
                                setSubmitMsg({
                                    ...submitMsg,
                                    trade: e.target.value
                                })
                            }} autoComplete='new-password' placeholder='请输入交易密码' />
                            <p className={`iconfont oper-type ${showPassword === 'password' ? 'icon-zhengyan' : 'icon-biyan'}`} onClick={() => {
                                setShowPassword(showPassword === 'password' ? 'text' : 'password')
                            }}></p>
                        </div>
                        <div className='inp-inner'>
                            <p className='inner-label'>谷歌验证码<sup>*</sup></p>
                            <Input type='number' value={submitMsg.auth} onChange={(e) => {
                                setSubmitMsg({
                                    ...submitMsg,
                                    auth: e.target.value
                                })
                            }} placeholder='请输入谷歌验证码' />
                        </div>
                    </div>
                </div>
                <div className='modal-footer-mine'>
                    <Button type="primary" onClick={() => {
                        closeModal()
                    }} className="cancel-btn">取消</Button>
                    <Button loading={waitResult} type='primary' className='confirm-btn' onClick={() => {
                        props.type === 1 ? submitProfit() : submitBalance()
                    }}>确定</Button>
                </div>
            </Modal>
        </div>
    )
};

export default SettlementBox;