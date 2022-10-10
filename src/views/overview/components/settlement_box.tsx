
import { Button, Input, Modal } from 'antd';
import { ReactElement, ReactNode, useState, useEffect, useRef, useCallback } from 'react';
import { useCountdown } from '../../../utils/hooks';

interface Props {
    type:number,
    value: boolean,
    resetModal: (val: boolean) => void
}

const SettlementBox = (props: Props): ReactElement<ReactNode> => {
    const [visible, setVisible] = useState<boolean>(false);
    useEffect(() => {
        setVisible(props.value)
    }, [props.value]);

    const closeModal = (): void => {
        setVisible(false);
        props.resetModal(false);
    };
    const {count, startTimer} = useCountdown(60);
    const [showPassword, setShowPassword] = useState<string>('password')
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
                        <div className='left-title'>
                            <img src={require(`../../../assets/images/${props.type === 1 ? 'settlement_icon' : 'balance_icon'}.png`)} alt="" />
                            <div className='title-text'>
                                <p>{props.type === 1 ? '利润详情' : '提取余额'}</p>
                                {
                                    props.type === 1 
                                        ? <p>请查看您的利润<br />详情<span className='iconfont icon-direction-right'></span></p>
                                        : <p>提取完成后账户<br />余额将会清空</p>
                                }
                            </div>
                        </div>
                        <div className='right-content'>
                            <ul>
                                <li>
                                    <p>TRX{props.type === 1 ? '收益' : '余额'}</p>
                                    <p>10.00000000</p>
                                </li>
                                <li>
                                    <p>USDT-TRC20{props.type === 1 ? '收益' : '余额'}</p>
                                    <p>10.00000000</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='inp-box'>
                        <div className='inp-inner'>
                            <p className='inner-label'>{props.type === 1 ? '结算' : ''}地址<sup>*</sup></p>
                            <Input type='text' placeholder={`请输入${props.type === 1 ? '结算' : ''}地址`} />
                        </div>
                        <div className='inp-inner'>
                            <p className='inner-label'>邮箱验证码<sup>*</sup></p>
                            <Input type='number' placeholder='请输入邮箱验证码' />
                            <p className={`send-code ${count < 60 ? 'un-touch' : ''}`} onClick={count === 60 ? () => { startTimer() } : () => { }}>{count === 60 ? '获取验证码' : `${count} s`}</p>
                        </div>
                        <div className='inp-inner'>
                            <p className='inner-label'>交易密码<sup>*</sup></p>
                            <Input type='password' autoComplete='new-password' placeholder='请输入交易密码' />
                            <p className={`iconfont oper-type ${showPassword === 'password' ? 'icon-zhengyan' : 'icon-biyan'}`} onClick={() => {
                                setShowPassword(showPassword === 'password' ? 'text' : 'password')
                            }}></p>
                        </div>
                        <div className='inp-inner'>
                            <p className='inner-label'>谷歌验证码<sup>*</sup></p>
                            <Input type='number' placeholder='请输入谷歌验证码' />
                        </div>
                    </div>
                </div>
                <div className='modal-footer-mine'>
                    <Button type="primary" onClick={() => {
                        closeModal()
                    }} className="cancel-btn">取消</Button>
                    <Button type='primary' className='confirm-btn'>确定</Button>
                </div>
            </Modal>
        </div>
    )
};

export default SettlementBox;