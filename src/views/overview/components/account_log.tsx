
import { Button, Popover } from 'antd';
import { ReactElement } from 'react';
import BalanceCard from './balance_card';
import LoginLog from './login_log';

const AccountLog = (): ReactElement => {
    const merchant: string[] = ['s9756382730@outlook.com', 's9756382730@outlook.com', 's9756382730@outlook.com']
    const SelectMerchant = (): ReactElement => {
        return (
            <div className='select-merchant'>
                <ul>
                    {
                        merchant.map((item, index): ReactElement => {
                            return (
                                <li key={index}>{item}</li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
    return (
        <div className='account-log'>
            {/* 账户信息概览 */}
            <div className='account-card'>
                <div className='avatar-box'>
                    <img src={require('../../../assets/images/test.png')} alt="" />
                </div>
                <div className='name-msg'>
                    <p className='account-name'>s9756382730@outlook.com</p>
                    <Popover placement="bottomRight" arrowPointAtCenter content={<SelectMerchant />} trigger="hover">
                        <div className='view-other-account'>
                            <p className='iconfont icon-xiala'></p>
                        </div>
                    </Popover>
                </div>
                <div className='bg-shadow'>
                    <img src={require('../../../assets/images/box_shadow.png')} alt="" />
                </div>
            </div>
            {/* 账户操作 */}
            <div className='bind-msg'>
                <div className='auth-btn'>
                    <p>未绑定</p>
                </div>
                <p className='mask-line'></p>
                <div className='oper-box-btn'>
                    <Button type="default" className='oper-btn'>利润结算</Button>
                    <Button type="default" className='oper-btn'>提取余额</Button>
                </div>
            </div>
            {/* 账户信息 */}
            <div className='account-card-msg'>
                <ul>
                    <li>
                        <p>商户号</p>
                        <p>AcRXpWejqMiKngA1wkxWJM2u</p>
                    </li>
                    <li>
                        <p>邮箱</p>
                        <p>1332568474@gmail.com</p>
                    </li>
                    <li>
                        <p>上次登录时间</p>
                        <p>2022-05-15 12:56:56</p>
                    </li>
                </ul>
            </div>
            {/* 余额信息 */}
            <BalanceCard/>
            {/* 登录日志 */}
            <LoginLog/>
        </div>
    )
};

export default AccountLog;