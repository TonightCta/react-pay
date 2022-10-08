
import { Button } from 'antd';
import { ReactElement, ReactNode } from 'react';


const CompanyMsg = (): ReactElement<ReactNode> => {
    return (
        <div className='company-msg'>
            <div className='msg-public merchant-msg'>
                <p className='msg-title'>基本资料</p>
                <ul className='table-title'>
                    <li>商家名称</li>
                    <li>联系人</li>
                    <li>联系电话</li>
                    <li>商户邮箱</li>
                </ul>
                <ul>
                    <li>ceshi2022@ib.cc</li>
                    <li>ceshi2022@ib.cc</li>
                    <li>-</li>
                    <li>ceshi2022@ib.cc</li>
                </ul>
            </div>
            <div className='msg-public butt-msg'>
                <p className='msg-title'>
                    对接资料
                    <span>开发文档</span>
                </p>
                <ul className='table-title'>
                    <li>商家ID(merchantId,对接用)</li>
                    <li>网关服务器</li>
                    <li>API KEY</li>
                    <li>白名单</li>
                </ul>
                <ul>
                    <li>
                        <p>bYPhrixkgRX2KjJ4QJUp083v</p>
                        <p>
                            <Button type='primary' size='small'>复制</Button>
                        </p>
                    </li>
                    <li>
                        <p>https://merchant.ib.cc</p>
                        <p>
                            <Button type='primary' size='small'>复制</Button>
                        </p>
                    </li>
                    <li>
                        <p>-</p>
                        <p>
                            <Button type='primary' size='small'>点击获取</Button>
                        </p>
                    </li>
                    <li>
                        <p>-</p>
                        <p>
                            <Button type='primary' size='small'>设置</Button>
                        </p>
                    </li>
                </ul>
            </div>
            <div className='msg-public auth-msg'>
                <p className='msg-title'>企业认证</p>
                <ul className='table-title'>
                    <li>企业注册国家</li>
                    <li>企业名称</li>
                    <li>营业执照注册号</li>
                    <li>注册日期</li>
                    <li>运营地址</li>
                    <li>营业执照照片</li>
                </ul>
                <ul>
                    <li>-</li>
                    <li>-</li>
                    <li>-</li>
                    <li>-</li>
                    <li>-</li>
                    <li>-</li>
                </ul>
            </div>
        </div>
    )
};


export default CompanyMsg;