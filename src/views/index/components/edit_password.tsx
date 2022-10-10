
import { Button, Input, Modal } from 'antd';
import { ReactElement, ReactNode, useState, useEffect, useRef, useCallback } from 'react';
import { useCountdown } from '../../../utils/hooks';

interface Props {
    value: boolean,
    type: number,
    resetClose: (val: boolean) => void
}

const EditPassword = (props: Props): ReactElement<ReactNode> => {
    const [visible, setVisible] = useState<boolean>(false);
    const { count, startTimer } = useCountdown(60);
    useEffect(() => {
        setVisible(props.value)
    },[props.value])
    const closeModal = (): void => {
        setVisible(false)
        props.resetClose(false);
    };
    const [showPassword,setShowPassword] = useState<{new:string,repeat:string}>({
        new:'password',
        repeat:'password'
    });
    return (
        <div className='edit-password'>
            <Modal title={null} width={600} open={visible} onCancel={() => {
                closeModal()
            }} closable={false} destroyOnClose={true} footer={null}>
                <div className='edit-content'>
                    <div className='modal-header-mine'>
                        <p>修改{props.type === 1 ? '登录' : '交易'}密码</p>
                        <p className='iconfont icon-guanbitanchuang' onClick={() => {
                            closeModal()
                        }}></p>
                    </div>
                    <div className='edit-password-inp'>
                        <div className='inp-inner'>
                            <p className='inner-label'>登录密码<sup>*</sup></p>
                            <Input type='password' autoComplete='new-password' placeholder='请输入登录密码'/>
                        </div>
                        <div className='inp-inner'>
                            <p className='inner-label'>新{props.type === 1 ? '登录' : '交易'}密码<sup>*</sup></p>
                            <Input type={showPassword.new} autoComplete='new-password' placeholder={`请输入新${props.type === 1 ? '登录' : '交易'}密码`}/>
                            <p className={`iconfont oper-type ${showPassword.new === 'password' ? 'icon-zhengyan' : 'icon-biyan'}`} onClick={() => {
                                setShowPassword({
                                    ...showPassword,
                                    new:showPassword.new === 'password' ? 'text' : 'password'
                                })
                            }}></p>
                        </div>
                        <div className='inp-inner'>
                            <p className='inner-label'>确认密码<sup>*</sup></p>
                            <Input type={showPassword.repeat} autoComplete='new-password' placeholder='请再次输入新登录密码'/>
                            <p className={`iconfont oper-type ${showPassword.repeat === 'password' ? 'icon-zhengyan' : 'icon-biyan'}`} onClick={() => {
                                setShowPassword({
                                    ...showPassword,
                                    repeat:showPassword.repeat === 'password' ? 'text' : 'password'
                                })
                            }}></p>
                        </div>
                        <div className='inp-inner'>
                            <p className='inner-label'>验证码<sup>*</sup></p>
                            <Input type='number' maxLength={6} placeholder='请输入验证码'/>
                            <p className={`send-code ${count < 60 ? 'un-touch' : ''}`} onClick={count === 60 ? () => {startTimer()} : () => {}}>{count === 60 ? '发送验证码' : `${count} s`}</p>
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

export default EditPassword;