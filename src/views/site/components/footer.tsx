
import { Tooltip } from 'antd';
import { ReactElement, ReactNode } from 'react';


const coin: { logo: string, name: string }[] = [
    { logo: require('../../../assets/images/coin/btc.png'), name: 'BTC' },
    { logo: require('../../../assets/images/coin/bth.png'), name: 'BTH' },
    { logo: require('../../../assets/images/coin/eth.png'), name: 'ETC' },
    { logo: require('../../../assets/images/coin/usdt.png'), name: 'USDT' },
    { logo: require('../../../assets/images/coin/trx.png'), name: 'TRX' },
    { logo: require('../../../assets/images/coin/xrp.png'), name: 'XRP' },
    { logo: require('../../../assets/images/coin/eos.png'), name: 'EOS' },
    { logo: require('../../../assets/images/coin/ltc.png'), name: 'LTC' },
]

const FooterNav = (): ReactElement<ReactNode> => {
    return (
        <div className='footer-nav'>
            <div className='logo-coin'>
                <img className='logo' src={require('../../../assets/images/site/logo.png')} alt="" />
                <ul>
                    {
                        coin.map((item: { logo: string, name: string }, index: number): ReactElement => {
                            return (
                                <li key={index}>
                                    <Tooltip placement="top" title={item.name}>
                                        <img src={item.logo} alt="" />
                                    </Tooltip>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <p className='footer-remark'>
                一个覆盖全球的币支付平台，致力于解决企业全球收款问题，为企业提供安全、便捷、保护隐私的区块链在线支付服务，企业可通过支付平台选择稳定币、比特币以及其他代币在全球范围内完成收款和支付，更容易把业务拓展全球，实现全球化。
            </p>
            <p className='copy-right'>
                Copyright ©2020-2022 hlwzc.com 版权所有
            </p>
        </div>
    )
};

export default FooterNav;