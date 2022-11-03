
import { Button, Input, Modal, Radio, message, Select } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { ReactElement, ReactNode, useState, useEffect } from 'react';
import { AddMerchantApi, AisleListApi } from '../../../../request/api'

interface Props {
    value: boolean,
    resetModal: (val: boolean) => void,
    type: number,
    reloadList: () => void
}

interface Edit {
    email: string,
    pass: string,
    trade: string,
    name: string,
    type: number,
    address: string,
    fee_deposit:string | number,
    fee_withdraw:string | number,
    aisle:number | string,
};
const source: Edit = {
    email: '',
    pass: '',
    trade: '',
    name: '',
    type: 1,
    address: '',
    fee_deposit:'',
    fee_withdraw:'',
    aisle:''
}

interface Aisle{
    coin:string,
    value:number,
    label:string
}

const AddMerchant = (props: Props): ReactElement<ReactNode> => {

    const [visible, setVisible] = useState<boolean>(false);

    const closeModal = (): void => {
        setVisible(false);
        props.resetModal(false);
        setEdit(source);
    }

    useEffect(() => {
        setVisible(props.value)
    }, [props.value])
    const [value1, setValue1] = useState('1');
    const options = [
        { label: '内部 (自有服务）', value: '1' },
        { label: '外部 (UDUN服务）', value: '2' },
    ];
    const [waitReuslt, setWaitResult] = useState<boolean>(false);
    const selectWallet = ({ target: { value } }: RadioChangeEvent) => {
        setValue1(value);
    };
    const submitAdd = async () => {
        if (!edit.email) {
            message.error('请输入邮箱地址');
            return
        };
        if (!edit.pass) {
            message.error('请输入登录密码');
            return;
        };
        if (!edit.name) {
            message.error('请输入商户名称');
            return
        }
        if (!edit.trade) {
            message.error('请输入交易密码');
            return;
        }
        if (!edit.address && coinType === 2) {
            message.error('请输入归集地址');
            return;
        };
        if(coinType === 1 && !edit.aisle){
            message.error('请选择支付通道');
            return;
        };
        if(coinType ===  1 && !edit.fee_deposit){
            message.error('请输入充值手续费');
            return;
        };
        if(coinType === 1 && !edit.fee_withdraw){
            message.error('请输入提现手续费');
            return;
        };
        setWaitResult(true);
        const result = await AddMerchantApi({
            type:coinType === 1 ? 'onLine' : 'coin',
            email: edit.email,
            password: edit.pass,
            pay_password: edit.trade,
            onlyTrx: edit.type,
            trx_pool_address: edit.address,
            name: edit.name,
            channel_id:edit.aisle,
            deposit_fee:edit.fee_deposit,
            withdraw_fee:edit.fee_withdraw
        });
        setWaitResult(false);
        const { code } = result;
        if (code !== 200) {
            message.error(result.message);
            return;
        };
        message.success('新增商户成功');
        props.reloadList();
        closeModal();
    };
    const [edit, setEdit] = useState<Edit>(source);
    const [showPass, setShowPass] = useState<{ login: string, trade: string }>({
        login: 'password',
        trade: 'password'
    });
    //通道列表
    const [aisleList, setAisleList] = useState<Aisle[]>([]);
    const initAisleList = async () => {
        const result = await AisleListApi({});
        const { data } = result;
        const arr = data.map((item:{coin:string,id:number,name:string}) => {
            return {
                value:item.id,
                coin:item.coin,
                label:`${item.name}(${item.coin})`
            }
        })
        setAisleList(arr);
    };
    useEffect(() => {
        initAisleList();
        return () => {
            setAisleList([])
        }
    },[])
    //法币 --> 1 & 数字货币  --> 2
    const [coinType, setCoinType] = useState<number>(1);
    return (
        <div className='add-merchant'>
            <Modal title={null} width={664} open={visible} onCancel={() => {
                closeModal()
            }} closable={false} destroyOnClose={true} footer={null}>
                <div className='add-merchant-content'>
                    <div className='modal-header-mine'>
                        <p>{props.type === 1 ? '新增' : '编辑'}商户</p>
                        <p className='iconfont icon-guanbitanchuang' onClick={() => {
                            closeModal()
                        }}></p>
                    </div>
                    <div className='select-coin-type'>
                        <ul>
                            <li className={`${coinType === 1 ? 'active-type' : ''}`} onClick={() => {
                                setCoinType(1)
                            }}>法币</li>
                            <li className={`${coinType === 2 ? 'active-type' : ''}`} onClick={() => {
                                setCoinType(2)
                            }}>数字货币</li>
                        </ul>
                    </div>
                    <div className='add-inp'>
                        <ul>
                            <li>
                                <p className='inner-label'>邮箱<sup>*</sup></p>
                                <Input type='text' value={edit.email} onChange={(e) => {
                                    setEdit({
                                        ...edit,
                                        email: e.target.value
                                    })
                                }} placeholder='请输入邮箱地址' />
                            </li>
                            <li>
                                <p className='inner-label'>登录密码<sup>*</sup></p>
                                <Input type={showPass.login} value={edit.pass} onChange={(e) => {
                                    setEdit({
                                        ...edit,
                                        pass: e.target.value
                                    })
                                }} autoComplete='new-password' placeholder='请输入登录密码' />
                                <p className={`iconfont oper-type ${showPass.login === 'password' ? 'icon-zhengyan' : 'icon-biyan'}`} onClick={() => {
                                    setShowPass({
                                        ...showPass,
                                        login: showPass.login === 'password' ? 'text' : 'password'
                                    })
                                }}></p>
                            </li>
                            <li>
                                <p className='inner-label'>商户名称<sup>*</sup></p>
                                <Input type='text' value={edit.name} onChange={(e) => {
                                    setEdit({
                                        ...edit,
                                        name: e.target.value
                                    })
                                }} placeholder='请输入商户名称' />
                            </li>
                            <li>
                                <p className='inner-label'>交易密码<sup>*</sup></p>
                                <Input type={showPass.trade} value={edit.trade} onChange={(e) => {
                                    setEdit({
                                        ...edit,
                                        trade: e.target.value
                                    })
                                }} autoComplete="new-password" placeholder='请输入交易密码' />
                                <p className={`iconfont oper-type ${showPass.trade === 'password' ? 'icon-zhengyan' : 'icon-biyan'}`} onClick={() => {
                                    setShowPass({
                                        ...showPass,
                                        trade: showPass.trade === 'password' ? 'text' : 'password'
                                    })
                                }}></p>
                            </li>
                        </ul>
                        {/* 法币 */}
                        {
                            coinType === 1 && <div className='select-aisle select-wallet'>
                                <p className='inner-label'>选择通道<sup>*</sup></p>
                                <Select
                                    style={{ width: '100%' }}
                                    placeholder="请选择通道"
                                    options={aisleList}
                                    onSelect={(value:number) => {
                                        setEdit({
                                            ...edit,
                                            aisle:value
                                        })
                                    }}
                                />
                            </div>
                        }
                        {
                            coinType === 1 && <ul className='in-out'>
                                <li>
                                    <p className='inner-label'>充值手续费<sup>*</sup></p>
                                    <Input type='number' value={edit.fee_deposit} onChange={(e) => {
                                        setEdit({
                                            ...edit,
                                            fee_deposit:e.target.value
                                        })
                                    }} placeholder='请输入充值手续费' />
                                </li>
                                <li>
                                    <p className='inner-label'>提现手续费<sup>*</sup></p>
                                    <Input type='number' value={edit.fee_withdraw} onChange={(e) => {
                                        setEdit({
                                            ...edit,
                                            fee_withdraw:e.target.value
                                        })
                                    }} placeholder='请输入提现手续费' />
                                </li>
                            </ul>
                        }
                        {/* 数字货币 */}
                        {coinType === 2 && <div className='select-wallet'>
                            <p className='inner-label'>选择类型<sup>*</sup></p>
                            <div className='select-radio'>
                                <Radio.Group options={options} size="small" onChange={selectWallet} value={value1} />
                            </div>
                        </div>}
                        {coinType === 2 && <div className='select-wallet enter-address'>
                            <p className='inner-label'>归集地址<sup>*</sup></p>
                            <Input type='text' value={edit.address} onChange={(e) => {
                                setEdit({
                                    ...edit,
                                    address: e.target.value
                                })
                            }} placeholder='请输入归集地址' />
                        </div>}
                    </div>
                    <div className='modal-footer-mine'>
                        <Button type="primary" onClick={() => {
                            closeModal()
                        }} className="cancel-btn">取消</Button>
                        <Button type='primary' loading={waitReuslt} className='confirm-btn' onClick={() => {
                            submitAdd()
                        }}>确定</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
};

export default AddMerchant;