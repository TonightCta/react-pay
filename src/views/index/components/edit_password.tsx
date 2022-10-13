
import { Button, Input, Modal, message } from 'antd';
import { ReactElement, ReactNode, useState, useEffect } from 'react';
import { useCountdown } from '../../../utils/hooks';
import { EditPassApi, SendCodeApi } from '../../../request/api'
import { useNavigate } from 'react-router-dom';

interface Props {
    value: boolean,
    type: number,// type === 1 && 编辑登录密码  ｜ type === 2 && 编辑交易密码
    resetClose: (val: boolean) => void
}

interface Pass {
    login_pass: string,
    edit_pass: string,
    repeat_pass: string,
    code: number | string
};

const sourcePass: Pass = {
    login_pass: '',
    edit_pass: '',
    repeat_pass: '',
    code: ''
}

const EditPassword = (props: Props): ReactElement<ReactNode> => {
    const [visible, setVisible] = useState<boolean>(false);
    const { count, startTimer } = useCountdown(60);
    const [waitResult,setWaitResult] = useState<boolean>(false);
    useEffect(() => {
        setVisible(props.value)
    }, [props.value])
    const closeModal = (): void => {
        setVisible(false)
        props.resetClose(false);
        setPassMsg(sourcePass);
    };
    const [showPassword, setShowPassword] = useState<{ new: string, repeat: string }>({
        new: 'password',
        repeat: 'password'
    });
    //发送验证码
    const sendCodeService = async () => {
        const result = await SendCodeApi({
            scene: props.type
        });
        const { code } = result;
        if (code !== 200) {
            message.error(result.message);
            return;
        };
        message.success('验证码发送成功');
        startTimer();
    };
    const navigate = useNavigate();
    //提交编辑密码
    const submitEditPass = async () => {
        if (!passMsg.login_pass) {
            message.error('请输入登录密码');
            return
        }
        if (!passMsg.edit_pass) {
            message.error(`请输入新的${props.type === 1 ? '登录' : '交易'}密码`);
            return
        }
        if (!passMsg.repeat_pass) {
            message.error(`请再次输入新的${props.type === 1 ? '登录' : '交易'}密码`);
            return
        };
        if(passMsg.edit_pass.length < 6){
            message.error(`${props.type === 1 ? '登录' : '交易'}密码最少六位`)
            return
        }
        if (passMsg.edit_pass !== passMsg.repeat_pass) {
            message.error('两次秘密不一致');
            return
        }
        if (!passMsg.code) {
            message.error('请输入验证码');
            return
        };
        setWaitResult(true)
        const result = await EditPassApi({
            code: passMsg.code,
            oldpassword: passMsg.login_pass,
            password: passMsg.repeat_pass,
            passwordType: props.type === 1 ? 0 : 1
        });
        setWaitResult(false)
        const { code } = result;
        if (code !== 200) {
            message.error(result.message);
            return;
        };
        if (props.type === 1) {
            message.success('新的登录密码已生效，即将跳转至登录页');
            sessionStorage.clear();
            closeModal();
            navigate('/login');
            return;
        };
        closeModal();
        message.success('修改成功');
        // passwordType 1交易 2登录
        // send code type  登录1 交易2
    };
    const [passMsg, setPassMsg] = useState<Pass>(sourcePass);
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
                            <Input type='password' value={passMsg.login_pass} onChange={(e) => {
                                setPassMsg({
                                    ...passMsg,
                                    login_pass: e.target.value
                                })
                            }} autoComplete='new-password' placeholder='请输入登录密码' />
                        </div>
                        <div className='inp-inner'>
                            <p className='inner-label'>新{props.type === 1 ? '登录' : '交易'}密码<sup>*</sup></p>
                            <Input type={showPassword.new} value={passMsg.edit_pass} onChange={(e) => {
                                setPassMsg({
                                    ...passMsg,
                                    edit_pass: e.target.value
                                })
                            }} autoComplete='new-password' placeholder={`请输入新${props.type === 1 ? '登录' : '交易'}密码`} />
                            <p className={`iconfont oper-type ${showPassword.new === 'password' ? 'icon-zhengyan' : 'icon-biyan'}`} onClick={() => {
                                setShowPassword({
                                    ...showPassword,
                                    new: showPassword.new === 'password' ? 'text' : 'password'
                                })
                            }}></p>
                        </div>
                        <div className='inp-inner'>
                            <p className='inner-label'>确认密码<sup>*</sup></p>
                            <Input type={showPassword.repeat} value={passMsg.repeat_pass} onChange={(e) => {
                                setPassMsg({
                                    ...passMsg,
                                    repeat_pass: e.target.value
                                })
                            }} autoComplete='new-password' placeholder='请再次输入新登录密码' />
                            <p className={`iconfont oper-type ${showPassword.repeat === 'password' ? 'icon-zhengyan' : 'icon-biyan'}`} onClick={() => {
                                setShowPassword({
                                    ...showPassword,
                                    repeat: showPassword.repeat === 'password' ? 'text' : 'password'
                                })
                            }}></p>
                        </div>
                        <div className='inp-inner'>
                            <p className='inner-label'>验证码<sup>*</sup></p>
                            <Input type='number' value={passMsg.code} onChange={(e) => {
                                setPassMsg({
                                    ...passMsg,
                                    code: e.target.value
                                })
                            }} maxLength={6} placeholder='请输入验证码' />
                            <p className={`send-code ${count < 60 ? 'un-touch' : ''}`} onClick={count === 60 ? () => { sendCodeService() } : () => { }}>{count === 60 ? '发送验证码' : `${count} s`}</p>
                        </div>
                    </div>
                    <div className='modal-footer-mine'>
                        <Button type="primary" onClick={() => {
                            closeModal()
                        }} className="cancel-btn">取消</Button>
                        <Button type='primary' loading={waitResult} className='confirm-btn' onClick={() => {
                            submitEditPass()
                        }}>确定</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
};

export default EditPassword;