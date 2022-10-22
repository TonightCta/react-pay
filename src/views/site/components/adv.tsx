
import { ReactElement, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import InnerTitle from './title';

interface Adv {
    name: string,
    text: string
};

const AdvView = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const advListFirst: Adv[] = [
        {
            name: t('frame.remark_title_1'),//保护隐私
            text: t('frame.remark_1'),//加密货币为客户和商人提供最高的隐私和安全性。
        },
        {
            name: t('frame.remark_title_2'),//全球化
            text: t('frame.remark_2'),//使用无边界的加密支付，全球范围内都可以运营您的业务，突破地域和国界限制。
        },
        {
            name: t('frame.remark_title_3'),//接入便捷
            text: t('frame.remark_3'),//成熟接口方案5个工作日即可对接完成，丰富对接开发经验助力客户最快占领市场。
        },
    ];
    const advListSecond: Adv[] = [
        {
            name: t('frame.remark_title_4'),//支持多币种流通
            text: t('frame.remark_4'),//多币种流通，跨境支付也轻松。
        },
        {
            name: t('frame.remark_title_5'),//DO高效结算
            text: t('frame.remark_5'),//DO高效清结算，省去杂冗流程，链上结算更及时。
        },
        {
            name: t('frame.remark_title_6'),//超低手续费
            text: t('frame.remark_6'),//COM支付平台，可以在全球范围内都享超低手续费。
        },
    ];
    return (
        <div className='adv-view' id="adv-view">
            <img className='left-icon' src={require('../../../assets/images/site/adv_left.png')} alt="" />
            {/* 产品优势 */}
            <InnerTitle title={t('public.adv')} />
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