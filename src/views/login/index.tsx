
import { Button } from 'antd';
import { ReactElement, ReactNode, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';

interface Login {
    email: string,
    pass: string,
    auth: number | string
}

interface Forget {
    email: string,
    code: number | string,
    new: string,
    repeat: string
}

const sourceLogin: Login = {
    email: '',
    pass: '',
    auth: ''
};

const sourceForget: Forget = {
    email: '',
    code: '',
    new: '',
    repeat: ''
}

const LoginIndex = (): ReactElement<ReactNode> => {
    const navigate = useNavigate();
    // 登录 & 忘记密码
    const [showContent, setShowContent] = useState<number>(1);
    //查看密码
    const [showPass, setShowPass] = useState<{ pass: string, new: string, repeat: string }>({
        pass: 'password',
        new: 'password',
        repeat: 'password'
    });
    //登录信息
    const [loginMsg, setLoginMsg] = useState<Login>(sourceLogin);
    //忘记密码信息
    const [forgetMsg, setForgetMsg] = useState<Forget>(sourceForget);
    //设置默认数据
    useEffect(() => {
        setLoginMsg(sourceLogin)
        setForgetMsg(sourceForget)
    }, [showContent])
    return (
        <div className='login-index'>
            <div className='top-right-color'></div>
            <div className='bottom-right-color'></div>
            <div className='bottom-left-color'></div>
            <div className='login-box'>
                <p><img src={require('../../assets/images/logo_text.png')} alt="" /></p>
                <div className={`oper-box-parent ${showContent === 2 ? 'show-forget' : ''}`}>
                    {/* 登录 */}
                    <div className='login-inner-box'>
                        <p>
                            <img src={require('../../assets/images/login_text.png')} alt="" className='login-text' />
                        </p>
                        <p className='welcome-text'>Welcome to xxxx. </p>
                        <div className='inp-msg'>
                            <div className='inp-box'>
                                <p className='inp-label'>邮箱</p>
                                <div className='inner-box'>
                                    <p className='iconfont icon-youxiang'></p>
                                    <input type="text" value={loginMsg.email} onChange={(e) => {
                                        setLoginMsg({
                                            ...loginMsg,
                                            email: e.target.value
                                        })
                                    }} placeholder='请输入邮箱地址' autoComplete='off' />
                                    <p className='iconfont icon-closefill oper-icon'></p>
                                </div>
                            </div>
                            <div className='inp-box'>
                                <p className='inp-label'>登录密码</p>
                                <div className='inner-box'>
                                    <p className='iconfont icon-mima'></p>
                                    <input type={showPass.pass} value={loginMsg.pass} onChange={(e) => {
                                        setLoginMsg({
                                            ...loginMsg,
                                            pass: e.target.value
                                        })
                                    }} placeholder='请输入登录密码' autoComplete='new-password' />
                                    <p className={`iconfont ${showPass.pass === 'password' ? 'icon-zhengyan' : 'icon-biyan'} oper-icon`} onClick={() => {
                                        setShowPass({
                                            ...showPass,
                                            pass: showPass.pass === 'password' ? 'text' : 'password'
                                        })
                                    }}></p>
                                </div>
                            </div>
                            <div className='inp-box'>
                                <p className='inp-label'>谷歌验证码</p>
                                <div className='inner-box'>
                                    <p className='iconfont icon-gugeyanzhengma'></p>
                                    <input type="number" value={loginMsg.auth} onChange={(e) => {
                                        setLoginMsg({
                                            ...loginMsg,
                                            auth: e.target.value
                                        })
                                    }} placeholder='请输入谷歌验证码' aria-controls='false' />
                                </div>
                            </div>
                            <div className='oper-box'>
                                <Button type='primary' block onClick={() => {
                                    navigate('/')
                                }}>登录</Button>
                            </div>
                            <p className='forget-pass'>您是否忘记密码？<span onClick={() => {
                                setShowContent(2)
                            }}>找回密码</span></p>
                        </div>
                    </div>
                    {/* 找回密码 */}
                    <div className='forget-inner-box inner-public'>
                        <p>
                            <img src={require('../../assets/images/forget_text.png')} alt="" className='login-text' />
                        </p>
                        <p className='welcome-text'>Welcome to xxxx. </p>
                        <div className='inp-msg'>
                            <div className='inp-box'>
                                <p className='inp-label'>邮箱</p>
                                <div className='inner-box'>
                                    <p className='iconfont icon-youxiang'></p>
                                    <input type="text" value={forgetMsg.email} onChange={(e) => {
                                        setForgetMsg({
                                            ...forgetMsg,
                                            email: e.target.value
                                        })
                                    }} placeholder='请输入邮箱地址' autoComplete='off' />
                                    <p className='iconfont icon-closefill oper-icon'></p>
                                </div>
                            </div>
                            <div className='inp-box'>
                                <p className='inp-label'>验证码</p>
                                <div className='inner-box'>
                                    <p className='iconfont icon-yanzhengma'></p>
                                    <input type="text" value={forgetMsg.code} onChange={(e) => {
                                        setForgetMsg({
                                            ...forgetMsg,
                                            code: e.target.value
                                        })
                                    }} placeholder='请输入验证码' autoComplete='off' />
                                    <p className='send-code'>发送验证码</p>
                                </div>
                            </div>
                            <div className='inp-box'>
                                <p className='inp-label'>新密码</p>
                                <div className='inner-box'>
                                    <p className='iconfont icon-mima'></p>
                                    <input type={showPass.new} value={forgetMsg.new} onChange={(e) => {
                                        setForgetMsg({
                                            ...forgetMsg,
                                            new: e.target.value
                                        })
                                    }} placeholder='请输入新密码' autoComplete='new-password' />
                                    <p className={`iconfont ${showPass.new === 'password' ? 'icon-zhengyan' : 'icon-biyan'} oper-icon`} onClick={() => {
                                        setShowPass({
                                            ...showPass,
                                            new: showPass.new === 'password' ? 'text' : 'password'
                                        })
                                    }}></p>
                                </div>
                            </div>
                            <div className='inp-box'>
                                <p className='inp-label'>确认密码</p>
                                <div className='inner-box'>
                                    <p className='iconfont icon-mima'></p>
                                    <input type={showPass.repeat} value={forgetMsg.repeat} onChange={(e) => {
                                        setForgetMsg({
                                            ...forgetMsg,
                                            repeat: e.target.value
                                        })
                                    }} placeholder='请再次输入新密码' autoComplete='new-password' />
                                    <p className={`iconfont ${showPass.repeat === 'password' ? 'icon-zhengyan' : 'icon-biyan'} oper-icon`} onClick={() => {
                                        setShowPass({
                                            ...showPass,
                                            repeat: showPass.repeat === 'password' ? 'text' : 'password'
                                        })
                                    }}></p>
                                </div>
                            </div>
                            <div className='oper-box'>
                                <Button type='default' className='default-btn' onClick={() => {
                                    setShowContent(1)
                                }}>返回</Button>
                                <Button type='primary' block>确认</Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
};

export default LoginIndex;