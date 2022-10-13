
import { Button, Input, notification, message } from 'antd';
import { ReactElement, ReactNode, useState, useEffect } from 'react';
import copy from 'copy-to-clipboard';
import QRCode from 'qrcode.react';
import { useInfo } from '../../../../utils/hooks';
import { GoogleAuthApi, GoogleAuthBindApi } from '../../../../request/api';

const GoogleAuth = (): ReactElement<ReactNode> => {
    //更新用户信息
    const { upUserInfo } = useInfo();
    //谷歌验证码
    const [googleCode, setGoogleCode] = useState<{
        qr: string,
        text: string
    }>({
        qr: '',
        text: ''
    });
    const [inpCode, setCode] = useState<string>('');
    const googleInfo = async () => {
        const result = await GoogleAuthApi({});
        const { data } = result;
        setGoogleCode({
            qr: data.qrcode,
            text: data.secret
        });
    };
    useEffect(() => {
        googleInfo();
        return () => {
            setGoogleCode({
                qr: '',
                text: ''
            });
        }
    }, [])
    //跳转外部链接
    const openOutSide = (_url: string) => {
        window.open(_url);
    };

    return (
        <div className='bind-google-auth'>
            <p className='bind-title'>绑定谷歌验证器</p>
            <ul>
                <li>
                    <div className='step-point'>
                        <p>1</p>
                        <p>下载谷歌验证器</p>
                    </div>
                    <div className='down-way'>
                        <div className='way-label'>
                            <p>浏览器拓展:</p>
                        </div>
                        <p className='way-box' onClick={() => {
                            openOutSide('https://chrome.google.com/webstore/detail/authenticator/bhghoamapcdpbohphigoooaddinpkbai')
                        }}>
                            <span className='iconfont icon-chorme'></span>
                            chorme商店
                        </p>
                    </div>
                    <div className='down-way'>
                        <div className='way-label'>
                            <p>iOS:</p>
                        </div>
                        <p className='way-box' onClick={() => {
                            openOutSide('itms-apps://itunes.apple.com/app/id388497605?action=write-review')
                        }}>
                            <span className='iconfont icon-iOS'></span>
                            iOS下载
                        </p>
                    </div>
                    <div className='down-way'>
                        <div className='way-label'>
                            <p>Android:</p>
                        </div>
                        <p className='way-box' onClick={() => {
                            openOutSide('https://www.baidu.com')
                        }}>
                            <span className='iconfont icon-android'></span>
                            安卓本地下载
                        </p>
                        <p className='way-box' onClick={() => {
                            openOutSide('https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2')
                        }}>
                            <span className='iconfont icon-a-googleplay'></span>
                            Google Play
                        </p>
                    </div>
                </li>
                <li>
                    <div className='step-point'>
                        <p>2</p>
                        <p>绑定谷歌验证器</p>
                    </div>
                    <div className='qr-box'>
                        <QRCode value={googleCode.qr} size={80} id="qrCode" />
                    </div>
                    <div className='oper-qr-text'>
                        <p className='text-content'>密文：{googleCode.text}</p>
                        <p className='copy-text text-public' onClick={() => {
                            copy(googleCode.text);
                            notification.success({
                                message: '提示',
                                description: '复制成功'
                            })
                        }}>
                            <span className='iconfont icon-fuzhi'></span>
                        </p>
                        <p className='reload-text text-public' onClick={() => { googleInfo() }}>
                            <span className='iconfont icon-shuaxin'></span>
                        </p>
                    </div>
                </li>
                <li>
                    <div className='step-point'>
                        <p>3</p>
                        <p>绑定谷歌验证器</p>
                    </div>
                    <div className='bind-inp'>
                        <Input placeholder='请输入谷歌验证码' autoComplete='off' value={inpCode} onChange={(e) => {
                            setCode(e.target.value)
                        }} type='text' />
                        <p>
                            <Button type='primary' onClick={async () => {
                                if(!inpCode){
                                    message.error('请输入谷歌验证码');
                                    return;
                                };
                                const result = await GoogleAuthBindApi({
                                    code:inpCode
                                });
                                const { code } = result;
                                if(code !== 200){
                                    message.error(result.message);
                                    return;
                                };
                                message.success('绑定成功');
                                upUserInfo()
                            }}>立即绑定</Button>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    )
};

export default GoogleAuth;