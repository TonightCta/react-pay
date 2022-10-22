
import { ReactElement, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import InnerTitle from './title';

interface Frame {
    img: string,
    name: string,
    topLine?: string,
    bottomLine?: string
}



const FrameView = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const frameList: Frame[] = [
        {
            img: require('../../../assets/images/site/frame_1.png'),
            topLine: require('../../../assets/images/site/frame_line_1.png'),
            name: t('public.user'),//用户
        },
        {
            img: require('../../../assets/images/site/frame_2.png'),
            bottomLine: require('../../../assets/images/site/frame_line_2.png'),
            name: t('public.pay'),//支付
        },
        {
            img: require('../../../assets/images/site/frame_3.png'),
            topLine: require('../../../assets/images/site/frame_line_1.png'),
            name: t('public.merchant'),//商家
        },
        {
            img: require('../../../assets/images/site/frame_4.png'),
            name: t('public.chain'),//区块链
        }
    ]
    return (
        <div className='frame-view' id="frame-view">
            {/* 功能框架 */}
            <InnerTitle title={t('public.frame')} />
            <ul>
                {
                    frameList.map((item: Frame, index: number): ReactElement => {
                        return (
                            <li key={index} style={{ background: `url(${item.img})`, backgroundSize: '100% 100%' }}>
                                <p>{item.name}</p>
                                {
                                    item.topLine && <img className='top-line' src={item.topLine} alt="" />
                                }
                                {
                                    item.bottomLine && <img className='bottom-line' src={item.bottomLine} alt="" />
                                }
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
};

export default FrameView;