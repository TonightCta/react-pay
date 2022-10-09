
import { Button, Modal, Popover, notification, Input } from 'antd';
import { ReactElement, ReactNode, useState, useEffect, useRef, useCallback } from 'react';
import copy from 'copy-to-clipboard'

interface Props {
    value: boolean,
    resetModal: (val: boolean) => void
}

const WithDrawBox = (props: Props): ReactElement<ReactNode> => {

    const [visible, setVisible] = useState<boolean>(false);
    useEffect(() => {
        setVisible(props.value);
    }, [props.value]);
    const closeModal = (): void => {
        setVisible(false);
        props.resetModal(false);
    };
    const [count, setCount] = useState<number>(60);
    const cbSaver : any = useRef();
    const timer = useRef<NodeJS.Timer>();
    cbSaver.current = () => {
        setCount(count - 1);
    };
    const countDown = useCallback((): void => {
        timer.current = setInterval(() => {
            cbSaver.current();
        }, 1000);
    }, []);

    useEffect(() => {
        if (count < 0) {
            clearInterval(timer.current);
            setCount(60)
        };
    }, [count]);
    const [showPassword, setShowPassword] = useState<string>('password')
    return (
        <div className='withdraw-box'>
            <Modal title={null} width={634} open={visible} onCancel={() => {
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
                                            <p className='address-text'>TDfW4nfxWDu3SaGntX1nJk5pruCvcjwAxs</p>
                                            <p className='copy-btn' onClick={() => {
                                                copy('TDfW4nfxWDu3SaGntX1nJk5pruCvcjwAxs');
                                                notification.success({
                                                    message: '提示',
                                                    description: '复制成功'
                                                })
                                            }}>
                                                <span className='iconfont icon-a-fuzhi2'></span>
                                            </p>
                                        </div>
                                        <ul>
                                            <li>
                                                <p>提币币种</p>
                                                <p>TRX</p>
                                            </li>
                                            <li>
                                                <p>所需手续费</p>
                                                <p>1.25000000</p>
                                            </li>
                                            <li>
                                                <p>预期到账</p>
                                                <p>1.25000000</p>
                                            </li>
                                            <li>
                                                <p>
                                                    所需矿工费
                                                    <Popover content='123'>
                                                        <span className='iconfont icon-wenhao'></span>
                                                    </Popover>
                                                </p>
                                                <p>1.25000000</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='inp-inner'>
                                <p className='inner-label'>验证码<sup>*</sup></p>
                                <Input type='number' maxLength={6} placeholder='请输入验证码' />
                                <p className={`send-code ${count < 60 ? 'un-touch' : ''}`} onClick={count === 60 ? () => { countDown() } : () => { }}>{count === 60 ? '发送验证码' : `${count} s`}</p>
                            </div>
                            <div className='inp-inner'>
                                <p className='inner-label'>交易密码<sup>*</sup></p>
                                <Input type={showPassword} autoComplete='new-password' placeholder='请输入交易密码' />
                                <p className={`iconfont oper-type ${showPassword === 'password' ? 'icon-zhengyan' : 'icon-biyan'}`} onClick={() => {
                                    setShowPassword(showPassword === 'password' ? 'text' : 'password')
                                }}></p>
                            </div>
                            <div className='inp-inner'>
                                <p className='inner-label'>谷歌验证码<sup>*</sup></p>
                                <Input type="number" maxLength={6} autoComplete='new-password' placeholder='请输入谷歌验证码' />
                            </div>
                        </div>
                    </div>
                    <div className='modal-footer-mine'>
                        <Button type="primary" onClick={() => {
                            closeModal()
                        }} className="cancel-btn">取消</Button>
                        <Button type='primary' className='confirm-btn'>确定</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
};


export default WithDrawBox;