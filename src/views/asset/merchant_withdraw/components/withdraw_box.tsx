
import { Button, Modal, Popover, Input, message } from 'antd';
import { ReactElement, ReactNode, useState, useEffect } from 'react';
import copy from 'copy-to-clipboard'
import { useCountdown } from '../../../../utils/hooks';
import { SendCodeApi, WithdrawApi } from '../../../../request/api'
import { Withdraw, sourceWithdraw } from '..';
import { useInfo } from '../../../../utils/hooks'

interface Props {
    value: boolean,
    resetModal: (val: boolean) => void,
    drawMsg: Withdraw,
    resetValue:() => void
}

const WithDrawBox = (props: Props): ReactElement<ReactNode> => {
    const [draw, setDraw] = useState<Withdraw>(sourceWithdraw);
    const [visible, setVisible] = useState<boolean>(false);
    const { upUserInfo } = useInfo();
    useEffect(() => {
        setVisible(props.value);
        setDraw(props.drawMsg);
    }, [props.value]);
    const closeModal = (): void => {
        setVisible(false);
        props.resetModal(false);
        setDraw(sourceWithdraw);
        setVerifyMsg({
            code: '',
            trade: '',
            auth: ''
        })
    };
    //倒计时
    const { count, startTimer } = useCountdown(60);
    //密码显隐
    const [showPassword, setShowPassword] = useState<string>('password');
    //验证信息
    const [verifiyMsg, setVerifyMsg] = useState<{
        code: number | string,
        trade: string,
        auth: number | string
    }>({
        code: '',
        trade: '',
        auth: ''
    });
    //发送验证码
    const sendCodeService = async () => {
        const result = await SendCodeApi({
            scene: 3,
        });
        const { code } = result;
        if(code !== 200){
            message.error(result.message);
            return;
        };
        message.success('验证码发送成功');
        startTimer();
    }
    //提交提币
    const submitWithDraw = async () => {
        if (!verifiyMsg.code) {
            message.error('请输入邮箱验证码');
            return;
        };
        if (!verifiyMsg.trade) {
            message.error('请输入交易密码');
            return;
        };
        if(verifiyMsg.trade.length < 6){
            message.error('交易密码最少六位');
            return;
        }
        if (!verifiyMsg.auth) {
            message.error('请输入谷歌验证码');
            return;
        };
        const result = await WithdrawApi({
            asset: props.drawMsg.coin,
            password: verifiyMsg.trade,
            ga_code: verifiyMsg.auth,
            toAddress: props.drawMsg.address,
            txAmount: props.drawMsg.amount,
            verifyCode: verifiyMsg.code
        });
        const { code } = result;
        if (code !== 200) {
            message.error(result.message);
            return;
        };
        message.success('提币发起成功');
        closeModal();
        await upUserInfo();
        props.resetValue();
    }
    return (
        <div className='withdraw-box'>
            <Modal title={null} width={700} open={visible} onCancel={() => {
                closeModal()
            }} closable={false} destroyOnClose={true} footer={null}>
                <div className='withdraw-modal-box'>
                    <div className='modal-header-mine'>
                        <p>确认提币</p>
                        <p className='iconfont icon-guanbitanchuang' onClick={() => {
                            closeModal()
                        }}></p>
                    </div>
                    <div className='withdraw-modal-content'>
                        <div className='withdraw-msg'>
                            <img className='shadow-bg' src={require('../../../../assets/images/box_shadow.png')} alt="" />
                            <div className='msg-inner'>
                                <div className='left-title'>
                                    <img src={require('../../../../assets/images/withdraw_icon.png')} alt="" />
                                    <div className='text-title'>
                                        <p>提币信息</p>
                                        <p>请您核实提币信息后进行提币</p>
                                    </div>
                                </div>
                                <div className='right-content'>
                                    <div className='right-inner'>
                                        <p className='inner-title'>提币地址：</p>
                                        <div className='address-oper'>
                                            <p className='address-text'>{draw.address}</p>
                                            <p className='copy-btn' onClick={() => {
                                                copy(draw.address);
                                                message.success(draw.address)
                                            }}>
                                                <span className='iconfont icon-a-fuzhi2'></span>
                                            </p>
                                        </div>
                                        <ul>
                                            <li>
                                                <p>提币币种</p>
                                                <p>{draw.coin}</p>
                                            </li>
                                            <li>
                                                <p>所需手续费</p>
                                                <p>{Number(draw.fee).toFixed(8)}</p>
                                            </li>
                                            <li>
                                                <p>预期到账</p>
                                                <p>{draw.amount}</p>
                                            </li>
                                            <li>
                                                <p>
                                                    所需矿工费
                                                    <Popover content='123'>
                                                        <span className='iconfont icon-wenhao'></span>
                                                    </Popover>
                                                </p>
                                                <p>{Number(draw.work_fee).toFixed(8)}</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='inp-inner'>
                                <p className='inner-label'>验证码<sup>*</sup></p>
                                <Input type='number' maxLength={6} value={verifiyMsg.code} onChange={(e) => {
                                    setVerifyMsg({
                                        ...verifiyMsg,
                                        code: e.target.value
                                    })
                                }} placeholder='请输入验证码' />
                                <p className={`send-code ${count < 60 ? 'un-touch' : ''}`} onClick={count === 60 ? () => { sendCodeService() } : () => { }}>{count === 60 ? '发送验证码' : `${count} s`}</p>
                            </div>
                            <div className='inp-inner'>
                                <p className='inner-label'>交易密码<sup>*</sup></p>
                                <Input type={showPassword} autoComplete='new-password' value={verifiyMsg.trade} onChange={(e) => {
                                    setVerifyMsg({
                                        ...verifiyMsg,
                                        trade: e.target.value
                                    })
                                }} placeholder='请输入交易密码' />
                                <p className={`iconfont oper-type ${showPassword === 'password' ? 'icon-zhengyan' : 'icon-biyan'}`} onClick={() => {
                                    setShowPassword(showPassword === 'password' ? 'text' : 'password')
                                }}></p>
                            </div>
                            <div className='inp-inner'>
                                <p className='inner-label'>谷歌验证码<sup>*</sup></p>
                                <Input type="number" maxLength={6} value={verifiyMsg.auth} onChange={(e) => {
                                    setVerifyMsg({
                                        ...verifiyMsg,
                                        auth: e.target.value
                                    })
                                }} autoComplete='new-password' placeholder='请输入谷歌验证码' />
                            </div>
                        </div>
                    </div>
                    <div className='modal-footer-mine'>
                        <Button type="primary" onClick={() => {
                            closeModal()
                        }} className="cancel-btn">取消</Button>
                        <Button type='primary' className='confirm-btn' onClick={() => {
                            submitWithDraw()
                        }}>确定</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
};


export default WithDrawBox;