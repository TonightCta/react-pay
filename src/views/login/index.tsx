
import { Button, message } from 'antd';
import { ReactElement, ReactNode, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckEmail } from '../../utils';
import { LoginApi, MerchantInfoApi, MerchantListApi, UpdatePassApi, SendCodeApi } from '../../request/api';
import './index.scss';
import { Type } from '../../utils/interface';
import { IBPay } from '../../App';
import { useCountdown } from '../../utils/hooks';

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
    const { dispatch } = useContext(IBPay)
    // 登录 & 忘记密码
    const [showContent, setShowContent] = useState<number>(1);
    //查看密码
    const [showPass, setShowPass] = useState<{ pass: string, new: string, repeat: string }>({
        pass: 'password',
        new: 'password',
        repeat: 'password'
    });
    //倒计时
    const { count, startTimer } = useCountdown(60);
    //登录信息
    const [loginMsg, setLoginMsg] = useState<Login>(sourceLogin);
    //忘记密码信息
    const [forgetMsg, setForgetMsg] = useState<Forget>(sourceForget);
    const [waitResult, setWaitResult] = useState<boolean>(false);
    //设置默认数据
    useEffect(() => {
        setLoginMsg(sourceLogin)
        setForgetMsg(sourceForget)
    }, [showContent]);
    //登录
    const loginService = async () => {
        if (!loginMsg.email) {
            message.error('请输入邮箱地址');
            return
        };
        if (!CheckEmail(loginMsg.email)) {
            message.error('请输入正确的邮箱地址');
            return
        }
        if (!loginMsg.pass) {
            message.error('请输入您的登录密码');
            return
        };
        setWaitResult(true)
        const result = await LoginApi({
            email: loginMsg.email,
            loginMode: "pwd",
            ga_code: loginMsg.auth,
            password: loginMsg.pass,
            pushId: "11",
        });
        setWaitResult(false);
        const { code, data } = result;
        if (code !== 200) {
            message.error(result.message);
            return;
        };
        dispatch({
            type: Type.SET_NEW_TOKEN,
            payload: {
                token_new: `${data.token_type} ${data.access_token}`
            }
        });
        sessionStorage.setItem('new_token', `${data.token_type} ${data.access_token}`)
        const info = await MerchantInfoApi({});
        dispatch({
            type: Type.SET_MERCHANT_ID,
            payload: {
                merchant_id: info.data.merchantInfo.mch_id
            }
        });
        dispatch({
            type: Type.SET_ACCOUNT,
            payload: {
                account: JSON.stringify(info.data)
            }
        });
        const merchant = await MerchantListApi({
            page: 1,
            limit: 100
        });
        dispatch({
            type: Type.SET_MERCHANT_LIST,
            payload: {
                merchant_list: merchant.data.list
            }
        });
        navigate('/');
    };
    //发送验证码
    const sendCodeService = async () => {
        if (!forgetMsg.email) {
            message.error('请输入邮箱地址');
            return
        };
        if (!CheckEmail(forgetMsg.email)) {
            message.error('请输入正确的邮箱地址');
            return
        };
        const result = await SendCodeApi({
            scene: 4,
            email: forgetMsg.email
        });
        const { code } = result;
        if (code !== 200) {
            message.error(result.message);
            return;
        };
        message.success('验证码发送成功');
        startTimer()
    };
    //找回密码
    const forgetService = async () => {
        if (!forgetMsg.email) {
            message.error('请输入邮箱地址');
            return
        };
        if (!CheckEmail(forgetMsg.email)) {
            message.error('请输入正确的邮箱地址');
            return
        };
        if (!forgetMsg.code) {
            message.error('请输入邮箱验证码');
            return
        };
        if (!forgetMsg.new) {
            message.error('请输入新密码');
            return;
        };
        if (!forgetMsg.repeat) {
            message.error('请再次输入新密码');
            return;
        };
        if (forgetMsg.new !== forgetMsg.repeat) {
            message.error('两次密码不一致');
            return
        };
        setWaitResult(true);
        const result = await UpdatePassApi({
            email: forgetMsg.email,
            code: forgetMsg.code,
            password: forgetMsg.repeat
        });
        setWaitResult(false);
        const { code } = result;
        if (code !== 200) {
            message.error(result.message);
            return
        };
        message.success('密码重置成功');
        setShowContent(1);
    }
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
                        <p className='welcome-text'>Welcome to Internet Property. </p>
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
                                <Button type='primary' loading={waitResult} block onClick={() => {
                                    loginService()
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
                                    <p className={`send-code ${count < 60 ? 'no-touch' : ''}`} onClick={count === 60 ? () => {
                                        sendCodeService()
                                    } : () => { }}>{count === 60 ? '获取验证码' : `${count} s`}</p>
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
                                    setShowContent(1);
                                    setWaitResult(false);
                                }}>返回</Button>
                                <Button type='primary' loading={waitResult} block onClick={() => {
                                    forgetService();
                                }}>确认</Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
};

export default LoginIndex;