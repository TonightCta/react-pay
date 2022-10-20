
import { ReactElement, ReactNode } from 'react';
import InnerTitle from './title';

interface Adv {
    name: string,
    text: string
};

const advListFirst: Adv[] = [
    {
        name: '保护隐私',
        text: '加密货币为客户和商人提供最高的隐私和安全性。'
    },
    {
        name: '全球化',
        text: '使用无边界的加密支付，全球范围内都可以运营您的业务，突破地域和国界限制。'
    },
    {
        name: '接入便捷',
        text: '成熟接口方案5个工作日即可对接完成，丰富对接开发经验助力客户最快占领市场。'
    },
];
const advListSecond: Adv[] = [
    {
        name: '支持多币种流通',
        text: '多币种流通，跨境支付也轻松。'
    },
    {
        name: 'DO高效结算',
        text: 'DO高效清结算，省去杂冗流程，链上结算更及时。'
    },
    {
        name: '超低手续费',
        text: '使用HLWZC.COM支付平台，可以在全球范围内都享超低手续费。'
    },
];

const AdvView = (): ReactElement<ReactNode> => {
    return (
        <div className='adv-view'>
            <img className='left-icon' src={require('../../../assets/images/site/adv_left.png')} alt="" />
            <InnerTitle title='产品优势' />
            <div className='adv-inner'>
                <ul>
                    {
                        advListFirst.map((item: Adv, index: number): ReactElement => {
                            return (
                                <li key={index}>
                                    <p>{item.name}</p>
                                    <p>{item.text}</p>
                                </li>
                            )
                        })
                    }
                </ul>
                <img src={require('../../../assets/images/site/adv_line.png')} alt="" />
                <ul>
                    {
                        advListSecond.map((item: Adv, index: number): ReactElement => {
                            return (
                                <li key={index}>
                                    <p>{item.name}</p>
                                    <p>{item.text}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
};

export default AdvView;