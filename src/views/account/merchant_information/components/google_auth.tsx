
import { Button, Input, notification } from 'antd';
import { ReactElement, ReactNode } from 'react';
import copy from 'copy-to-clipboard'

const GoogleAuth = (): ReactElement<ReactNode> => {
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
                        <p className='way-box'>
                            <span className='iconfont icon-chorme'></span>
                            chorme商店
                        </p>
                    </div>
                    <div className='down-way'>
                        <div className='way-label'>
                            <p>iOS:</p>
                        </div>
                        <p className='way-box'>
                            <span className='iconfont icon-iOS'></span>
                            iOS下载
                        </p>
                    </div>
                    <div className='down-way'>
                        <div className='way-label'>
                            <p>Android:</p>
                        </div>
                        <p className='way-box'>
                            <span className='iconfont icon-android'></span>
                            安卓本地下载
                        </p>
                        <p className='way-box'>
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
                        <img src={require('../../../../assets/images/qr.png')} alt="" />
                    </div>
                    <div className='oper-qr-text'>
                        <p className='text-content'>密文：JJJHTFCDRCVGhxbhsyxgu</p>
                        <p className='copy-text text-public' onClick={() => {
                            copy('JJJHTFCDRCVGhxbhsyxgu');
                            notification.success({
                                message: '提示',
                                description: '复制成功'
                            })
                        }}>
                            <span className='iconfont icon-fuzhi'></span>
                        </p>
                        <p className='reload-text text-public'>
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
                        <Input placeholder='请输入谷歌验证码' type='text' />
                        <p>
                            <Button type='primary'>立即绑定</Button>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    )
};

export default GoogleAuth;